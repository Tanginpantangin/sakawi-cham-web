import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SiteLanguage = "vi" | "en";
export const languageStorageKey = "sakawi.preferences.language";

interface LanguageContextValue {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
}

const supportedLanguages: readonly SiteLanguage[] = ["vi", "en"];
const fallbackLanguage: SiteLanguage = "vi";
const legacyLanguageStorageKey = "sakawi-language";
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const isSupportedLanguage = (language: string | null | undefined): language is SiteLanguage =>
  supportedLanguages.includes(language as SiteLanguage);

const normalizeLanguageCode = (language: string | null | undefined) =>
  language?.split(/[-_]/)[0]?.toLowerCase() ?? null;

export const resolveBrowserLanguage = (language = window.navigator.language): SiteLanguage => {
  const normalizedLanguage = normalizeLanguageCode(language);
  return isSupportedLanguage(normalizedLanguage) ? normalizedLanguage : fallbackLanguage;
};

const readStoredLanguage = (): SiteLanguage | null => {
  const savedLanguage = window.localStorage.getItem(languageStorageKey)
    ?? window.localStorage.getItem(legacyLanguageStorageKey);

  return isSupportedLanguage(savedLanguage) ? savedLanguage : null;
};

const getInitialLanguage = (): SiteLanguage => {
  if (typeof window === "undefined") {
    return fallbackLanguage;
  }

  return readStoredLanguage() ?? fallbackLanguage;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<SiteLanguage>(getInitialLanguage);

  const setLanguage = (nextLanguage: SiteLanguage) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(languageStorageKey, nextLanguage);
    window.localStorage.removeItem(legacyLanguageStorageKey);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
};
