// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "react-oidc-context";
import LandingPage from "./pages/LandingPage";
import PolicyPage from "./pages/PolicyPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserDashboardMain from "./pages/UserDashboardMain";
import UserDashboardCreditUsage from "./pages/UserDashboardCreditUsage";
import AwsCognitoSignupTestPage from "./pages/AwsCognitoSignupTestPage";
import "./index.css";
import {
  DEFAULT_LOGIN_LANGUAGE,
  LOGIN_LANGUAGE_STORAGE_KEY,
  loginLanguageMap,
  resolveInitialLoginLanguage,
  type LoginLanguageCode,
} from "./i18n/loginLanguages";
import { clearCognitoIdentityCache } from "./services/awsCredentials";
import { COGNITO } from "./config/cognito";

function Redirector() {
  const navigate = useNavigate();
  const auth = useAuth();

  React.useEffect(() => {
    if (!auth.isAuthenticated) return;

    const currentPath = window.location.pathname;
    const currentTarget = `${currentPath}${window.location.search}${window.location.hash}`;

    let redirectTarget = currentPath.startsWith("/user-dashboard/")
      ? currentTarget
      : "/user-dashboard/main";

    try {
      const stored = window.sessionStorage.getItem("redirect");
      if (stored) {
        redirectTarget = stored;
        window.sessionStorage.removeItem("redirect");
      }
    } catch {
      // ignore storage errors
    }

    if (currentTarget !== redirectTarget) {
      navigate(redirectTarget, { replace: true });
    }
  }, [auth.isAuthenticated, navigate]);

  return null;
}

const determineLoginLanguage = (): LoginLanguageCode => {
  try {
    const stored = window.localStorage.getItem(LOGIN_LANGUAGE_STORAGE_KEY) as LoginLanguageCode | null;
    if (stored && loginLanguageMap[stored]) {
      return stored;
    }
  } catch {
    // ignore storage errors
  }
  return resolveInitialLoginLanguage();
};

function RequireAuth({ children }: { children: React.ReactElement }) {
  const auth = useAuth();
  const location = useLocation();
  const [redirectInitiated, setRedirectInitiated] = React.useState(false);
  React.useEffect(() => {
    if (auth.isLoading || auth.isAuthenticated || redirectInitiated) return;

    const target = `${location.pathname}${location.search}${location.hash}`;
    try {
      window.sessionStorage.setItem("redirect", target || "/user-dashboard/main");
    } catch {
      // ignore storage errors
    }

    const lang = determineLoginLanguage() ?? DEFAULT_LOGIN_LANGUAGE;

    auth
      .signinRedirect({
        extraQueryParams: {
          lang,
        },
      })
      .catch(() => {
        setRedirectInitiated(false);
      });

    setRedirectInitiated(true);
  }, [auth, location, redirectInitiated]);

  React.useEffect(() => {
    if (!auth.isAuthenticated) {
      if (COGNITO.region && COGNITO.identityPoolId) {
        clearCognitoIdentityCache(COGNITO.region, COGNITO.identityPoolId);
      }
      exposeIdToken(oidc.client_id);
      return;
    }
    const globalWindow = window as typeof window & { idToken?: string | null };
    globalWindow.idToken = auth.user?.id_token ?? null;
    exposeIdToken(oidc.client_id);
  }, [auth.isAuthenticated, auth.user?.id_token]);

  React.useEffect(() => {
    if (!auth.isAuthenticated || !auth.user) return;
    const email = auth.user.profile?.email ?? "(no email)";
    const subject = auth.user.profile?.sub ?? auth.user.profile?.userId ?? "(no sub)";
    console.log("[Auth] 로그인 완료", {
      email,
      subject,
      idToken: auth.user.id_token,
      issuedAt: auth.user.profile?.iat,
      expiresAt: auth.user.profile?.exp,
    });
  }, [auth.isAuthenticated, auth.user]);

  if (!auth.isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-sm text-slate-300">로그인 페이지로 이동 중입니다...</p>
      </main>
    );
  }

  return children;
}

function RouterApp() {
  return (
    <>
      <Redirector />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route
          path="/user-dashboard/main"
          element={(
            <RequireAuth>
              <UserDashboardMain />
            </RequireAuth>
          )}
        />
        <Route
          path="/user-dashboard/credit/usage"
          element={(
            <RequireAuth>
              <UserDashboardCreditUsage />
            </RequireAuth>
          )}
        />
        <Route path="/test/aws-cognito-signup" element={<AwsCognitoSignupTestPage />} />
      </Routes>
    </>
  );
}

const isLocal = window.location.origin.startsWith("http://localhost");
const redirectUri = isLocal ? "http://localhost:5173/" : "https://cognimosyne.com/";
const authority = "https://cognito-idp.ap-northeast-2.amazonaws.com/ap-northeast-2_2Qo22vonR";

const oidc = {
  authority: authority,                               // Hosted UI 도메인
  client_id: "6le4d5j955jnmr8h4pe4vjs7ci", // App client ID
  redirect_uri: redirectUri,               // Callback URL (콘솔과 정확히 일치)
  post_logout_redirect_uri: redirectUri,   // Sign-out URL
  response_type: "code",                   // PKCE 자동
  scope: "openid email",
  loadUserInfo: true,
  automaticSilentRenew: false,             // Cognito는 iframe silent renew 비권장
  useRefreshToken: true,                   // Refresh Token 사용 (유효기간은 App client 설정)
  onSigninCallback: () => {
    const clean = redirectUri;
    window.history.replaceState({}, document.title, clean);
    exposeIdToken(oidc.client_id);
  },
};

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

type RootHost = typeof rootElement & { __reactRoot?: ReturnType<typeof ReactDOM.createRoot> };
const host = rootElement as RootHost;
const existingRoot = host.__reactRoot;

const renderApp = () => (
  <React.StrictMode>
    <AuthProvider {...oidc}>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

if (existingRoot) {
  existingRoot.render(renderApp());
} else {
  const root = ReactDOM.createRoot(rootElement);
  host.__reactRoot = root;
  root.render(renderApp());
}

function exposeIdToken(clientId: string) {
  const prefix = `CognitoIdentityServiceProvider.${clientId}.`;
  let token: string | null = null;

  try {
    const lastUser = window.localStorage.getItem(prefix + "LastAuthUser");
    if (lastUser) {
      token = window.localStorage.getItem(`${prefix}${lastUser}.idToken`);
    }
    if (!token) {
      for (const key of Object.keys(window.localStorage)) {
        if (key.startsWith(prefix) && key.endsWith(".idToken")) {
          token = window.localStorage.getItem(key);
          break;
        }
      }
    }
  } catch {
    // ignore storage errors
  }

  if (!token) {
    try {
      for (const key of Object.keys(window.sessionStorage)) {
        if (key.startsWith(prefix) && key.endsWith(".idToken")) {
          token = window.sessionStorage.getItem(key);
          break;
        }
      }
    } catch {
      // ignore storage errors
    }
  }

  if (!token) {
    try {
      const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`${escapedPrefix}[^.]+\\.idToken=([^;]+)`);
      const match = document.cookie.match(regex);
      if (match) {
        token = decodeURIComponent(match[1]);
      }
    } catch {
      // ignore cookie errors
    }
  }

  const globalWindow = window as typeof window & { idToken?: string | null };
  if (token) {
    globalWindow.idToken = token;
    console.log("idToken len/splits:", token.length, token.split(".").length);
  } else {
    console.log(
      "idToken len/splits:",
      globalWindow.idToken?.length ?? 0,
      globalWindow.idToken ? globalWindow.idToken.split(".").length : 0,
    );
  }
}
