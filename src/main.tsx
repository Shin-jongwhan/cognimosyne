// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";
import LandingPage from "./pages/LandingPage";
import PolicyPage from "./pages/PolicyPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AwsCognitoSignupTestPage from "./pages/AwsCognitoSignupTestPage";
import "./index.css";

function Redirector() {
  const navigate = useNavigate();
  React.useEffect(() => {
    // OIDC 콜백 중이면 건드리지 않음 (state 유실 방지)
    const params = new URLSearchParams(window.location.search);
    if (params.has("code") || params.has("state")) return;

    const redirectPath = sessionStorage.getItem("redirect");
    if (redirectPath) {
      sessionStorage.removeItem("redirect");
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);
  return null;
}

function RouterApp() {
  return (
    <>
      <Redirector />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
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
