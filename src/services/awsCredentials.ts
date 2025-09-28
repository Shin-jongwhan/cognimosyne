import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { COGNITO } from "../config/cognito";

export type AwsTemporaryCredentials = {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  expiration: Date | null;
  identityId: string | null;
};

export const LOGINS_KEY = "cognito-idp." + COGNITO.region + ".amazonaws.com/" + COGNITO.userPoolId;
export const AWS_TEMP_CREDENTIALS_STORAGE_KEY = "aws-temporary-credentials";
export const clearCognitoIdentityCache = (region: string, identityPoolId: string) => {
  try {
    window.localStorage.removeItem(`aws.cognito.identity-id.${region}:${identityPoolId}`);
  } catch {
    // ignore storage errors
  }
  try {
    window.localStorage.removeItem(`aws.cognito.identity-providers.${identityPoolId}`);
  } catch {
    // ignore storage errors
  }
};

export const persistAwsCredentials = (value: AwsTemporaryCredentials | null) => {
  if (typeof window === "undefined") return;
  try {
    if (value) {
      const payload = {
        ...value,
        expiration: value.expiration ? value.expiration.toISOString() : null,
      };
      window.sessionStorage.setItem(AWS_TEMP_CREDENTIALS_STORAGE_KEY, JSON.stringify(payload));
    } else {
      window.sessionStorage.removeItem(AWS_TEMP_CREDENTIALS_STORAGE_KEY);
    }
  } catch {
    // ignore storage errors
  }
};

export const loadStoredAwsCredentials = (): AwsTemporaryCredentials | null => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.sessionStorage.getItem(AWS_TEMP_CREDENTIALS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Omit<AwsTemporaryCredentials, "expiration"> & { expiration?: string | null };
    return {
      ...parsed,
      expiration: parsed.expiration ? new Date(parsed.expiration) : null,
    };
  } catch {
    return null;
  }
};

export async function fetchTemporaryAwsCredentials(idToken: string): Promise<AwsTemporaryCredentials> {
  if (!idToken) {
    throw new Error("ID 토큰이 제공되지 않았습니다.");
  }

  const normalisedToken = idToken.trim();
  if (!normalisedToken) {
    throw new Error("ID 토큰이 비어 있습니다.");
  }

  const cached = loadStoredAwsCredentials();
  const bufferMs = 2 * 60 * 1000; // 2 minutes
  if (cached?.expiration && cached.expiration.getTime() - bufferMs > Date.now()) {
    if (import.meta.env?.DEV) {
      console.debug("[fetchTemporaryAwsCredentials] reuse cached credentials", {
        identityId: cached.identityId,
        expiresAt: cached.expiration.toISOString(),
      });
    }
    return cached;
  }
  if (cached && !cached.expiration) {
    if (import.meta.env?.DEV) {
      console.debug("[fetchTemporaryAwsCredentials] reuse cached credentials without expiration", {
        identityId: cached.identityId,
      });
    }
    return cached;
  }

  if (import.meta.env?.DEV) {
    console.debug(
      "[fetchTemporaryAwsCredentials] idToken",
      `${normalisedToken.slice(0, 12)}...${normalisedToken.slice(-12)}`,
      "length",
      normalisedToken.length,
    );
    console.debug("[fetchTemporaryAwsCredentials] LOGINS_KEY", LOGINS_KEY);
  }

  const credentialProvider = fromCognitoIdentityPool({
    identityPoolId: COGNITO.identityPoolId!,
    clientConfig: {
      region: COGNITO.region,
    },
    logins: {
      [LOGINS_KEY]: normalisedToken,
    },
  });

  let credentials;
  try {
    credentials = await credentialProvider();
  } catch (error) {
    console.error(
      "[fetchTemporaryAwsCredentials] provider error",
      (error as any)?.name,
      (error as any)?.message,
      (error as any)?.$metadata?.httpStatusCode,
      error,
    );
    throw error;
  }

  if (!credentials.sessionToken) {
    throw new Error("임시 자격 증명을 가져오지 못했습니다.");
  }

  const result: AwsTemporaryCredentials = {
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
    expiration: credentials.expiration ?? null,
    identityId: (credentials as typeof credentials & { identityId?: string }).identityId ?? null,
  };

  if (import.meta.env?.DEV) {
    console.log("[cognito] issued temporary credentials", {
      identityId: result.identityId,
      expiresAt: result.expiration?.toISOString?.() ?? result.expiration,
      accessKeyPreview: `${result.accessKeyId.slice(0, 4)}...${result.accessKeyId.slice(-4)}`,
      sessionTokenPreview: `${result.sessionToken.slice(0, 8)}...${result.sessionToken.slice(-8)}`,
    });
  }

  persistAwsCredentials(result);

  if (import.meta.env?.DEV) {
    console.debug("[fetchTemporaryAwsCredentials] success", {
      identityId: result.identityId,
      expiresAt: result.expiration?.toISOString?.() ?? result.expiration,
    });
  }

  return result;
}
