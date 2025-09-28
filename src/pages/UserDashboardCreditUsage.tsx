import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-browser";
import { HttpRequest } from "@aws-sdk/protocol-http";

import {
  DEFAULT_LOGIN_LANGUAGE,
  LOGIN_LANGUAGE_STORAGE_KEY,
  loginLanguageMap,
  loginLanguages,
  resolveInitialLoginLanguage,
  type CreditUsageCopy,
  type LoginLanguageCode,
} from "../i18n/loginLanguages";
import { fetchTemporaryAwsCredentials } from "../services/awsCredentials";
import { resolveLambdaFunctionUrl } from "../config/lambda";
import { COGNITO } from "../config/cognito";

type LambdaResponse = {
  status?: string;
  credit?: number;
  mileage?: number;
  updated_at?: string;
  error_message?: string;
};

const resolveCreditUsageLanguage = (preferred?: LoginLanguageCode): LoginLanguageCode => {
  const candidates: LoginLanguageCode[] = [];
  if (preferred) candidates.push(preferred);
  candidates.push(DEFAULT_LOGIN_LANGUAGE);
  const koreanCode = "ko" as LoginLanguageCode;
  if (!candidates.includes(koreanCode)) {
    candidates.push(koreanCode);
  }
  for (const lang of loginLanguages) {
    const code = lang.code as LoginLanguageCode;
    if (!candidates.includes(code)) {
      candidates.push(code);
    }
  }
  for (const code of candidates) {
    const definition = loginLanguageMap[code];
    if (definition?.userDashboardPages?.creditUsage) {
      return code;
    }
  }
  return candidates[0] ?? DEFAULT_LOGIN_LANGUAGE;
};

const formatAmount = (value: number, locale: string) =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);

const formatTimestamp = (date: Date, locale: string) =>
  new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(date);

export default function UserDashboardCreditUsage() {
  const auth = useAuth();
  const [languageCode, setLanguageCode] = useState<LoginLanguageCode>(() => resolveInitialLoginLanguage());

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LOGIN_LANGUAGE_STORAGE_KEY) as LoginLanguageCode | null;
      if (stored && loginLanguageMap[stored]) {
        setLanguageCode(stored);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const resolvedLanguage = useMemo(() => resolveCreditUsageLanguage(languageCode), [languageCode]);
  const creditUsageCopy = useMemo<CreditUsageCopy>(() => {
    const definition = loginLanguageMap[resolvedLanguage]?.userDashboardPages?.creditUsage;
    if (definition) return definition;
    const fallbackDefinition = loginLanguageMap[resolveCreditUsageLanguage()]?.userDashboardPages?.creditUsage;
    if (fallbackDefinition) return fallbackDefinition;
    return {
      title: "Credit Usage",
      items: [],
    };
  }, [resolvedLanguage]);

  const [result, setResult] = useState<LambdaResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const invokeLambda = useCallback(async () => {
    const idToken = auth.user?.id_token;
    if (!idToken) {
      throw new Error("ID 토큰이 없어 임시 자격을 발급할 수 없습니다.");
    }

    const credentials = await fetchTemporaryAwsCredentials(idToken);
    const lambdaUrl = resolveLambdaFunctionUrl("creditUsage");
    const url = new URL(lambdaUrl);

    const bodyPayload = "{}";

    const request = new HttpRequest({
      method: "POST",
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port ? Number(url.port) : undefined,
      path: url.pathname || "/",
      headers: {
        host: url.host,
        "content-type": "application/json",
        "x-id-token": idToken,
        "x-amz-security-token": credentials.sessionToken,
      },
      body: bodyPayload,
    });

    const signer = new SignatureV4({
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
      },
      region: COGNITO.region,
      service: "lambda",
      sha256: Sha256,
    });

    const signedRequest = await signer.sign(request);

    const headers = new Headers();
    for (const [key, value] of Object.entries(signedRequest.headers)) {
      if (!value || key.toLowerCase() === "host") continue;
      headers.set(key, value);
    }
    headers.set("x-id-token", idToken);

    const response = await fetch(lambdaUrl, {
      method: signedRequest.method ?? "POST",
      headers,
      body:
        typeof signedRequest.body === "string" || signedRequest.body instanceof Uint8Array
          ? signedRequest.body
          : bodyPayload,
    });

    const rawBody = await response.text();
    let parsed: LambdaResponse | null = null;
    if (rawBody) {
      try {
        parsed = JSON.parse(rawBody) as LambdaResponse;
      } catch {
        parsed = null;
      }
    }

    if (!response.ok) {
      throw new Error(parsed?.error_message || rawBody || `Lambda 호출 실패 (HTTP ${response.status})`);
    }

    return parsed ?? {
      status: "success",
      credit: undefined,
      mileage: undefined,
      updated_at: undefined,
      error_message: undefined,
    };
  }, [auth.user?.id_token]);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await invokeLambda();
      setResult(data);
    } catch (error) {
      setResult(null);
      setErrorMessage(error instanceof Error ? error.message : "크레딧 정보를 가져오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [invokeLambda]);

  useEffect(() => {
    void handleRefresh();
  }, [handleRefresh]);

  const localeForFormat = resolvedLanguage.replace("_", "-");

  const formatValue = (value: number | string | undefined | null, fallback = "-") => {
    if (value == null) return fallback;
    if (typeof value === "number") return formatAmount(value, localeForFormat);
    return String(value);
  };

  return (
    <main className="relative min-h-screen bg-slate-950 text-white">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.12),_transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <Link to="/user-dashboard/main" className="text-sm text-indigo-300 transition hover:text-indigo-200">
            ← {loginLanguageMap[resolvedLanguage]?.userDashboard?.title ?? "사용자 대시보드"}
          </Link>
          <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{creditUsageCopy.title}</h1>
          {creditUsageCopy.subtitle ? (
            <p className="mt-2 max-w-2xl text-base text-slate-300">{creditUsageCopy.subtitle}</p>
          ) : null}
        </header>

        <section className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-300">
          {result?.updated_at ? (
            <span className="rounded-full bg-slate-900/60 px-3 py-1">
              {creditUsageCopy.lastUpdatedLabel ?? "최근 갱신"}: {formatTimestamp(new Date(result.updated_at), localeForFormat)}
            </span>
          ) : null}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition ${
              isLoading
                ? "cursor-not-allowed border-slate-700 text-slate-500"
                : "border-indigo-400/40 text-indigo-200 hover:border-indigo-300 hover:text-white"
            }`}
            aria-busy={isLoading}
          >
            새로고침
          </button>
          {errorMessage ? (
            <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-200">
              {errorMessage}
            </span>
          ) : null}
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-white/5 bg-slate-900/60 p-5 shadow-lg">
            <div className="text-sm font-medium text-slate-300">
              {creditUsageCopy.items.find((item) => item.key === "availableCredits")?.label ?? "보유 크레딧"}
            </div>
            <div className="mt-3 text-3xl font-semibold text-white">
              {formatValue(result?.credit)}
              <span className="ml-1 text-base text-slate-400">
                {creditUsageCopy.items.find((item) => item.key === "availableCredits")?.unitLabel ?? ""}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              {creditUsageCopy.items.find((item) => item.key === "availableCredits")?.helperText ?? "서비스 이용에 사용할 수 있는 총 크레딧입니다."}
            </p>
          </article>

          <article className="rounded-xl border border-white/5 bg-slate-900/60 p-5 shadow-lg">
            <div className="text-sm font-medium text-slate-300">
              {creditUsageCopy.items.find((item) => item.key === "availableMileage")?.label ?? "보유 마일리지"}
            </div>
            <div className="mt-3 text-3xl font-semibold text-white">
              {formatValue(result?.mileage)}
              <span className="ml-1 text-base text-slate-400">
                {creditUsageCopy.items.find((item) => item.key === "availableMileage")?.unitLabel ?? ""}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              {creditUsageCopy.items.find((item) => item.key === "availableMileage")?.helperText ?? "프로모션 등으로 적립된 마일리지 잔액입니다."}
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-xl border border-white/5 bg-slate-900/60 p-5 text-xs text-slate-300">
          <header className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Lambda 응답</h2>
            <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[11px] uppercase tracking-wide text-slate-400">
              {result?.status ?? "unknown"}
            </span>
          </header>
          {result ? (
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <dt className="font-medium text-slate-400">credit</dt>
                <dd className="text-white">{formatValue(result.credit)}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-400">mileage</dt>
                <dd className="text-white">{formatValue(result.mileage)}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-medium text-slate-400">updated_at</dt>
                <dd className="text-white">{formatValue(result.updated_at)}</dd>
              </div>
              {result.error_message && result.error_message !== "none" ? (
                <div className="sm:col-span-2">
                  <dt className="font-medium text-slate-400">error_message</dt>
                  <dd className="text-white">{result.error_message}</dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <p className="text-slate-500">데이터가 없습니다. 새로고침 버튼을 눌러 다시 시도해 주세요.</p>
          )}
        </section>
      </div>
    </main>
  );
}
