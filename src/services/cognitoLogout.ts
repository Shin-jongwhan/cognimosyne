import type { AuthContextProps } from "react-oidc-context";

import { COGNITO } from "../config/cognito";
import { resolveAppRedirectUri } from "../config/urls";
import { clearCognitoIdentityCache, persistAwsCredentials } from "./awsCredentials";

const buildFallbackLogoutUrl = (redirectUri: string): string => {
  const query = new URLSearchParams({
    client_id: COGNITO.userPoolWebClientId,
    logout_uri: redirectUri,
  });
  return `${COGNITO.hostedUiDomain}/logout?${query.toString()}`;
};

export const signOutFromCognito = async (auth: AuthContextProps): Promise<void> => {
  const redirectUri = resolveAppRedirectUri();
  const fallbackUrl = buildFallbackLogoutUrl(redirectUri);
  const idToken = auth.user?.id_token;

  try {
    await auth.removeUser();
  } catch {
    // ignore removal issues to avoid blocking logout
  }

  if (COGNITO.identityPoolId) {
    clearCognitoIdentityCache(COGNITO.region, COGNITO.identityPoolId);
  }

  persistAwsCredentials(null);

  try {
    window.sessionStorage.removeItem("redirect");
  } catch {
    // ignore storage errors
  }

  try {
    await auth.signoutRedirect({
      post_logout_redirect_uri: redirectUri,
      id_token_hint: idToken,
      extraQueryParams: {
        client_id: COGNITO.userPoolWebClientId,
        logout_uri: redirectUri,
      },
    });
  } catch {
    window.location.href = fallbackUrl;
  }
};
