import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-browser";
import { HttpRequest } from "@aws-sdk/protocol-http";

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

export default function TestGetCreditPage() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LambdaResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInvoke = async () => {
    setResult(null);
    setError(null);

    const idToken = auth.user?.id_token;
    if (!idToken) {
      setError("ID 토큰이 없습니다. 먼저 로그인해 주세요.");
      return;
    }

    setIsLoading(true);

    try {
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
        body: typeof signedRequest.body === "string" || signedRequest.body instanceof Uint8Array ? signedRequest.body : bodyPayload,
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

      setResult(parsed);
    } catch (invokeError) {
      setError(invokeError instanceof Error ? invokeError.message : String(invokeError));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-start px-4 py-20">
      <section className="w-full max-w-xl space-y-6 rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-xl">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Lambda Credit 테스트</h1>
          <p className="text-sm text-slate-400">
            버튼을 누르면 현재 로그인한 사용자의 ID 토큰으로 Lambda Function URL(`creditUsage`)을 호출합니다.
          </p>
        </header>

        <button
          type="button"
          onClick={handleInvoke}
          disabled={isLoading}
          className={`w-full rounded-lg border px-4 py-2 text-sm font-semibold transition ${
            isLoading
              ? "cursor-not-allowed border-slate-700 text-slate-500"
              : "border-emerald-500/40 text-emerald-200 hover:border-emerald-300 hover:text-white"
          }`}
        >
          {isLoading ? "호출 중..." : "Lambda 호출하기"}
        </button>

        {result ? (
          <pre className="whitespace-pre-wrap rounded-lg border border-slate-700 bg-slate-950 p-4 text-xs text-emerald-200">
            {JSON.stringify(result, null, 2)}
          </pre>
        ) : null}

        {error ? (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-200">
            {error}
          </p>
        ) : null}
      </section>
    </main>
  );
}
