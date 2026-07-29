import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SiteLanguage = "vi" | "en";

interface LanguageContextValue {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const getInitialLanguage = (): SiteLanguage => {
  if (typeof window === "undefined") {
    return "vi";
  }

  const params = new URLSearchParams(window.location.search);
  const queryLanguage = params.get("lang");
  if (queryLanguage === "en" || queryLanguage === "vi") {
    return queryLanguage;
  }

  const storedLanguage = window.localStorage.getItem("sakawi-language");
  return storedLanguage === "en" ? "en" : "vi";
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<SiteLanguage>(getInitialLanguage);

  const setLanguage = (nextLanguage: SiteLanguage) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("sakawi-language", nextLanguage);
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
