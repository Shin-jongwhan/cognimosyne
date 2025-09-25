import type { LoginLanguageDefinition } from "./types";
import de from "./de";
import en from "./en";
import es from "./es";
import fr from "./fr";
import id from "./id";
import it from "./it";
import ja from "./ja";
import ko from "./ko";
import pt_BR from "./pt_BR";
import zh_CN from "./zh_CN";
import zh_TW from "./zh_TW";

export { type LoginLanguageDefinition, type LoginLanguageStrings, type LandingPageCopy, type LandingPageFeaturesSection, type LandingPageValuesSection, type LandingPageFooter, type LandingPageFeatureCard, type LandingPageValueCard, type LandingPagePolicyLink, type UserDashboardCopy, type UserDashboardNavGroup, type UserDashboardItem } from "./types";

export const LOGIN_LANGUAGE_STORAGE_KEY = "cognito-login-language";

export const loginLanguages = [
  de,
  en,
  es,
  fr,
  id,
  it,
  ja,
  ko,
  pt_BR,
  zh_CN,
  zh_TW,
] as const;

export type LoginLanguageCode = (typeof loginLanguages)[number]["code"];

export const DEFAULT_LOGIN_LANGUAGE: LoginLanguageCode = "en";

export const loginLanguageMap = Object.freeze(
  Object.fromEntries(
    loginLanguages.map((language) => [language.code, language] as const),
  ) as Record<LoginLanguageCode, LoginLanguageDefinition>,
);

export const normaliseLoginLanguage = (value: string | null | undefined): LoginLanguageCode | null => {
  if (!value) return null;
  const lowerValue = value.toLowerCase();
  for (const language of loginLanguages) {
    if (language.code.toLowerCase() === lowerValue) {
      return language.code;
    }
  }
  const base = lowerValue.split(/[-_]/)[0];
  for (const language of loginLanguages) {
    if (language.code.toLowerCase().split(/[-_]/)[0] === base) {
      return language.code;
    }
  }
  return null;
};

export const resolveInitialLoginLanguage = (): LoginLanguageCode => {
  if (typeof window !== "undefined") {
    try {
      const stored = normaliseLoginLanguage(window.localStorage.getItem(LOGIN_LANGUAGE_STORAGE_KEY));
      if (stored) {
        return stored;
      }
    } catch {
      // ignore storage errors
    }
  }

  if (typeof navigator !== "undefined") {
    const candidates = Array.isArray(navigator.languages) && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language];
    for (const candidate of candidates) {
      const match = normaliseLoginLanguage(candidate);
      if (match) {
        return match;
      }
    }
  }

  return DEFAULT_LOGIN_LANGUAGE;
};

export const getLoginLanguage = (code: LoginLanguageCode): LoginLanguageDefinition => loginLanguageMap[code];



