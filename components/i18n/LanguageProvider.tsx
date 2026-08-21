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
 * Bilingual toggle. `LandingRoot` maps `lang` to a `.d6`/`.d6.lang-ur` class,
 * which drives every [data-en]/[data-ur] pair in direction6.css. Most major
 * sections (hero, FAQ, footer, services, cities, booking, 404) now carry
 * data-ur lang="ur" dir="rtl" pairs; NORTH-STAR §5/roadmap item 11 is full coverage of every
 * customer-visible string — check for gaps before claiming it's done.
 * The page `dir` stays LTR globally; individual Urdu spans set their own dir.
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
