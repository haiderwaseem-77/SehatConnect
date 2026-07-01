"use client";
import { createContext, useContext, useState, useCallback } from "react";

export type Lang = "en" | "ur";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Honest, contained bilingual toggle.
 * It does NOT fake full-page Urdu translation (we have no Urdu copy beyond the
 * service sublabels). When lang === "ur", ServicesSection promotes each service's
 * real Urdu label to primary + RTL. The page `dir` stays LTR globally.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = useCallback(() => setLang((l) => (l === "en" ? "ur" : "en")), []);
  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Safe fallback so a component can render outside the provider in isolation.
    return { lang: "en", setLang: () => {}, toggle: () => {} };
  }
  return ctx;
}
