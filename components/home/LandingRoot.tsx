"use client";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

// Wraps the whole landing page so the mockup's `body.lang-ur` behaviour maps to
// `.d6.lang-ur`, driving every [data-en]/[data-ur] swap via CSS.
//
// Also hosts the site's ONE scroll-reveal mechanism (progressive enhancement):
// any element marked `data-reveal` is fully visible by default (SSR / no-JS /
// crawlers / reduced-motion). Only when JS runs AND motion is allowed do we add
// `.motion-ready` to the root — which is what arms the reveal CSS — then an
// IntersectionObserver adds `.is-revealed` as each element scrolls in (fire once).
// Elements already in the viewport on load are revealed synchronously in the same
// tick so there is no first-paint flash and the hero never starts hidden.
export default function LandingRoot({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Keep the region tag on both sides. The server renders lang="en-PK"; this
    // used to reset it to a bare "en" on the first toggle, quietly dropping the
    // region for the rest of the session.
    document.documentElement.lang = lang === "ur" ? "ur-PK" : "en-PK";
  }, [lang]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // no-JS / reduced-motion: elements stay fully visible (default).
    }

    root.classList.add("motion-ready");
    const els = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const vh = window.innerHeight || document.documentElement.clientHeight;

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target); // fire once
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of els) {
      const r = el.getBoundingClientRect();
      // Already on screen at load (e.g. above the fold): reveal now, in the same
      // tick as .motion-ready, so it renders visible with no flash and no wait.
      if (r.top < vh && r.bottom > 0) {
        el.classList.add("is-revealed");
      } else {
        io.observe(el);
      }
    }
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={lang === "ur" ? "d6 lang-ur" : "d6"}>
      {children}
    </div>
  );
}
