"use client";
import { useEffect } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

// Wraps the whole landing page so the mockup's `body.lang-ur` behaviour maps to
// `.d6.lang-ur`, driving every [data-en]/[data-ur] swap via CSS.
export default function LandingRoot({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang === "ur" ? "ur" : "en";
  }, [lang]);

  return <div className={lang === "ur" ? "d6 lang-ur" : "d6"}>{children}</div>;
}
