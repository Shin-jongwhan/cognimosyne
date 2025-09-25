// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "react-oidc-context";
import LandingPage from "./pages/LandingPage";
import PolicyPage from "./pages/PolicyPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserDashboardMain from "./pages/UserDashboardMain";
import AwsCognitoSignupTestPage from "./pages/AwsCognitoSignupTestPage";
import "./index.css";
import {
  DEFAULT_LOGIN_LANGUAGE,
  LOGIN_LANGUAGE_STORAGE_KEY,
  loginLanguageMap,
  resolveInitialLoginLanguage,
  type LoginLanguageCode,
} from "./i18n/loginLanguages";

function Redirector() {
  const navigate = useNavigate();
  const auth = useAuth();

  React.useEffect(() => {
    if (!auth.isAuthenticated) return;

    let redirectPath = "/user-dashboard/main";
    try {
      const stored = window.sessionStorage.getItem("redirect");
      if (stored) {
        redirectPath = stored;
        window.sessionStorage.removeItem("redirect");
      }
    } catch {
      // ignore storage errors
    }

    if (window.location.pathname !== redirectPath) {
      navigate(redirectPath, { replace: true });
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
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider {...oidc}>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
