# Audit — `direction-6-combined.html` (impeccable, audit mode)

> **STATUS (2026-07-01): HISTORICAL CHANGELOG.** This documents the polish of the direction-6 mockup, which has since been ported into the live Next.js app. Future customer-facing changes are governed by **`/NORTH-STAR.md`** (specs, promises, DoD) — not this file.

**Date:** 2026-06-30 · **Target:** `design-explorations-v2/direction-6-combined.html`
**Verdict:** Strong, product-aware direction with real craft (receipt, WhatsApp deep-link chips, sticky bar, honesty labels). But it carries recognizable AI-template tells, and the most trust-critical element — the verified nurse ID card — renders like a wireframe, not a credible mock. Design health ~29/40.

**Hard constraints (product law — never violate while fixing):** mobile-first correct at 390px; body ≥18px, nothing important <16px, tap targets ≥56px, high-contrast dark-teal on cream (no faint grey); one page → "we'll call you back" + Call + WhatsApp; form = Name + Phone only + optional tap-not-type chips; locked palette (cream `#FBF8F2`, teal `#0D7A6E`, dark teal `#0A2E2B`, gold `#C9A24B`); fonts Plus Jakarta Sans / Fraunces / Noto Nastaliq Urdu; heartbeat/pulse + 8px accent-bar motif; trust via specifics not icon-claims.

**Section order (current):** Hero (with form) → Price Receipt → Services → Verified ID card → FAQ → Founder → Final CTA → Footer.

---

## Checklist — execute in this order

### Phase 1 — P1 (trust / conversion / slop)

- [x] **P1-1 · Rebuild the verified ID-card placeholder.** (CSS ~208–230; markup ~679–692) It stacks 4 competing placeholder signals: radial-gradient glow panel, generic-person silhouette SVG, ghosted 54px "AS" monogram at 22% opacity, AND a rotated gold "SEHAT VERIFIED" rubber-stamp → reads as unfinished. **Fix:** commit to ONE calm placeholder — single restrained silhouette on a *flat* `--teal`/`--ink` tone (kill the radial gradient), drop the ghost monogram, drop the rotated rubber-stamp. Keep the "Sample photo" tag and the PNC-number pill (those carry real credibility). Leave a clean seam for a real nurse photo later. — DONE: `.id-photo` now flat `var(--teal-deep)`; figure reduced to one cream-tint head+shoulders silhouette; removed `.id-mono` + `.id-stamp` (markup + CSS); kept `.sample-tag` and the PNC pill. Clean single-child structure so a real `<img>` can drop into `.id-photo` later.
- [x] **P1-2 · De-template the eyebrows (7× → ~1).** (`.eyebrow` 85–90; instances 497, 573, 608, 671, 733, 810, 836) An uppercase tracked kicker above every section is the strongest pervasive AI tell. **Fix:** keep the 8px teal accent-bar motif as the through-line; remove the repeated uppercase label on ~6 of 7 sections (let them open on the `h2`, or use the pulse-line divider). Keep one named kicker (hero) as a deliberate device. — DONE: removed 6 eyebrows (receipt, services, verified, faq, about, closer); kept hero kicker only. Zeroed the now-orphan `margin-top:14px` on `.sec-head h2`, `.verified h2`, `.closer h2`. Services still opens on its pulse-line divider. Dead `.verified .eyebrow`/`.closer .eyebrow` colour rules left in place (harmless, unused).
- [x] **P1-3 · Fix hard-constraint breaches.** Care-type chips `min-height:48px` (168) and lang toggle `44px` (112) → bump both to ≥56px. Form labels `.lbl` 15px (154) and hero trust pills 15px (141) → bump to ≥16px. (Genuinely-minor secondary text at 12–14px is defensible; leave it.) — DONE: chips + lang toggle now `min-height:56px`; `.lbl` and hero pills now 16px. Also bumped chip font 15→16px (cheap safety, still a clean wrap).

### Phase 2 — P2 (notable polish)

- [x] **P2-1 · Copy pass.** Cut em-dashes (33 in body) down toward periods/commas; keep at most ONE "No X, no Y, no Z" triplet on the whole page (currently 3); dedupe "Nothing hidden" (appears 3× in the receipt section). Keep the warm Roman-Urdu WhatsApp template (line ~936). — DONE: converted ~17 English body em-dashes to periods/commas (hero-sub, both ribbons, receipt, services h2+p, svc-help, svc-foot, verified h2+p, id-row, id-note, faq h2, founder, c-sub, sample-line, footer areas, both form-ok). Kept ONE device em-dash in the hero `h1` and the title/meta (not body). Triplets now 1 ("No fine print, no salesman, no advance"); reduced the FAQ-scam triplet to a pair. "Nothing hidden" now appears once (eyebrow removal handled the dup; receipt-foot "NOTHING HIDDEN" kept). Urdu copy + WhatsApp template untouched.
- [x] **P2-2 · Flatten gradient glows / avatars.** Hero `::before` dual radial glows (121–126), id-photo gradient (210), founder gradient monogram circle (373), testimonial gradient face (382) → flatten to solid brand tones or one very-soft wash; reserve any glow for a single intentional moment. — DONE: hero `::before` reduced to one very-soft teal wash (gold glow dropped); id-photo flattened in P1-1; founder monogram now flat `var(--cream-2)`; testimonial face removed entirely in P3-3.
- [x] **P2-3 · Differentiate the two dark sections + fix the closer→footer seam.** Verified card (`--ink`) and Final CTA closer (`--ink`, 388) are the same component twice; closer (#0A2E2B) sits directly above footer (#072421, 400) → one long dark band. **Fix:** make the closer a `--teal` brand drench (warmer "call to action") while the ID card stays deep `--ink` ("official document"); add a real seam at closer→footer (8px accent bar like line 462, or a tonal step). — DONE: closer is now a `--teal` drench (white text, c-sub/closer-urdu lightened for contrast on teal); ID card stays `--ink`. Seam: teal→near-black footer is itself a tonal step, reinforced with an 8px GOLD `.seam-gold` bar between them. JUDGMENT CALL: used gold (locked palette) not teal for this one bar, because a teal bar would blend into the teal closer; the primary 8px teal accent-bar through-line at page top is preserved.
- [x] **P2-4 · Break the flat heading scale.** Section h2s all `clamp(27px,6.2vw,40px)` (188, 254, 393) / verified `clamp(26px…)` (198) → introduce one real modular step so sections aren't six identical h2s (e.g. the closer/receipt headline differentiated). Add `text-wrap:balance` to headings. — DONE: closer h2 stepped up to `clamp(30px,7.2vw,46px)` as the climactic headline; verified h2 normalised to the base `clamp(27px,6.2vw,40px)`. Added `text-wrap:balance` to the global `h1,h2,h3` rule.
- [x] **P2-5 · Inline form error message (not color-only).** (JS 1003–1004) On invalid name/phone the only feedback is a red border. **Fix:** add a plain-language inline message ("Please add your phone number so we can call you back"); don't rely on color alone (WCAG + Nielsen #9). — DONE: added a `.form-err` element (icon + `role="alert"` + `aria-live`) above the submit button in BOTH forms; `wireForm()` now sets a plain-language message ("Please add your name…" / "Please add your phone number so we can call you back."), sets `aria-invalid`, and clears the message on input. Red is now accompanied by text + icon, not colour alone.
- [x] **P2-6 · Fix female-for-female badge wrap.** (244–245, 711–714) On desktop it breaks to two lines with an orphaned "·" before the Urdu. **Fix:** stack intentionally (English over Urdu, no dangling middot) or relayout `id-foot`. — DONE: restructured the badge with a `.fb-text` column — bold "Female-for-female" over the Urdu, middot removed, so it stacks intentionally and never orphans a "·".
- [x] **P2-7 · Tighten the 390px hero so Name+Phone reach the fold.** Trim one sub-line / reduce `.hero` top padding so the fields are visible without a full scroll on 390×844; ensure the sticky bar doesn't overlap a field. — DONE: removed the decorative standalone `.hero-urdu` tagline line, reduced `.hero` top padding 26→18px (bottom 40→30px) and hero-grid gap 28→22px. Sticky bar is handled by body `padding-bottom` so it never overlaps a field.

### Phase 3 — P3 (nice-to-have)

- [x] **P3-1 · Vary the checkmark monoculture.** Same green tick across receipt points (258), ID rows (236), chip `::before "✓"` (173). Vary one or two (receipt can lean on dotted leaders). — DONE: receipt-points now use a short teal dash marker (`.mk`) that echoes the receipt's dotted-leader language instead of a third check box. ID-row verification ticks and the chip "✓" kept (each is semantically a check).
- [x] **P3-2 · Accordions animate `max-height` (324, 355).** Switch to `grid-template-rows: 0fr→1fr` for smoother low-end-Android open. — DONE: both `.disc-body` and `.faq-a` switched to `grid-template-rows:0fr→1fr` (inner child gets `overflow:hidden;min-height:0`); JS now toggles `gridTemplateRows` instead of measuring `scrollHeight`/`maxHeight`.
- [x] **P3-3 · Delete dead testimonial CSS** (`.testi-grid`/`.t-card`/`.t-face`, 377–385) — no matching DOM. Remove (content gap is intentional per brief). — DONE: removed `.testi-grid/.t-card/.t-stars/.t-quote/.t-who/.t-face` (incl. the desktop `.testi-grid` rule); kept `.sample-line` (still used by the founder placeholder note).
- [x] **P3-4 · Tune heavy default shadows** (ID card `0 40px 80px -40px rgba(0,0,0,.7)` line 203; `--shadow` line 25) toward a tighter, brand-tinted shadow. — DONE: ID card → `0 26px 56px -34px rgba(10,46,43,.55)` (ink-tinted, tighter); `--shadow` → `0 18px 44px -24px rgba(10,46,43,.40)`.
- [x] **P3-5 · `white-space:nowrap` on the gold hero phrase (131)** risks overflow ≤340px — verify / allow wrap. — DONE: removed `white-space:nowrap` from `.hero h1 .hl` so the highlighted phrase can wrap below 340px without overflow.

### Phase 4 — Verify

- [x] Render 390px + desktop screenshots; confirm no regressions; confirm all hard constraints still pass (≥56px taps, ≥16px important text, fields reach fold at 390px). — DONE (via `phone-preview`, 393 + 360 + desktop). Hero highlight renders as a clean marker-band across the wrap; Name field reaches the fold at 393; receipt / services chips / verified ID card / founder / closer / footer all pass. One real regression caught and fixed below.

---

## Do NOT touch (audited strengths)

- The **price receipt** (scalloped ticket mask, dotted leaders, tabular-nums, "AFTER SHIFT" total) — the page's best idea.
- **WhatsApp deep-link service chips** with the Roman-Urdu prefill.
- **Sticky mobile bar** (Call / WhatsApp / Get-a-call, 56px, safe-area inset).
- **Heartbeat/pulse motif** (header mark, divider, `beat-dot` with `prefers-reduced-motion` guard).
- **Honesty labels** ("Sample photo", "Sample card", founder placeholder note).
- **High-contrast ink** `--ink-soft:#1B423D` — do not lighten.
- **Minimal form** (Name + Phone + optional tap chips) + privacy reassurance line.

> **Note:** Plus Jakarta Sans flags on generic slop detectors but is brand-LOCKED — identity preservation wins; not actionable.

---

## Visual polish pass — 2026-06-30 (via `phone-preview` skill, judged at 393 + 360 + desktop)

Three mobile-only visual defects caught by *looking at the render* (not code review), all fixed and re-verified:

- [x] **Gold hero highlight rendered as a stray dot on wrap.** Root cause: P3-5 removed `white-space:nowrap`, so the absolutely-positioned `.hl::after` detached when "Leave your number" broke across lines. **Fix:** replaced `::after` with a clipped `linear-gradient` background on `.hl` + `box-decoration-break:clone`, so the highlight follows every line fragment. Clean at 393, 360, desktop.
- [x] **Hero ate the whole fold** (form not visible at the conservative 720px fold). **Fix:** H1 `clamp(31→28px)` min + `line-height:1.06`; trimmed eyebrow/sub/trust top-margins + hero-grid gap. Name input now reaches the fold at 393px (and the ribbon+label at 360px).
- [x] **Trust pills orphaned a separator `·` at line-wrap.** **Fix:** removed the inline `.sep` spans; each non-first pill now carries a leading teal dot via `::before`, which travels with the pill and never orphans.

## Visual polish pass — 2026-06-30 (round 2, `phone-preview` at 393 + 360 + desktop)

## Feature additions — 2026-06-30 (parity with the live app landing page)

- [x] **Added a "How it works — three simple steps" section** (new `#how` block, inserted between Hero and Price Receipt). The live app has a 3-step process explainer that direction-6 lacked entirely, leaving the stressed first-timer's "what happens after I leave my number? am I committing?" unanswered. Steps: (1) Leave your number, or just call — 30 seconds, no long form; (2) A real person calls you back, matches a verified nurse/attendant, sends their card on WhatsApp before the visit; (3) Care arrives, you pay after. Numbered teal badges + `--paper` cards; 1-col on mobile, 3-col at ≥760px. Bilingual (data-en/data-ur toggle). Added `#how` to the footer "On this page" nav. Placed before the receipt so the narrative is: form → what happens next → honest price.
- [x] **Added the WhatsApp "on the way" status-update promise** (a North Star BUILD priority the app surfaces but direction-6 didn't). Rendered as a distinct WhatsApp-green chip inside step 3: "We message you on WhatsApp when your caregiver is on the way." Honest per the honesty rule — a manual WhatsApp update, no GPS/ETA claim. Bilingual.
- [x] **Bug caught during verify:** first render showed EN+UR text together in the steps. Root cause: my `.step … .urdu{display:block}` rules out-specified the global `[data-ur]{display:none}`, forcing Urdu visible in EN mode. Fixed by dropping `display`/margins from those rules (EN/UR spans are mutually exclusive via the toggle, so no stacking needed) — mirrors the working `.choice-note` approach. Re-verified: EN-only in English mode, Nastaliq-only in Urdu mode, mobile + desktop. Record shots: `6-combined-v5-how-{mobile,desktop,mobile-ur}.png`.

## Feature addition — 2026-06-30 (male/female caregivers, parity with the live app)

- [x] **Added a "Female or male nurses. You choose." trust note.** The live app surfaces both genders (hero chip "Female & male nurses", a Female/Male toggle in ServicesSection, TrustSignals "Female & male nurses — many families prefer a female caregiver for a female patient, just ask") but direction-6 only framed gender as *female-for-female*, implying female-only availability. **Fix:** added a bilingual `.choice-note` panel in the dark Verified section's `verified-head` (the "who comes into your home" context) — mint venus+mars icon, bold "Female or male nurses. You choose." + subline "Many families want a female nurse for a female patient. Just tell us when we call." The female-for-female badge stays on the sample card as complementary visual proof. Verified visually at 393 (EN), desktop 2-col (EN), and Urdu (Nastaliq RTL). Record shots: `6-combined-v4-choice-{mobile,desktop}.png`.

## Visual polish pass — 2026-06-30 (round 2, `phone-preview` at 393 + 360 + desktop)

- [x] **Collapsed FAQ + services disclosures leaked ~18px of hidden answer text.** Root cause (measured in Blink: collapsed `.faq-a` track resolved to **18px**, not 0): the `0fr→1fr` grid-collapse trick from P3-2 was applied to a grid item (`.faq-a-in` / `.disc-body-inner`) that **carried its own padding** (`padding:0 18px 18px`). A grid item's padding survives `min-height:0` + `overflow:hidden`, so the track's auto-minimum stayed at the padding height and the first line of every collapsed answer peeked out under the "+" (clipped by the card's rounded corner). **Fix:** moved padding (and the services `border-top`) off the collapsing grid item onto a new inner `.faq-a-pad` / `.disc-body-pad` wrapper — the canonical 3-level `0fr` pattern. Collapsed height now measures **0** for both; open state is pixel-identical to before. Page is ~500px shorter with the 9 phantom slivers gone. Verified visually: closed cards show only the question (EN + Urdu).

