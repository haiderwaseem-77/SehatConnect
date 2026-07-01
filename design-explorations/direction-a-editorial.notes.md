# Direction A — "The trusted local institution" (Editorial)

**File:** `direction-a-editorial.html` · self-contained, no build step.

## Genre + macrostructure
- **Genre:** Editorial (Hallmark default; the canonical anti-slop voice).
- **Macrostructure:** **Photographic + Letter** — a photographic editorial hero (large labelled caregiver photo well, "Plate 01 · Lahore") fused with a written, first-person *letter* register that runs through the masthead voice and a dedicated "A note from the people behind Sehat Connect" band.
- **Nav archetype:** N6 Newspaper masthead (large serif wordmark + serif kicker + double rule) — reads as an established, accountable broadsheet, not a SaaS nav.
- **Footer archetype:** Ft1 Mast-headed colophon (wordmark + blurb anchor the band; link groups + a closing copyright rule).
- **Type:** Fraunces (warm roman serif) for display/wordmark + Inter for body/UI + Noto Nastaliq Urdu for the real Urdu service sublabels. Warm institutional paper (`#FBFAF6`), teal accent kept small, one brand-teal full-bleed CTA band.

## 5 key design moves
1. **Newspaper masthead + warm paper, not a SaaS nav.** A two-tier header — a persistent slim utility bar (location · 24/7 · EN/اردو toggle · Call · WhatsApp) above a serif masthead with a double rule — frames the brand as a real, named Lahore institution before any selling happens. This is the trust-by-establishment move.
2. **A photographic + letter hero with the lead form as conversion co-star.** Left column = editorial voice (badge → serif headline → lede → labelled caregiver photo well → proof chips → "prefer to talk now" call). Right column = the call-back form, elevated with a teal top-edge. Photograph + plain confident copy on one side, the one action on the other.
3. **Trust proven as a two-part "verification ledger," not six identical icon tiles.** A dark accountability panel shows the **open price** at display scale (Rs. 4,000 / Rs. 3,000 per 12-hr shift), "pay after — no advance," and a real-person Call/WhatsApp pair; beside it a hairline-ruled ledger lists PNC / CNIC / background / female-for-female / 24-7 / WhatsApp / Urdu with their specifics. Specifics carry visual weight; it reads like an audited record.
4. **A genuine "letter" moment, kept honest.** A placeholder founder portrait well ("Founder photo — to add") sits beside a short note assembled *only* from the spec's existing human-voice lines, signed "— The Sehat Connect team." No fabricated quote, name, metric, or testimonial.
5. **Bilingual treatment that is credible and honest.** The header EN/اردو pill renders اردو in Noto Nastaliq; toggling it promotes the *real* Urdu service sublabels (the only Urdu the spec actually supplies) to primary and flips the service-card rows to RTL, with a plain English hint explaining the change. No faked full-page Urdu translation.

## How each of the 5 fears is defused (visibly)
1. **Is this a scam?** Masthead/colophon "established institution" framing, open published price, "pay after — no advance" (stated 3×), PNC registration shown as a specific, a named team note, and a real phone number reachable from a persistent bar — accountability, not anonymity.
2. **Will a safe, verified, decent (often female) person come?** Ledger rows: "CNIC Checked," "Background Screened," "PNC Registered," plus "Female & male nurses — many families prefer a female caregiver for a female patient." Hero chips repeat "CNIC & references checked" and "Female & male nurses."
3. **Can they do the medical task?** Category = Qualified Nurse (PNC registered) vs Attendant, with the full 9-service clinical list and specific descriptions (wound care, ICU step-down, insulin, palliative symptom management), plus the comparison strip.
4. **What will it cost?** The price is a headline, not fine print — Rs. 4,000 / Rs. 3,000 per 12-hr shift at display size in the trust panel, a live price badge on the services toggle, and a per-card price on every service. "No payment now" on the form.
5. **Can I just talk to a human?** Call + WhatsApp in the sticky utility bar (always visible), in the form, in the trust panel ("a real person, one call away"), in the CTA band, in the footer, and in the mobile sticky action bar (Call / WhatsApp / Get a call). "A real person calls you back" is the spine of the letter note.

## DQ gates (all pass)
- Primary action everywhere = call-back form / Call / WhatsApp. No accounts, login, dashboard, browse-nurses, or booking calendar.
- Form: Name + Phone required (inline validation); "Who needs care?" optional, tap-not-type single-select chips using the exact 5 options.
- Call + WhatsApp reachable from anywhere: persistent header utility bar **and** sticky bottom mobile action bar; contact constants exact (`0328-8489988`, `tel:+923288489988`, `wa.me/923288489988` + URL-encoded Roman-Urdu message).
- No invented testimonials/quotes/metrics/response-times; "usually within 30 minutes" is the spec's own verbatim CTA copy. Founder voice is a labelled placeholder.
- Mobile-first 390px: body 18px, nothing important <16px, tap targets ≥56px (secondary ≥44px), `overflow-x: clip` on html+body, sticky bar cleared by body bottom padding, no horizontal scroll (secondary form buttons stack <384px; price rows stack <480px).
- Bilingual-ready: EN default, real Urdu sublabels in Noto Nastaliq RTL, credible header EN/اردو toggle.
- Brand: exact `@theme` tokens defined as CSS variables; every colour/font references a named token (no mid-render improvisation).

## Hallmark pre-emit self-critique (1–5; none < 3, no revision pass triggered)
| Axis | Score | Note |
|---|---|---|
| **Philosophy** | **5** | Clear position: a warm, accountable Lahore care institution — masthead + ledger + letter all argue the same thing. |
| **Hierarchy** | **4** | Eye lands on serif headline + the form co-star within 1s; one teal CTA band; price given display weight. |
| **Execution** | **4** | Focus rings, ≥56px targets, tabular-nums, hairlines, verified contrast, clean token discipline, responsive stacking. (Held at 4 — no live browser render available to pixel-verify wraps.) |
| **Specificity** | **5** | Lahore masthead, Urdu sublabels, PNC/CNIC, published prices, plate captions — unmistakably *this* brief. |
| **Restraint** | **4** | One orchestrated entrance, hairlines over heavy cards, single accent band, dropped a fabricated Urdu line. |
| **Variety** | **4** | Masthead + photographic/letter hero + verification ledger + colophon — structurally distinct from the generic hero→3-feature→CTA, and from the parallel directions. |

Stamp in HTML: `Philosophy 5 · Hierarchy 4 · Execution 4 · Specificity 5 · Restraint 4 · Variety 4`.
