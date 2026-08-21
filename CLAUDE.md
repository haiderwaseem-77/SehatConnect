# Sehat Connect — CLAUDE.md

**Two documents run this repo:**

1. **`NORTH-STAR.md` (repo root) — the product source of truth.** Mission, users, the five fears, page-by-page specs, copy voice, the exact promises, SEO plan, roadmap, Definition of Done. **Read it before changing anything customer-facing.** It carries no open questions — its Decision Ledger records every finalized business decision (dated).
2. **This file — the operational guide:** codebase facts, commands, deployment, and the hard rules that must hold in every session.

If they ever disagree, `NORTH-STAR.md` wins; fix this file.

---

## Mission (NORTH-STAR §1)

One job: a worried family member in Lahore leaves their name + phone (or calls / WhatsApps) so a real person can call back and arrange care. This is a lead-generation + trust site — NOT a booking app, NOT a marketplace. Test for every change: *"does this make a nervous 40–65-year-old family member trust us more, or just look impressive?"*

## Hard rules (full versions: NORTH-STAR §4 laws + §14 DoD)

- **Mobile is the site.** Users are on mid-range Androids on patchy data. Design/verify at 390px first; desktop is the enhancement. Keep `pb-20 md:pb-0` (or equivalent) so the sticky bar never hides content.
- Body ≥18px, nothing important <16px, tap targets ≥56px, high-contrast dark-teal on cream — never faint grey. Actions are real buttons/links (min-height ≥44px), never inline text.
- **One page, one action:** everything funnels to call / WhatsApp / "we'll call you". No accounts, browsing, calendars, or marketplace patterns — ever.
- Form = Name + Phone required; anything else optional and tap-not-type.
- **Never claim a clinical outcome.** Describe what a caregiver *does*, never what the patient's body will do as a result. "Turning and repositioning to **reduce the risk of** bed sores" — never "so bed sores do not start". Pressure sores depend on nutrition, circulation, moisture and illness; repositioning lowers risk, it does not guarantee prevention. The same holds for recovery, healing, mobility and comfort: no timelines, no guarantees, no outcome promises. This is a health (YMYL) site — Google holds it to a higher bar, and a family who was promised prevention has a real grievance if it happens anyway.
- **Honesty rule:** never promise what ops doesn't deliver. Placeholders carry honesty labels. Every claim needs an artifact, a checkable number, or a named human (the "show the artifact" law, NORTH-STAR §3).
- **The promises — use these exact phrasings, never improvise stronger ones (NORTH-STAR §3):**
  - Callback: "We call back fast — **usually within 15 minutes**." (the word *usually* is mandatory)
  - Start: "Care can start **within 24 hours** of your call."
  - Trial: "Your first day is free — no cost, no obligation. Continue only if you're happy." (short form: "First day free"; adopted 2026-07-02)
  - Replacement: "Not comfortable? Tell us — **we replace the caregiver, free**, until you're fully satisfied." (upgraded 2026-07-02 — supersedes the old "after the first shift" phrasing)
  - Verification: "**CNIC checked, references called, police-verified**" — always all three.
  - Payment: "**No advance. Pay after the shift.**"
- Bilingual: every new user-facing string gets an Urdu counterpart (Noto Nastaliq Urdu font); load-bearing reassurances appear bilingually *inline*, not only behind the toggle (NORTH-STAR §5).
- Calm, not loud: no popups, chat widgets, countdown timers, stock photos, fake urgency, emoji in page copy.

## Business facts (finalized — NORTH-STAR Decision Ledger)

- Brand: **Sehat Connect** · tagline *"bringing the hospital to your home"* · Lahore · 24/7
- Founder: **Sardar Waseem Ilyas** (publicly named; photo pending — the only pending asset)
- Office: **4th Floor, 26-T, Commercial Area, DHA Phase 8, Lahore, Pakistan** (goes in footer, /about, GBP, JSON-LD) — updated 2026-08-21; the old Phase 6 address is dead and must appear nowhere. **No postal code anywhere**: the old code belonged to Phase 6 and is wrong for Phase 8; the correct one is pending confirmation from the Google Business Profile, and a wrong code hurts NAP consistency more than a missing one.
- Email (to set up at the registrar/mail host): **care@mysehatconnect.com**
- Phone display: `0328-8489988` · tel: `+923288489988` · WhatsApp: `923288489988`
- Prices (internal only as of 2026-07-02 — partner decision, explicitly reversible; see NORTH-STAR Decision Ledger #9): Qualified Nurse **Rs 4,000** / Attendant **Rs 3,000** per 12-hr shift · never public — quoted to the family on the first call, before care starts · pay after, no advance · first day free · `PRICES` constant stays in `lib/constants.ts`, marked do-not-render
- Verification (all true today): CNIC + references + police verification, every caregiver
- **Care formats** (confirmed 2026-08-21 — `CARE_FORMATS` in `lib/constants.ts`): a nurse can come for a **short single visit** (injection / drip / dressing) *or* a 12-hour day or night shift. Round-the-clock = **two caregivers, two shifts** — never one person for 24 hours; say this plainly. `SHIFTS` still drives the booking form.
- **Physiotherapy — do not overpromise** (2026-08-21): listed as a service but **not confirmed in-house**; early on it may be a contractor. Never claim we employ or provide a physiotherapist, and never promise rehabilitation, therapy or a recovery programme. The home-page line "Movement, mobility and recovery support at home" is the **ceiling**. Helping someone move/walk/reposition is ordinary caregiving — describe it that way.
- **ICU = step-down only** (2026-08-21): care after coming home from ICU/HDU, yes. **Ventilator or tracheostomy care, no** — never imply it.
- **Domain: `https://mysehatconnect.com` is the final and only host** (decided 2026-08-21) — non-www apex; `www` 301s to it. There is no interim domain, no cutover, and no second host to flip to: `SITE_URL` in `lib/constants.ts` is `https://mysehatconnect.com` and stays that way.

## Stack & Commands

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (tokens in `app/globals.css @theme`) + the ported direction-6 stylesheet · Supabase (lead capture) · Vercel (deploy)

```
npm run dev    # local dev
npm run build  # production build
npm run lint   # linting
```

## Deployment

- Live at **https://mysehatconnect.com** — the final and only host (non-www apex; `www` 301s to it). Vercel project `lucaintel` on account **`lucaagent000`**: the project slug is a legacy name from before the brand domain was settled and says nothing about the site's URL. Renaming it is a separate owner action.
- **Full deploy + access recipe: `DEPLOY-ACCESS.md`** (repo root, **gitignored / local-only — never commit**). It covers the DNS/domain attachment steps.
- **Two hard-won gotchas — do NOT undo:**
  1. `vercel.json` must keep `"framework": "nextjs"` — the Vercel preset is `null`; without the override every route 404s despite a green build.
  2. Vercel **Deployment Protection must stay OFF** — otherwise a login wall blocks the public site.
- Deploy from a **real terminal**: `npx vercel deploy --prod` (the `!` prefix didn't survive long deploys).
- Env vars needed on Vercel: `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (**still unset — leads now survive via ntfy, but nothing is persisted until these are set**), server-only `NTFY_TOPIC` (unguessable secret; never `NEXT_PUBLIC_`), optional `NTFY_TOKEN`, optional `NEXT_PUBLIC_GA4_ID`. See `.env.example`.

## Project Structure (direction-6, routes consolidated 2026-07-01)

| Path | What it is |
|---|---|
| `app/page.tsx` | Home — "the machine" (~95% of the work): Hero+form → How it works → How payment works (payment-terms receipt) → Services → Verified card → FAQ → Founder → Final CTA |
| `app/book/` + `app/book/confirm/` | Lead-form page (`LeadFormD6`) · post-submit confirmation (noindex) |
| `app/services/` + `qualified-nurse/` + `attendant/` | SEO satellite pages (shared `components/services/ServiceDetailPage.tsx`, Service JSON-LD) |
| `app/cities/` + `app/cities/[city]/` | Lahore live (LocalBusiness schema); other cities `noindex` "coming soon" — index a city only when actually launched |
| `app/about/` | Founder story / E-E-A-T page |
| `app/api/book/` | Lead capture — Supabase insert **and** ntfy notification as two independent delivery channels. Succeeds if either delivered; see the never-lose-a-lead rule below |
| `app/api/keepalive/` | Pings Supabase every 5 days (prevents free-tier pause) |
| `app/direction6.css` | The ported mockup CSS, scoped under a `.d6` wrapper (applied by `LandingRoot`) |
| `components/home/` | `LandingRoot`, `Hero`, `HowItWorks`, `PriceReceipt`, `ServicesSection`, `VerifiedCard`, `HomeFAQ`, `FounderNote`, `CtaBanner`, `LeadFormD6`, `Testimonials` (empty stub — mounts only when real testimonials exist, NORTH-STAR §7.6) |
| `components/layout/`, `components/ui/` | `Navbar`, `Footer` · `StickyActionBar` (mobile Call / WhatsApp / Get-a-call — the most important 76px on the site) |
| `components/i18n/LanguageProvider.tsx` | EN/اردو context, available site-wide via `LandingRoot` |
| `lib/constants.ts` | **Content source of truth**: `SITE_URL`, prices, services (+ Urdu labels), FAQ items, phone/WhatsApp constants |
| `lib/wa.ts` | WhatsApp deep-link prefills (warm Roman Urdu) |
| `lib/schema.ts` | Shared JSON-LD: `OPENING_HOURS`, `businessSameAs()`, `breadcrumbList()`. **Build every structured-data block from these** so the business identity is byte-identical site-wide |
| `lib/analytics.ts` + `components/analytics/` | GA4. Completely inert unless `NEXT_PUBLIC_GA4_ID` is set. One delegated document click listener captures every `tel:` and `wa.me` tap — do NOT add per-link handlers |
| `docs/seo-tracker.html` | The SEO plan and progress tracker (self-contained, opens in a browser; state in localStorage) |
| `next.config.ts` | Permanent redirects: `/faq`→`/`, `/contact`→`/`, `/nurses*`→`/services`, `/login`+`/dashboard`→`/` — keep them |
| `design/` | **Locked brand assets only**: `Sehat Connect Logo.jpg` + `Sehat Connect Visiting Card Standalone.html` |
| `design-explorations-v2/` | Historical: the direction-6 mockup (visual reference) + `AUDIT-direction-6.md` (its polish changelog) |

## Conventions & Gotchas

- **Never lose a lead.** `app/api/book` treats the Supabase write and the ntfy notification as independent channels and returns success if *either* delivered — a family who typed their name and number must reach a human even when the database is down. Don't "simplify" this back into a single try/catch that 500s.
- **Analytics must never gate or break a lead action**, and never fires on submit *intent* — only once the server confirms it has the lead.
- Contact values **always** from `lib/constants.ts` (`CONTACT_PHONE_DISPLAY`, `CONTACT_PHONE_TEL`, `WHATSAPP_NUMBER`) — a hardcoded wrong WhatsApp number was a real bug.
- Copy and Urdu strings live in `lib/constants.ts` where practical; promise phrasings come verbatim from NORTH-STAR §3.
- Judge UI changes **visually** with the `phone-preview` skill (renders real Android sizes with fonts painted) — code-correct is not done; looked-at is done.
- Old routes must keep their 301s; never resurrect `/faq`, `/contact`, `/nurses`, `/login`, `/dashboard`.

## Current state vs the plan (as of 2026-07-02)

**Done:** direction-6 design live site-wide; routes consolidated (FAQ/contact merged into home with FAQPage + ContactPoint schema); non-live cities noindexed; ntfy topic server-only via env; debug endpoint removed; "0 advance" → "No advance"; prices hidden from all public surfaces (price now quoted on the first call); first-day-free trial promise and the upgraded (until-satisfied) replacement promise shipped (2026-07-02).

**Not done — NORTH-STAR §13 is the work queue (don't jump ahead of it):**
- Supabase env vars on Vercel → lead form currently 500s on submit
- DNS: point `mysehatconnect.com` (+ the `www` → apex 301) at the Vercel project, and set up care@mysehatconnect.com (steps in `DEPLOY-ACCESS.md`) — the code side is already on the final domain
- Hero H1 doesn't yet name the noun + city; form promise line still says "usually the same day" (→ "usually within 15 minutes")
- Home page diet: ~35 phone-screens → ≤20 (§6)
- Trust assets pending: founder photo, real caregiver card, caregiver portraits, first testimonials, Google Business Profile
- Urdu toggle only partially honest (ServicesSection + LeadFormD6 + inline accents; full coverage = roadmap item 11)

~~New promise copy: 24-hour start FAQ, replacement FAQ, living-abroad FAQ~~ / ~~Footer office address + email~~ — already done (confirmed in `app/page.tsx` `homeFaq` and `components/layout/Footer.tsx` as of 2026-07-02); this list was stale on those two items.
