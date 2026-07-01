# Sehat Connect — CLAUDE.md

**Read this before touching any code.** It keeps every session aligned to the product vision and the Definition of Done. Two-minute read.

---

## Mission

**One job: get a worried family member to leave their name + phone (or call/WhatsApp) so a real person can call back and arrange care.**

This is a lead-generation + trust-building site — NOT a booking app, NOT a marketplace.
Success = more qualified callbacks requested + families trusting us enough to let our caregiver into their home.

---

## Who We Design For

Picture this person on every change:

- 40–65 years old, Lahore. Arranging care for an elderly parent, post-op recovery, new mother & baby, bedridden/long-term, dementia, or palliative patient.
- Not tech-savvy. Mobile-first, Android, ageing eyesight. WhatsApp-native. Prefers calling. Allergic to long forms, dropdowns, passwords, sign-up.
- **Stressed and anxious.** Five fears to defuse: (1) is this a scam? (2) will a safe, verified, decent person — often female — come to my home? (3) can they do the medical task? (4) what will it cost? (5) can I just talk to a human?

---

## Core Principle

> The customer is buying a trustworthy **human**, not software.

- Spend tech on making our humans reliable & verifiable.
- Stay cheap on tech that tries to replace the human contact customers want.
- Customer-facing = WhatsApp + phone call + dead-simple website.
- Fancy things live in internal staff tools.
- **Test for any feature:** "Does this make a nervous family trust us more, or just look impressive?"

---

## Design & Experience Rules

- **Mobile first, desktop good:** The primary user is on an Android phone. Every UI change must look and work correctly on a 390px viewport before touching desktop. Desktop (md:) is a progressive enhancement — it should look polished, but mobile is never sacrificed for it.
  - Add `pb-20 md:pb-0` to page body/layout so the sticky action bar never hides content.
  - Do not use 2-column grids on mobile for content cards — use `grid-cols-1 sm:grid-cols-2 md:grid-cols-3` minimum.
  - Long lists of cards on mobile must paginate or collapse behind a "Show more" button (max ~4 visible by default).
- **Big & readable:** 18px body, nothing important under 16px, high-contrast dark text (no faint grey), tap targets ≥ 56px. CTAs must be real buttons/links with min-height ≥ 44px — never styled as inline text.
- **One page, one action:** home page does ~95% of the work; everything funnels to "we'll call you." No browsing, no accounts, no booking calendar.
- **Call + WhatsApp are co-stars:** reachable everywhere (header button + sticky mobile bar). Pre-fill a friendly Roman-Urdu WhatsApp message.
- **Form asks for almost nothing:** Name + Phone required; "who needs care?" optional, tap-not-type chips; area asked on the call.
- **Bilingual:** English default + اردو toggle; Urdu strings live in `lib/constants.ts`; render with Noto Nastaliq Urdu font.
- **Prove trust, don't claim it:** open price, "pay after, no advance," founder face/note, real testimonials (name + area), female-for-female, "CNIC & references checked." Real photos > icons.
- **Warm, calm, clean medical feel:** teal palette, plain short sentences. Mobile-first, fast on mid/low-end Android with patchy data.

---

## Build vs Skip

| Idea | Verdict | Why |
|---|---|---|
| Pre-visit caregiver profile on WhatsApp (name + photo + verified badges + experience + ETA) | **BUILD** (top priority) | Answers "who's coming into my home"; just a message template |
| Status updates (confirmed → assigned → on the way/ETA → arrived → done → feedback) | **BUILD** (light) | WhatsApp-first; SMS as fallback for confirmation + ETA only |
| Same-caregiver continuity | **BUILD** (no customer tech) | Tracked internally, requested on WhatsApp; key for retention |
| Female-for-female matching | **BUILD** (no customer tech) | Real differentiator |
| Internal ops tool (lead inbox, caregiver roster/availability, verification records, shift logs, message templates) | **BUILD** (the real backbone) | Where dev resources pay off; the only "dashboard" worth building is for **staff** |
| Real-time GPS tracking | **SKIP** | High cost, marginal value for a 12-hr shift, privacy/labour friction, breaks visibly; verified profile + ETA + callable human is cheaper trust |
| Customer dashboard / login | **SKIP** | They won't self-serve; the WhatsApp thread is their dashboard |
| Browse-nurses / public nurse profiles | **SKIP** | Marketplace model → inventory + choice paralysis; "we match you" is better |
| Public ratings/reviews platform | **SKIP** | Curated real testimonials + private post-shift feedback instead |
| Online payment (Easypaisa/JazzCash) | **OPTIONAL/LATER** | Cash-after is a trust feature; offer e-wallet as convenience, never require upfront |

---

## Honesty Rule

Never promise on the site what we don't deliver: no GPS-tracking claims, no live "Available" roster, no dashboard promises, no response times we can't always hit. Reframe as "updates by WhatsApp/SMS" + "a real person, one call away." Any stated callback time must be hit every time — pick a safe number.

---

## Definition of Done

A customer-facing change is only "done" if ALL of the following pass:

1. Primary action is still "we'll call you" (or call/WhatsApp) — no browsing, accounts, or self-service booking introduced.
2. Form stays minimal: Name + Phone required; anything else optional and tap-not-type.
3. Call + WhatsApp reachable from anywhere (header + sticky bar); numbers come from `lib/constants.ts`, never hardcoded.
4. Text ≥ 16px (body 18px), high-contrast; tap targets ≥ 48–56px; readable by a 60-year-old at arm's length.
5. Works well and fast on a mid-range Android in portrait on slow data.
6. Bilingual-ready: every new user-facing string has an Urdu counterpart in the Urdu font.
7. No false promises (no GPS, live roster, dashboard, or unguaranteed response times).
8. Trust shown with specifics (price, pay-after, real people), not just icon claims.
9. Plain, warm language — short sentences a stressed non-native-English reader understands instantly.
10. Reuses existing constants/components; does not reintroduce the marketplace/account model.

---

## Codebase Facts

### Brand & Contact

- Brand: **Sehat Connect** — domain `mysehatconnect.com` (repo folder `sehatghar-pk` is legacy, ignore it)
- City: Lahore. Hours: 24/7.
- Phone display: `0328-8489988` | tel href: `+923288489988` | WhatsApp: `923288489988`
- Prices: Qualified Nurse Rs 4,000 / 12-hr shift; Attendant Rs 3,000 / 12-hr shift

### Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (tokens in `app/globals.css` under `@theme`) · Supabase (lead capture) · Vercel (deploy)

### Deployment

- **Live customer site: https://lucaintel.com** — Vercel project `lucaintel`, under the **`lucaagent000`** Vercel account (live since 2026-06-27, replacing an old static "Caretakers" site). The repo's metadata still references `mysehatconnect.com`; `lucaintel.com` is the actual live deployment.
- **Full deploy + access recipe is in `DEPLOY-ACCESS.md`** (repo root, **gitignored / local-only — never committed**). Read it before deploying: it has the account email, login steps, DNS, and the gotchas below.
- **Two non-obvious gotchas — do NOT undo (they cost a long debug):**
  1. `vercel.json` must keep `"framework": "nextjs"`. The Vercel project preset is `null` (legacy static site) → without this override, **every route 404s despite a green build**.
  2. Vercel **Deployment Protection must stay OFF** — otherwise a login wall sits in front of the public site.
- Deploy with `npx vercel deploy --prod` from a **real terminal** (the Claude `!` prefix didn't run the long deploy). Lead form needs `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` set on the project (still TODO). Also set the **server-only** `NTFY_TOPIC` (an unguessable secret topic name — never `NEXT_PUBLIC_`, never a guessable value) and the optional `NTFY_TOKEN` (Bearer token for reserved/authenticated topics) on Vercel; the ops phone must subscribe to that new private topic to receive lead notifications. See `.env.example` for the full list.

### Commands

```
npm run dev    # local dev
npm run build  # production build
npm run lint   # linting
```

### Project Structure

| Path | What it is |
|---|---|
| `app/page.tsx` | Home page (does ~95% of the work) |
| `app/book/page.tsx` | Lead form page — renders `components/LeadForm.tsx` |
| `app/book/confirm/page.tsx` | Post-submit confirmation |
| `app/services/`, `app/about/`, `app/faq/`, `app/contact/`, `app/cities/` | Supporting routes (no `app/nurses` — browse-nurses was removed) |
| `app/api/book/route.ts` | Lead capture — Supabase insert + ntfy notification |
| `app/api/keepalive/` | Pings Supabase every 5 days to prevent free-tier pause |
| `components/LeadForm.tsx` | The actual lead form (Name + Phone required, optional care-type chips) |
| `components/home/` | Hero, HowItWorks, ServicesSection, TrustSignals, CtaBanner, HomeFAQ, Testimonials (stub) |
| `components/layout/` | Navbar, Footer |
| `components/ui/` | WhatsAppButton (floating), StickyActionBar (mobile call/WhatsApp/get-a-call bar) |
| `components/i18n/` | `LanguageProvider` — EN/اردو context (currently only ServicesSection consumes it) |
| `lib/constants.ts` | **Content source of truth** — prices, service lists (with Urdu labels), FAQ items, phone/WhatsApp constants |
| `lib/supabase.ts`, `types/index.ts` | Data/type utilities (no `lib/mockData.ts` — removed) |
| `design/north-star.html` | **Strategy/vision reference** (the written North Star + Definition of Done) — consult before changing customer-facing UI. The only locked-in visual assets are `design/Sehat Connect Logo.jpg` and `design/Sehat Connect Visiting Card Standalone.html`. |

### Conventions & Gotchas

- **Always** use `CONTACT_PHONE_DISPLAY`, `CONTACT_PHONE_TEL`, `WHATSAPP_NUMBER` from `lib/constants.ts` — a hardcoded wrong WhatsApp number was a real bug.
- All content/copy and Urdu strings belong in `lib/constants.ts` where practical.
- Components currently use heavy inline styles; design tokens exist in `app/globals.css @theme` — prefer the tokens already defined.
- Consult `design/north-star.html` before modifying the customer-facing UI.

### Known Issues / Reality vs. Vision (current state — not yet matching the DoD)

- **Bilingual is NOT actually wired up.** The DoD/design rules require every user-facing string to have an Urdu counterpart, but today only `ServicesSection` consumes `LanguageProvider`; the اردو toggle changes almost nothing elsewhere. Only the service arrays in `lib/constants.ts` carry Urdu — FAQ, form, confirm, and all other copy are English-only. Treat full bilingual as a TARGET, not a done feature.
- **Lead PII + ntfy:** RESOLVED — the ntfy topic is now read from the server-only `NTFY_TOPIC` env var via `lib/notify.ts` (no hardcoded/guessable topic in source). Set an unguessable secret topic (and optional `NTFY_TOKEN`) on Vercel; if `NTFY_TOPIC` is unset, notifications no-op but the lead still saves.
- **`app/api/test-ntfy/`:** RESOLVED — the unauthenticated debug endpoint has been removed.
- **Supabase env vars** (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) still need to be set on Vercel or the lead form will fail.
- **Stale canonical domain:** page metadata/canonicals point at `mysehatconnect.com`, but the live site is `lucaintel.com`.
- **Missing trust elements** the North Star calls for: real testimonials (`Testimonials.tsx` is an empty stub, not mounted), founder face/note, real photos (UI is icon-only), and the #1 BUILD priority — the pre-visit WhatsApp caregiver profile.

### Planned Next Steps (do not implement unless asked)

- Wire `LanguageProvider` through all components and add Urdu strings to `lib/constants.ts` so the اردو toggle is honest.
- Add real trust content: testimonials, founder note/photo, caregiver photos; surface female-for-female matching.
- Readability pass: bump sub-16px text and faint-grey copy (esp. confirm page + secondary routes) to meet the DoD.
- Wire or remove the dead contact form on `app/contact/page.tsx`; persist `careType` in the Supabase insert.
