"use client";
import { createContext, useContext, useCallback, useSyncExternalStore } from "react";

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
/**
 * `?lang=ur` makes the Urdu view shareable, and the URL is the source of truth.
 *
 * The toggle is CSS-only, so without a parameter the Urdu view has no address: a
 * son cannot send his father a link that opens in Urdu — the father lands in
 * English and has to find the toggle himself. This fixes that without splitting
 * the site into /ur/ URLs, which would double the page count and the maintenance
 * and hand us hreflang to get wrong.
 *
 * Language is READ FROM the URL rather than mirrored into it. Keeping a second
 * copy in useState means two things that can disagree; deriving from the URL
 * means the address bar always describes what is on screen, so copying it shares
 * exactly that. It also makes the browser's back button undo a language change,
 * which is what a user expects.
 *
 * useSyncExternalStore, not an effect: the URL is an external system, the server
 * snapshot is always "en" so static generation is preserved, and React swaps to
 * the client value during hydration without a mismatch warning.
 *
 * Only `?lang=ur` is ever written. English is the default, so switching back
 * strips the parameter — which keeps the shareable link and the canonical URL
 * the same string in the common case.
 */
const PARAM = "lang";
const EVENT = "sehat:langchange";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

const getSnapshot = (): Lang =>
  new URLSearchParams(window.location.search).get(PARAM) === "ur" ? "ur" : "en";

/** The server has no URL parameters to read, so it always renders English. */
const getServerSnapshot = (): Lang => "en";

function writeLang(next: Lang) {
  const url = new URL(window.location.href);
  if (next === "ur") url.searchParams.set(PARAM, "ur");
  else url.searchParams.delete(PARAM);
  // replaceState, not pushState — a language switch is not a navigation, and it
  // should not put an entry between the user and the page they came from.
  window.history.replaceState(null, "", url.toString());
  window.dispatchEvent(new Event(EVENT));
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setLang = useCallback((l: Lang) => writeLang(l), []);
  const toggle = useCallback(() => writeLang(lang === "en" ? "ur" : "en"), [lang]);

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
