import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import {
  DEFAULT_LOGIN_LANGUAGE,
  LOGIN_LANGUAGE_STORAGE_KEY,
  loginLanguageMap,
  loginLanguages,
  resolveInitialLoginLanguage,
  type LoginLanguageCode,
  type UserDashboardCopy,
  type UserDashboardNavGroup,
} from "../i18n/loginLanguages";
import { signOutFromCognito } from "../services/cognitoLogout";

const resolveDashboardLanguage = (preferred?: LoginLanguageCode): LoginLanguageCode => {
  const candidates: LoginLanguageCode[] = [];
  if (preferred) candidates.push(preferred);
  candidates.push(DEFAULT_LOGIN_LANGUAGE);
  if (!candidates.includes("ko" as LoginLanguageCode)) {
    candidates.push("ko" as LoginLanguageCode);
  }
  for (const lang of loginLanguages) {
    const code = lang.code as LoginLanguageCode;
    if (!candidates.includes(code)) {
      candidates.push(code);
    }
  }
  for (const code of candidates) {
    const definition = loginLanguageMap[code];
    if (definition?.userDashboard) {
      return code;
    }
  }
  return DEFAULT_LOGIN_LANGUAGE;
};

const coerceGroups = (copy: UserDashboardCopy): UserDashboardNavGroup[] => {
  const groups = copy.navGroups ? [...copy.navGroups] : [];
  const mainFromCopy = groups.find((group) => group.key === "main");

  const mainGroup: UserDashboardNavGroup =
    mainFromCopy ?? {
      key: "main",
      label: copy.title,
      items: [],
    };

  const filtered = groups.filter((group) => group.key !== "main");
  return [mainGroup, ...filtered];
};

export default function UserDashboardMain() {
  const auth = useAuth();
  const [languageCode, setLanguageCode] = useState<LoginLanguageCode>(() => resolveInitialLoginLanguage());
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(LOGIN_LANGUAGE_STORAGE_KEY) as LoginLanguageCode | null;
    if (stored && loginLanguageMap[stored]) {
      setLanguageCode(stored);
    }
  }, []);

  useEffect(() => () => {
    if (avatarUrl) URL.revokeObjectURL(avatarUrl);
  }, [avatarUrl]);

  const resolvedLanguage = useMemo(() => resolveDashboardLanguage(languageCode), [languageCode]);

  const dashboardCopy = useMemo<UserDashboardCopy>(() => {
    const definition = loginLanguageMap[resolvedLanguage]?.userDashboard;
    if (definition) return definition;
    return loginLanguageMap[resolveDashboardLanguage()]!.userDashboard!;
  }, [resolvedLanguage]);

  const languageStrings = useMemo(() => {
    const definition = loginLanguageMap[resolvedLanguage] ?? loginLanguageMap[DEFAULT_LOGIN_LANGUAGE];
    return definition.strings;
  }, [resolvedLanguage]);

  const navGroups = useMemo(() => coerceGroups(dashboardCopy), [dashboardCopy]);
  const [activeGroupKey, setActiveGroupKey] = useState<string>(() => navGroups[0]?.key ?? "main");
  const [openGroupKey, setOpenGroupKey] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenGroupKey(null);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((current) => !current);
  }, []);

  useEffect(() => {
    if (!navGroups.length) return;
    setActiveGroupKey((current) => (navGroups.some((group) => group.key === current) ? current : navGroups[0].key));
  }, [navGroups]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  const handleLogout = useCallback(async () => {
    await signOutFromCognito(auth);
  }, [auth]);

  const handleAvatarButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (avatarUrl) {
      URL.revokeObjectURL(avatarUrl);
    }
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.12),_transparent_55%)]" aria-hidden="true" />
      <div className="relative min-h-screen flex flex-col">
        <header className="landing-header sticky top-0 z-20">
          <div className="landing-header__inner dashboard-header__inner grid w-full grid-cols-1 gap-2 px-3 py-2 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-4 sm:px-6">
            <div className="flex w-full items-center justify-between sm:w-auto sm:justify-start">
              <span className="dashboard-header__brand">Media Translator</span>
            </div>
            <nav className="hidden sm:flex flex-wrap items-center justify-center gap-3 lg:gap-5">
              {navGroups.map((group) => {
                const isActive = group.key === activeGroupKey;
                const isOpen = openGroupKey === group.key && group.items.length > 0;
                const hasItems = group.items.length > 0;

                const handleGroupClick = () => {
                  setActiveGroupKey(group.key);
                  if (!hasItems) {
                    setOpenGroupKey(null);
                    return;
                  }
                  setOpenGroupKey((current) => (current === group.key ? null : group.key));
                };
                return (
                  <div
                    key={group.key}
                    className="relative"
                    onMouseEnter={() => hasItems && setOpenGroupKey(group.key)}
                    onMouseLeave={() => hasItems && setOpenGroupKey(null)}
                    onFocus={() => hasItems && setOpenGroupKey(group.key)}
                    onBlur={() => hasItems && setOpenGroupKey(null)}
                  >
                    <button
                      type="button"
                      onClick={handleGroupClick}
                      className={`dashboard-nav__trigger px-4 py-2 text-sm font-semibold transition ${
                        isActive ? "text-white" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {group.label}
                    </button>
                    {group.items.length > 0 && (
                      <div
                        className={`absolute left-0 mt-2 min-w-[220px] rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-xl transition-all duration-150 ${
                          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-1 invisible"
                        }`}
                        role="menu"
                        aria-hidden={!isOpen}
                        tabIndex={-1}
                      >
                        <ul className="flex flex-col py-2">
                          {group.items.map((item) => {
                            const isAvailable = Boolean(item.ctaPath && item.isAvailable);
                            const actionLabel = isAvailable
                              ? dashboardCopy.actions.open
                              : dashboardCopy.actions.comingSoon;
                            return (
                              <li key={item.key}>
                                <div className="w-full px-4 py-3 text-sm text-slate-200 hover:bg-white/10 transition rounded-xl">
                                  <p className="font-semibold">{item.title}</p>
                                  {item.description && (
                                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">{item.description}</p>
                                  )}
                                  {isAvailable ? (
                                    <Link
                                      to={item.ctaPath!}
                                      onClick={() => setOpenGroupKey(null)}
                                      className="mt-3 inline-flex items-center rounded-full border border-indigo-400/40 px-3 py-1 text-xs font-semibold text-indigo-200 transition hover:border-indigo-300 hover:text-white"
                                    >
                                      {actionLabel}
                                    </Link>
                                  ) : (
                                    <span className="mt-3 inline-flex items-center rounded-full bg-slate-800/70 px-3 py-1 text-xs font-medium text-slate-400">
                                      {actionLabel}
                                    </span>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="sm:hidden">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="mobile-menu__toggle inline-flex h-10 w-10 items-center justify-center text-white transition hover:text-violet-300 focus:outline-none"
                aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              >
                <span className="sr-only">{isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}</span>
                <span className="flex flex-col items-center justify-center gap-1">
                  <span className="block h-0.5 w-5 rounded-full bg-white" />
                  <span className="block h-0.5 w-5 rounded-full bg-white" />
                  <span className="block h-0.5 w-5 rounded-full bg-white" />
                </span>
              </button>
            </div>

            <div className="hidden sm:flex w-full items-center justify-end gap-2 sm:w-auto sm:gap-3">
              {auth.user?.profile?.email && (
                <span className="text-xs text-slate-300 whitespace-nowrap">
                  {auth.user.profile.email}
                </span>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="landing-header__button"
              >
                {languageStrings.logout}
              </button>
              <div className="relative">
                <button
                  type="button"
                  aria-label="내 프로필"
                  onClick={handleAvatarButtonClick}
                  className="h-11 w-11 rounded-full border border-white/15 bg-gradient-to-br from-slate-700/60 to-slate-600/40 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-violet-400/60 transition"
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="사용자 아이콘" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-sm font-semibold text-white">{auth.user?.profile?.email?.[0]?.toUpperCase() ?? "U"}</span>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </header>

        <div
          className={`fixed inset-0 z-40 sm:hidden transition-opacity duration-200 ${
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-slate-900/40" onClick={closeMobileMenu} aria-hidden="true" />
          <aside
            className={`absolute inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white/75 backdrop-blur-lg text-slate-900 shadow-2xl transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <span className="text-lg font-semibold">Media Translator</span>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="mobile-menu__close inline-flex h-10 w-10 items-center justify-center text-slate-600 transition hover:text-violet-500 focus:outline-none"
                aria-label="메뉴 닫기"
              >
                <span className="sr-only">메뉴 닫기</span>
                <span className="relative h-4 w-4">
                  <span className="absolute left-0 top-1/2 block h-0.5 w-4 -translate-y-1/2 rotate-45 bg-slate-600" />
                  <span className="absolute left-0 top-1/2 block h-0.5 w-4 -translate-y-1/2 -rotate-45 bg-slate-600" />
                </span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="space-y-6">
                {navGroups.map((group, index) => {
                  const isActiveGroup = group.key === activeGroupKey;
                  return (
                    <li key={group.key} className="space-y-3">
                      {index > 0 && <div className="mx-auto h-px w-4/5 rounded-full bg-white/70" />}
                      <button
                        type="button"
                        onClick={() => setActiveGroupKey(group.key)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left text-base font-bold tracking-tight transition-shadow transition-colors ${
                          isActiveGroup
                            ? "border-violet-400 bg-white text-violet-700 shadow-lg shadow-violet-500/20"
                            : "border-white/60 bg-white/80 text-slate-900 shadow-sm hover:bg-white"
                        }`}
                      >
                        {group.label}
                      </button>
                      {group.items.length > 0 && (
                        <ul className="space-y-2">
                          {group.items.map((item) => {
                            const isAvailable = Boolean(item.ctaPath && item.isAvailable);
                            const actionLabel = isAvailable
                              ? dashboardCopy.actions.open
                              : dashboardCopy.actions.comingSoon;
                            return (
                              <li key={item.key} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                                {item.description && (
                                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{item.description}</p>
                                )}
                                {isAvailable ? (
                                  <Link
                                    to={item.ctaPath!}
                                    onClick={closeMobileMenu}
                                    className="mt-3 inline-flex items-center justify-center rounded-full border border-indigo-400/60 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:border-indigo-500 hover:text-indigo-700"
                                  >
                                    {actionLabel}
                                  </Link>
                                ) : (
                                  <span className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-400">
                                    {actionLabel}
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-slate-200 px-6 py-5 space-y-3 text-sm">
              {auth.user?.profile?.email && (
                <p className="font-medium text-slate-700">{auth.user.profile.email}</p>
              )}
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  handleLogout();
                }}
                className="mobile-menu__logout w-full rounded-full px-4 py-2.5 text-sm font-semibold shadow-sm transition"
              >
                {languageStrings.logout}
              </button>
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  handleAvatarButtonClick();
                }}
                className="flex w-full items-center justify-between rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <span>마이페이지</span>
                <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-slate-700">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="사용자 아이콘" className="h-full w-full object-cover" />
                  ) : (
                    auth.user?.profile?.email?.[0]?.toUpperCase() ?? "U"
                  )}
                </span>
              </button>
            </div>
          </aside>
        </div>

        <div className="flex-1 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{dashboardCopy.title}</h1>
              {dashboardCopy.subtitle && (
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">{dashboardCopy.subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
