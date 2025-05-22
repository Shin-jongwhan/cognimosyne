import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PolicyPage from "./pages/PolicyPage";
import "./index.css";

function Redirector() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const redirectPath = sessionStorage.getItem("redirect");
    if (redirectPath) {
      sessionStorage.removeItem("redirect");
      navigate(redirectPath);
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
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RouterApp />
    </BrowserRouter>
  </React.StrictMode>
);
