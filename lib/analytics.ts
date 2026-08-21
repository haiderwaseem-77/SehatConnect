/**
 * GA4 event tracking for the three actions that are the entire point of this site:
 * a phone call, a WhatsApp message, or a call-back form submission.
 *
 * Nothing here runs unless NEXT_PUBLIC_GA4_ID is set. With the variable unset —
 * which is the state today — the GA4 script never loads and every call below is
 * a no-op, so the site behaves exactly as it did before analytics existed.
 *
 * Why this matters beyond reporting: the Google Ads campaign must not start
 * spending until these three events are confirmed firing as conversions. Paying
 * for clicks you cannot measure is how a small budget disappears with nothing
 * learned.
 */

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

export const isAnalyticsEnabled = () => GA4_ID.length > 0;

/**
 * The three lead actions. Mark all three as conversions in the GA4 UI —
 * Admin -> Events -> "Mark as key event". The names are deliberately stable;
 * renaming them orphans historical data and any Ads conversion built on them.
 */
export type LeadEvent = "lead_call" | "lead_whatsapp" | "lead_form_submit";

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fire a lead event. Safe to call anywhere, at any time: it no-ops on the
 * server, when GA4 is unconfigured, and when the script has not loaded yet.
 *
 * `source` says which surface produced the action (sticky bar, hero, footer …)
 * so the highest-converting placements can be identified rather than guessed at.
 */
export function trackLead(event: LeadEvent, params: GtagParams = {}): void {
  if (typeof window === "undefined" || !isAnalyticsEnabled()) return;
  if (typeof window.gtag !== "function") return;

  try {
    window.gtag("event", event, params);
  } catch {
    // Analytics must never break a lead action. Swallow deliberately.
  }
}
