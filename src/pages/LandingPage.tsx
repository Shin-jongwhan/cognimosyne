// /src/pages/LandingPage.tsx
import HeroSection from "../components/HeroSection";
import { motion, useAnimation, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useAuth } from "react-oidc-context";

import {
  DEFAULT_LOGIN_LANGUAGE,
  LOGIN_LANGUAGE_STORAGE_KEY,
  loginLanguages,
  loginLanguageMap,
  resolveInitialLoginLanguage,
  type LoginLanguageCode,
} from "../i18n/loginLanguages";

import { signOutFromCognito } from "../services/cognitoLogout";

export default function LandingPage() {
  const auth = useAuth();
  const [loginLanguage, setLoginLanguage] = useState<LoginLanguageCode>(() => resolveInitialLoginLanguage());
  const selectedLanguage = loginLanguageMap[loginLanguage] ?? loginLanguageMap[DEFAULT_LOGIN_LANGUAGE];

  const setPostLoginRedirect = () => {
    try {
      window.sessionStorage.setItem("redirect", "/user-dashboard/main");
    } catch {
      // ignore storage errors
    }
  };

  const handleLogin = () => {
    setPostLoginRedirect();
    auth.signinRedirect({ extraQueryParams: { lang: loginLanguage } });
  };

  const handleSignup = () => {
    setPostLoginRedirect();
    auth.signinRedirect({ extraQueryParams: { lang: loginLanguage, screen_hint: "signup" } });
  };

  const handleLogout = useCallback(() => {
    void signOutFromCognito(auth);
  }, [auth]);

  const handleLoginLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as LoginLanguageCode;
    setLoginLanguage(loginLanguageMap[next] ? next : DEFAULT_LOGIN_LANGUAGE);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(LOGIN_LANGUAGE_STORAGE_KEY, loginLanguage);
    } catch {
      // ignore storage errors
    }
  }, [loginLanguage]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // 기능 소개 섹션 제어
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresCtrl = useAnimation();
  const featuresInView = useInView(featuresRef, { once: true, margin: "-20% 0px -20% 0px" });

  useEffect(() => { if (featuresInView) featuresCtrl.start("show"); }, [featuresInView, featuresCtrl]);

  const featSectionVariants = {
    hidden: { opacity: 0, y: 48 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  const featCardVariants = {
    hidden: { opacity: 0, y: 24 },
    show:   (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" } })
  };

  // 서비스 소개 섹션 제어
  const valueRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(valueRef, { once: true, margin: "-20% 0px -20% 0px" });

  useEffect(() => { if (isInView) controls.start("show"); }, [isInView, controls]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 48 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show:   (i: number) => ({
      opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
    }),
  };

  const featuresCopy = selectedLanguage.landingPage.featuresSection;
  const valuesCopy = selectedLanguage.landingPage.valuesSection;
  const footerCopy = selectedLanguage.landingPage.footer;

  const renderResponsiveText = (text: string) => text.split("\n").map((line, index, array) => (
    <span key={index}>
      {line}
      {index < array.length - 1 && (
        <>
          <span className="inline sm:hidden"> </span>
          <br className="hidden sm:inline" />
        </>
      )}
    </span>
  ));

  return (
    <main className="min-h-screen bg-black text-white font-sans scroll-smooth">
      {/* 상단 우측 로그인/로그아웃 영역 */}
      <header className="landing-header sticky top-0 z-50">
        <div className="landing-header__inner flex items-center justify-end gap-1 sm:gap-2 px-3 sm:px-4 py-1">
          <select
            value={loginLanguage}
            onChange={handleLoginLanguageChange}
            className="landing-header__language-select"
            aria-label={selectedLanguage.strings.languageSelectorLabel}
          >
            {loginLanguages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.label}
              </option>
            ))}
          </select>

          {auth.isAuthenticated ? (
            <>
              <span className="landing-header__email hidden sm:inline truncate max-w-[40vw]">
                {auth.user?.profile?.email}
              </span>
              <button
                onClick={handleLogout}
                className="landing-header__button">
                {selectedLanguage.strings.logout}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={handleLogin}
                className="landing-header__button">
                {selectedLanguage.strings.login}
              </button>
              <button
                onClick={handleSignup}
                className="landing-header__button landing-header__button--primary">
                {selectedLanguage.strings.signup}
              </button>
            </div>
          )}
        </div>
      </header>

      <HeroSection />

      {/* 기능 소개 섹션 */}
      <motion.section
        id="features"
        ref={featuresRef}
        className="bg-gradient-to-b from-black to-gray-900 text-white px-6 py-16 sm:py-28 lg:py-40"
        variants={featSectionVariants}
        initial="hidden"
        animate={featuresCtrl}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="font-extrabold tracking-tight leading-tight text-4xl sm:text-6xl lg:text-7xl mb-12 sm:mb-16">{featuresCopy.title}</h2>

          <p className="max-w-4xl text-lg sm:text-2xl text-gray-300 leading-loose mb-14 sm:mb-20">
            {renderResponsiveText(featuresCopy.description)}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-14 max-w-6xl w-full justify-items-center">
            {featuresCopy.cards.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/90 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow text-center w-full max-w-sm border border-white/5"
                variants={featCardVariants}
                custom={index}
                initial="hidden"
                animate={featuresCtrl}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 서비스 설명 및 가치 섹션 */}
      <motion.section
        ref={valueRef}
        className="bg-gray-900 text-white py-60 px-6"
        variants={sectionVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-7xl font-extrabold mb-20">{valuesCopy.title}</h2>
          <p className="text-2xl text-gray-300 leading-loose mb-24 max-w-4xl">
            {renderResponsiveText(valuesCopy.description)}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 w-full">
            {valuesCopy.cards.map((item, i) => (
              <motion.div
                key={i}
                className="bg-gray-800 p-10 rounded-xl shadow-lg text-left"
                variants={cardVariants}
                custom={i}
                initial="hidden"
                animate={controls}
              >
                <h3 className="text-2xl font-semibold mb-5">{item.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 px-6 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 text-sm">
          <div className="space-y-2">
            {footerCopy.businessLines.map((line, index) => (
              <p key={index} className={index === footerCopy.businessLines.length - 1 ? "mt-2" : undefined}>
                {line}
              </p>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-20">
            <div className="space-y-1">
              <p className="font-semibold text-white">{footerCopy.policyHeading}</p>
              <ul className="space-y-1">
                {footerCopy.policies.map((policy) => (
                  <li key={policy.href}>
                    <a href={policy.href} className="hover:underline">
                      {policy.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-x-4 flex items-center mt-4 md:mt-0">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-kakaotalk"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}









