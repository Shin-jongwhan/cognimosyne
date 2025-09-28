import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import {
  fetchTemporaryAwsCredentials,
  loadStoredAwsCredentials,
  persistAwsCredentials,
  type AwsTemporaryCredentials,
} from "../services/awsCredentials";
import { resolveLambdaFunctionUrl } from "../config/lambda";
import { COGNITO } from "../config/cognito";

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
  const [awsCredentials, setAwsCredentials] = useState<AwsTemporaryCredentials | null>(() => loadStoredAwsCredentials());
  const pendingCredentialsRef = useRef<Promise<AwsTemporaryCredentials> | null>(null);

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

  const [balances, setBalances] = useState<Record<string, number | null>>(() => ({}));
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasInitialFetchRef = useRef(false);
  const previousTokenRef = useRef<string | null>(null);

  const ensureAwsCredentials = useCallback(async (): Promise<AwsTemporaryCredentials> => {
    if (!auth.user?.id_token) {
      throw new Error("ID 토큰이 없어 임시 자격을 발급할 수 없습니다.");
    }

    let current = awsCredentials ?? loadStoredAwsCredentials();

    const isExpiringSoon = (credential: AwsTemporaryCredentials | null): boolean => {
      if (!credential?.expiration) return true;
      const bufferMs = 2 * 60 * 1000; // 2 minutes buffer
      return credential.expiration.getTime() - Date.now() < bufferMs;
    };

    if (current && !isExpiringSoon(current)) {
      return current;
    }

    if (pendingCredentialsRef.current) {
      if (import.meta.env?.DEV) {
        console.debug("[cognito] awaiting in-flight credentials");
      }
      return pendingCredentialsRef.current;
    }

    const promise = fetchTemporaryAwsCredentials(auth.user.id_token)
      .then((refreshed) => {
        setAwsCredentials(refreshed);
        persistAwsCredentials(refreshed);
        return refreshed;
      })
      .finally(() => {
        pendingCredentialsRef.current = null;
      });

    pendingCredentialsRef.current = promise;

    return promise;
  }, [auth.user?.id_token, awsCredentials]);

  const refreshBalances = useCallback(() => {
    if (!auth.user?.id_token) {
      setErrorMessage("ID 토큰이 없어 데이터를 불러올 수 없습니다.");
      setBalances({});
      setLastUpdated(null);
      return () => {};
    }

    if (!COGNITO.identityPoolId) {
      setErrorMessage("Identity Pool ID가 설정되어 있지 않습니다.");
      setBalances({});
      setLastUpdated(null);
      return () => {};
    }

    let isActive = true;
    const abortController = new AbortController();

    const execute = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        let credentials: AwsTemporaryCredentials;
        try {
          credentials = await ensureAwsCredentials();
        } catch (error) {
          console.error(
            "STS 발급 실패:",
            (error as any)?.name,
            (error as any)?.message,
            (error as any)?.$metadata?.httpStatusCode,
            error,
          );
          throw error;
        }
        if (!isActive || abortController.signal.aborted) return;

        const lambdaUrl = resolveLambdaFunctionUrl("creditUsage");
        const url = new URL(lambdaUrl);
        const bodyPayload = JSON.stringify({});
        const idToken = auth.user?.id_token;

        if (!idToken) {
          throw new Error("ID 토큰이 만료되었습니다. 다시 로그인해 주세요.");
        }

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
        if (!isActive || abortController.signal.aborted) return;

        const headers = new Headers();
        for (const [key, value] of Object.entries(signedRequest.headers)) {
          if (!value) continue;
          if (key.toLowerCase() === "host") continue;
          headers.set(key, value);
        }
        headers.set("x-id-token", idToken);

        const response = await fetch(lambdaUrl, {
          method: signedRequest.method ?? "POST",
          headers,
          body: typeof signedRequest.body === "string" || signedRequest.body instanceof Uint8Array ? signedRequest.body : bodyPayload,
          signal: abortController.signal,
        });

        if (!response.ok) {
          const detail = await response.text();
          throw new Error(detail || `Lambda 호출에 실패했습니다. (HTTP ${response.status})`);
        }

        const data: {
          status?: string;
          credit?: number;
          mileage?: number;
          updated_at?: string;
          error_message?: string;
        } = await response.json();

        if (data.status !== "success") {
          throw new Error(
            data.error_message && data.error_message !== "none"
              ? data.error_message
              : "Lambda에서 오류가 반환되었습니다.",
          );
        }

        const mapping: Record<string, number | null> = {};
        for (const item of creditUsageCopy.items) {
          if (item.key === "availableCredits") {
            mapping[item.key] = typeof data.credit === "number" ? data.credit : 0;
          } else if (item.key === "availableMileage") {
            mapping[item.key] = typeof data.mileage === "number" ? data.mileage : 0;
          } else {
            const value = (data as Record<string, unknown>)[item.key];
            mapping[item.key] = typeof value === "number" ? value : 0;
          }
        }

        if (!isActive) return;
        setBalances(mapping);

        if (data.updated_at) {
          const parsed = new Date(data.updated_at);
          setLastUpdated(Number.isNaN(parsed.getTime()) ? new Date() : parsed);
        } else {
          setLastUpdated(new Date());
        }
        setErrorMessage(null);
      } catch (error) {
        if (!isActive || abortController.signal.aborted) return;
        console.error("크레딧 정보를 불러오지 못했습니다.", error);
        setErrorMessage(error instanceof Error ? error.message : "크레딧 정보를 불러오는 중 오류가 발생했습니다.");
        setBalances({});
        setLastUpdated(null);
      } finally {
        if (!isActive || abortController.signal.aborted) return;
        setIsLoading(false);
      }
    };

    void execute();

    return () => {
      isActive = false;
      abortController.abort();
    };
  }, [auth.user?.id_token, creditUsageCopy.items, ensureAwsCredentials]);

  useEffect(() => {
    const currentToken = auth.user?.id_token ?? null;
    if (previousTokenRef.current !== currentToken) {
      hasInitialFetchRef.current = false;
      previousTokenRef.current = currentToken;
    }
    if (!currentToken) {
      pendingCredentialsRef.current = null;
      return;
    }
    if (hasInitialFetchRef.current) return;
    hasInitialFetchRef.current = true;
    const cleanup = refreshBalances();
    return cleanup;
  }, [auth.user?.id_token, refreshBalances]);

  const hasValues = creditUsageCopy.items.some((item) => balances[item.key] != null);

  const localeForFormat = resolvedLanguage.replace("_", "-");

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
          {lastUpdated && creditUsageCopy.lastUpdatedLabel ? (
            <span className="rounded-full bg-slate-900/60 px-3 py-1">
              {creditUsageCopy.lastUpdatedLabel}: {formatTimestamp(lastUpdated, localeForFormat)}
            </span>
          ) : null}
          {creditUsageCopy.refreshCta ? (
            <button
              type="button"
              onClick={refreshBalances}
              disabled={isLoading}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition ${
                isLoading
                  ? "cursor-not-allowed border-slate-700 text-slate-500"
                  : "border-indigo-400/40 text-indigo-200 hover:border-indigo-300 hover:text-white"
              }`}
              aria-busy={isLoading}
            >
              {isLoading ? "불러오는 중..." : creditUsageCopy.refreshCta}
            </button>
          ) : null}
          {errorMessage ? (
            <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-200">
              {errorMessage}
            </span>
          ) : null}
        </section>

        {hasValues ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {creditUsageCopy.items.map((item) => {
              const value = balances[item.key];
              return (
                <li key={item.key} className="rounded-xl border border-white/5 bg-slate-900/60 p-5 shadow-lg">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-medium text-slate-300">{item.label}</span>
                    {value != null ? (
                      <span className="text-3xl font-semibold text-white">
                        {formatAmount(value, localeForFormat)}
                        {item.unitLabel ? <span className="ml-1 text-base text-slate-400">{item.unitLabel}</span> : null}
                      </span>
                    ) : (
                      <span className="text-sm text-slate-500">-</span>
                    )}
                  </div>
                  {item.helperText ? <p className="mt-3 text-sm text-slate-400">{item.helperText}</p> : null}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700/70 bg-slate-900/40 p-10 text-center">
            <h2 className="text-xl font-semibold text-white">{creditUsageCopy.emptyState?.title ?? "데이터가 없습니다."}</h2>
            {creditUsageCopy.emptyState?.description ? (
              <p className="mt-2 max-w-md text-sm text-slate-400">{creditUsageCopy.emptyState.description}</p>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
