"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GA4_ID, isAnalyticsEnabled, trackLead } from "@/lib/analytics";

/**
 * Loads GA4 and records every call / WhatsApp tap on the site.
 *
 * Calls and WhatsApp taps are captured with ONE delegated listener on the
 * document rather than an onClick on each link. There are call and WhatsApp
 * links in ten components today (sticky bar, hero, services rows, price
 * receipt, footer, navbar, CTA banner, both service pages, the 404 and the
 * booking confirmation), and more get added over time. Per-link handlers would
 * mean touching every one of those files and silently missing whichever link
 * someone adds next; delegation covers all of them, including future ones, for
 * free.
 *
 * The form submission is NOT captured here — it is not a link click, and it
 * should only count once the server has actually accepted the lead, so
 * LeadFormD6 calls trackLead() itself on success.
 */
export default function Analytics() {
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;

      // Read the raw attribute, not the resolved .href property: the browser
      // rewrites relative hrefs, and we want exactly what the markup declared.
      const href = anchor.getAttribute("href") ?? "";
      if (!href) return;

      // `source` identifies the surface so we can tell which placements
      // actually produce leads. Prefer an explicit data-analytics-source,
      // then the nearest section id, then the element's own classes.
      const source =
        anchor.dataset.analyticsSource ??
        anchor.closest("section")?.id ??
        anchor.className ??
        "unknown";

      if (href.startsWith("tel:")) {
        trackLead("lead_call", { source });
        return;
      }

      if (href.includes("wa.me") || href.startsWith("whatsapp:")) {
        trackLead("lead_whatsapp", { source });
      }
    }

    // Capture phase: these links open the dialler or WhatsApp and can tear the
    // page down immediately, so the event must be recorded before anything
    // downstream can stop propagation.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!isAnalyticsEnabled()) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA4_ID}');
        `}
      </Script>
    </>
  );
}
