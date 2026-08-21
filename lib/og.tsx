import { ImageResponse } from "next/og";
import { CONTACT_PHONE_DISPLAY, PROMISES } from "./constants";

/**
 * The shared Open Graph card.
 *
 * WHY THIS EXISTS: WhatsApp is this business's main channel — a family forwards
 * a link to a sibling or a son abroad constantly. When every page shipped the
 * same image, a forwarded /charges link and a forwarded /areas/dha link looked
 * identical and the recipient learned nothing about what was sent. This helper
 * keeps ONE settled brand look and parameterises only the text, so each route's
 * `opengraph-image.tsx` is three lines of copy.
 *
 * The visual is deliberately unchanged from the original site-wide image
 * (teal ground, ECG pulse, brand name, one line of copy, trust pills, phone).
 * Do not restyle it here — a change to this file changes every share preview on
 * the site at once.
 *
 * ENGLISH ONLY. The `next/og` edge renderer has no Noto Nastaliq Urdu face
 * available, so Urdu here would render as tofu boxes or fall back to a font
 * that sets it badly. Urdu belongs on the page, not on the card.
 *
 * COPY RULES for anything passed in (they are the whole risk):
 *  - NO PRICES, ever — no figure, range or currency (Decision Ledger #9).
 *  - Promise wording must come VERBATIM from lib/constants.ts (`PROMISES`,
 *    `CALLBACK_PROMISE`, `START_PROMISE`, `VERIFICATION_PROMISE`). Never retype
 *    a promise by hand; "usually" in the callback promise is mandatory.
 *  - No physiotherapy / rehabilitation / therapy language (#15), and no
 *    ventilator or tracheostomy (#16).
 *  - Never claim a clinical outcome. Say what a caregiver does, never what the
 *    patient's body will do as a result.
 *  - Headline stays short (roughly 3–7 words) — this is read as a thumbnail in
 *    a WhatsApp chat. A second clause belongs in the subline.
 */

/** 1200x630 — the size every route re-exports. */
export const OG_SIZE = { width: 1200, height: 630 };

export const OG_CONTENT_TYPE = "image/png";

/**
 * The trust pills the original site-wide card carried. Kept as the default so
 * the home page render is unchanged. "First day free" is read from PROMISES so
 * the trial promise is never retyped.
 */
export const OG_DEFAULT_PILLS = [
  "PNC-registered nurses",
  PROMISES.trial.enShort,
  // Fragment of PROMISES.payment ("No advance. Pay after the shift.") — kept
  // short for a pill, exactly as the original card printed it.
  "No advance",
  "24 / 7 Lahore",
];

export interface OgImageInput {
  /** The one line that tells a forwarded-link recipient what this page is. */
  headline: string;
  /** Optional second line — the clause the headline had to drop. */
  subline?: string;
  /** Optional override for the trust pills. Keep them short; four fit a row. */
  pills?: string[];
}

export function ogImage({
  headline,
  subline,
  pills = OG_DEFAULT_PILLS,
}: OgImageInput) {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A6258",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 100px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* ECG pulse line */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
          <svg width="120" height="40" viewBox="0 0 120 40">
            <path
              d="M2 20 H30 L40 6 L55 34 L68 14 L78 20 H118"
              fill="none"
              stroke="#FBF8F2"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="4" cy="20" r="5" fill="#6fd0c3" />
            <circle cx="116" cy="20" r="5" fill="#6fd0c3" />
          </svg>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#FBF8F2",
            lineHeight: 1,
            marginBottom: 16,
            display: "flex",
          }}
        >
          Sehat{" "}
          <span style={{ color: "#6fd0c3", marginLeft: 16 }}>Connect</span>
        </div>

        {/* Headline — the home card's tagline slot, now per page */}
        <div
          style={{
            fontSize: 32,
            color: "rgba(251,248,242,0.75)",
            marginBottom: subline ? 14 : 60,
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {headline}
        </div>

        {/* Subline — omitted on the home card, so its layout is unchanged */}
        {subline ? (
          <div
            style={{
              fontSize: 26,
              color: "rgba(251,248,242,0.6)",
              marginBottom: 60,
              maxWidth: 940,
              lineHeight: 1.35,
              display: "flex",
            }}
          >
            {subline}
          </div>
        ) : null}

        {/* Trust pills */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {pills.map((pill) => (
            <div
              key={pill}
              style={{
                background: "rgba(251,248,242,0.12)",
                border: "1.5px solid rgba(251,248,242,0.25)",
                borderRadius: 50,
                padding: "12px 24px",
                color: "#FBF8F2",
                fontSize: 22,
                display: "flex",
              }}
            >
              {pill}
            </div>
          ))}
        </div>

        {/* Phone number bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 100,
            color: "rgba(251,248,242,0.55)",
            fontSize: 26,
            display: "flex",
          }}
        >
          {CONTACT_PHONE_DISPLAY}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
