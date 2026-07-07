# Sehat Connect — North Star (v2)

**This is the source of truth.** It supersedes `design/north-star.html` and any strategy text in other documents. When another doc disagrees with this one, this one wins. Written 2026-07-01; all operational decisions finalized with the founder the same day — **this document carries no open questions** (see the Decision Ledger at the end).

**Locked assets (the only things not up for debate):** the logo (`design/Sehat Connect Logo.jpg`), the printed visiting cards (`design/Sehat Connect Visiting Card Standalone.html`), the brand name *Sehat Connect*, the tagline *"bringing the hospital to your home"*, and the phone number `0328-8489988`. Everything else — layout, copy, pages, features — serves the mission below and changes whenever it serves it better.

---

## 1. The Mission

> **One job: a worried family member in Lahore leaves their name and phone number (or calls / WhatsApps us) so a real person can call back and arrange care.**

That's it. The website is not a booking app, not a marketplace, not a brochure. It is a **trust machine with one lever**. Every pixel either (a) makes a nervous family trust us more, or (b) makes it easier to reach a human. Anything that does neither gets cut.

**The origin story is the strategy.** When the founder's grandmother was ill, the family hired home help and it was a bad experience: strangers of unknown background, unclear skills, unclear prices, nobody accountable. Sehat Connect exists so other families don't go through that. The website's whole personality is *"we are the family that has been in your shoes, and here is proof you can check."*

**What "success" means, in order:**
1. Qualified callback requests per week (form submits + calls + WhatsApp conversations started).
2. Families who let our caregiver into their home (leads that convert on the phone).
3. Families who ask for the *same* caregiver again (trust earned).

### The market reality this doc is built on (researched 2026-07)

- The Lahore home-nursing market is **fragmented** — 15+ providers, no dominant brand. The polished ones (ConsidraCare, Shine Care) show prices; several who claim "transparent" hide them.
- **Every competitor *claims* verification. Almost none *show* it** — no ID cards, no verification dates, no artifacts. Claiming is table stakes; showing is the win.
- **Google Business Profile and reviews are wide open.** Even the best-funded competitor has an unrated Facebook page and near-zero review volume. The local pack for "nurse near me" is winnable without out-designing anyone.
- **Nobody writes for how families actually talk.** Searches like *"ghar par nurse"*, *"attendant chahiye Lahore"*, *"bemar ke liye attendant"* have almost no competitor targeting them. Urdu on competitor sites is a token tagline at best.
- Families' documented fears in Pakistan: domestic-staff abuse/theft stories in the press, agencies that take money and vanish, untrained staff, neglect of bedridden patients. **CNIC + police verification is an *expected vocabulary* here** (NADRA/Tasdeeq exist for exactly this).
- Named, specific testimonials are the single most-used trust device in the category — and one competitor even shows a *mixed* review, which reads as more honest, not less.

**Our position:** the fair-priced, family-run service that *shows* everything the others only *claim* — payment terms up front (exact price given on the first call, before care starts), the person, the verification, the founder's face. Never "the cheapest" (families fear rock-bottom agencies); always "nothing hidden."

---

## 2. Who We Serve

### Primary: "The Arranger" — design every screen for this person

- 40–65, in Lahore. Son or daughter arranging care for an elderly parent; or a husband arranging post-op care; or a family arranging mother-&-baby help.
- Android phone, mid-range, patchy data. **Mobile is the site** — assume they will never see the desktop version.
- WhatsApp-native. Prefers calling. Reads English but *feels* in Urdu; over ~55 they read Nastaliq more comfortably than English.
- Ageing eyesight. Arm's-length reading. Allergic to forms, dropdowns, passwords, sign-ups, popups.
- **Stressed and skeptical.** They arrive worried, often at a bad moment (a discharge from hospital, a fall, a diagnosis). The page's first job is to lower their heart rate.

### Secondary: "The Overseas Child"

- Pakistani in the US/UK/Gulf arranging care for parents in Lahore. Searches in English, at odd hours, on a good phone. Higher willingness to pay; *very* high scam-alertness because they can't visit to check.
- Their questions: can I arrange this from abroad? Who exactly comes to the house? How do I stay in the loop? (Answer: yes, over WhatsApp; the caregiver card; WhatsApp updates.)
- Worth one small dedicated section + one FAQ. They convert through the same funnel (WhatsApp especially).

### The invisible decision-maker: the family WhatsApp group

The decision is almost never made by one person on one page. The Arranger screenshots or forwards things to siblings ("is this legit? which one should we pick?"). Therefore:

> **Everything important must be forwardable.** The payment-terms receipt, the caregiver card, the phone number — designed so a screenshot of it, alone, out of context, still builds trust and carries our name + number.

### The patient (60–85)

Rarely the buyer, sometimes the vetoer. The Urdu on the page and the female-for-female promise is partly *for them* — the Arranger will show them the phone: "دیکھیں، یہ لوگ ٹھیک لگتے ہیں۔"

---

## 3. The Five Fears → The Five Proofs

The page is not organized around our services. It is organized around **their fears**, in the order they occur. Every fear gets a *proof artifact* — a thing on screen you could screenshot — not an adjective.

| # | Fear (their words) | Our answer | Proof artifact on the site | Status |
|---|---|---|---|---|
| 1 | "Is this a scam?" | Payment terms shown first — exact price on the first call, pay **after** the shift, zero advance, first day free — a real founder with a face and a story | The **payment-terms card** · founder note with real photo · Google reviews (once GBP live) | Card ✅ · founder photo ❌ · GBP ❌ |
| 2 | "Who will walk into my home?" | You meet them before they arrive; CNIC, references and police verification checked; female caregiver on request | The **caregiver card** (photo, name, PNC #, verification date) sent on WhatsApp before the shift — shown as a real sample on the site | Sample card ✅ but placeholder photo ❌ |
| 3 | "Can they actually do the medical task?" | Qualified Nurses are PNC-registered (checkable); attendants are for non-clinical care and we say so plainly | PNC registration number **on the card** · plain nurse-vs-attendant explainer | ✅ copy exists; card needs real PNC # |
| 4 | "What will it cost me?" | We tell you the exact price on the first call — before care starts. No fine print, no surprises. Your first day is free — no cost, no obligation | The "How payment works" card — itemized terms (no amounts shown), with "You pay: AFTER SHIFT" | ✅ |
| 5 | "Can I just talk to a human?" | Yes — call or WhatsApp right now, or leave a number and a real person calls back | **Visible phone number as text**, sticky Call/WhatsApp bar, callback promise we always hit | Sticky bar ✅ · number-as-text in hero ❌ |

**The "show the artifact" law:** any claim on the site must be backed by a visible artifact, a checkable number, or a named human — or it must carry an honesty label ("Sample photo — your nurse's real card is sent before the visit") until the real thing exists. No unverifiable superlatives, ever ("best", "top", "trusted by thousands").

### The promises (finalized 2026-07-01 — print these, and only these)

| Promise | Exact site phrasing | Rule |
|---|---|---|
| Callback | "We call back fast — **usually within 15 minutes**." | The word *usually* stays — never print a bare "15 minutes" until ops data proves it's always true (§12) |
| Start | "Care can start **within 24 hours** of your call." | |
| Trial | "Your first day is free — no cost, no obligation. Continue only if you're happy." | Canonical trial promise (adopted 2026-07-02); short form "First day free" |
| Replacement | "Not comfortable? Tell us — **we replace the caregiver, free**, until you're fully satisfied." | Upgraded 2026-07-02 — supersedes the original "after the first shift" phrasing; combined with pay-after, a family is never stuck |
| Verification | "Every caregiver: **CNIC checked, references called, police-verified** — before they enter your home." | All three are true today; always name all three |
| Payment | "**No advance. Pay after the shift.**" | Already law; price itself is quoted on the first call, not published on the site (2026-07-02) |

---

## 4. Design Laws

These are inherited from what already works, hardened into law:

1. **Mobile is the site.** Design, write, and verify at 390px first. Desktop is a nice arrangement of the same content, never the driver. Any change is judged on a phone screenshot before it ships.
2. **One page, one action.** The home page does ~95% of the work. Everything funnels to *leave your number / call / WhatsApp*. No browsing, no accounts, no calendars, no choice paralysis.
3. **The 58-year-old test.** Hand the phone to someone 55+, unprompted. Within **10 seconds** they can say what we do; within **30 seconds** they understand how payment works; within **60 seconds** they could request a call — without help. This is the acceptance test for every redesign.
4. **Readable at arm's length.** Body ≥18px, nothing that matters <16px, tap targets ≥56px, dark-teal ink on cream — never faint grey. Real buttons, never inline-text links for actions.
5. **Calm, not loud.** No popups, no countdown timers, no discount banners, no chat widgets, no autoplay, no fake urgency ("only 2 nurses left!"). The visual temperature of the page should *lower* anxiety. Whitespace is a trust signal.
6. **The honesty rule.** Never promise what we don't deliver: no GPS claims, no live "available now" roster, no response times we can't always hit. Placeholder content is labeled as such. A promise we can only *usually* keep is phrased as "usually."
7. **Warm brand, locked palette.** Cream `#FBF8F2`, teal `#0D7A6E`, dark teal `#0A2E2B`, gold accent `#C9A24B` (sparingly). Plus Jakarta Sans for UI, Noto Nastaliq Urdu for Urdu — always. The heartbeat/pulse line is the brand motif.
8. **Fast on patchy data.** Budgets in §10. A page that loads slowly *is* a trust failure for this audience.
9. **Real photos beat icons; no photos beat stock photos.** A stock-photo "nurse" is a lie the audience can smell. Until real photos exist, calm labeled placeholders are the honest state.

---

## 5. Language Strategy (English · اردو · Roman Urdu)

Three registers, each with a job:

| Register | Job | Where |
|---|---|---|
| **English** | Professional competence; the default reading language of the 40–55 Arranger; all SEO head terms | Primary page copy |
| **Nastaliq Urdu (اردو)** | Warmth, authenticity, and comprehension for 55+ and for the patient | Inline accents on the *load-bearing* reassurances + the full toggle |
| **Roman Urdu** | How people actually talk on WhatsApp | WhatsApp pre-filled messages, and select on-page phrases |

Rules:

1. **Don't hide the Urdu behind the toggle.** The most load-bearing reassurances appear bilingually *inline*, visible in English mode: service chips (already done), FAQ questions (already done), the hero's one warm line, the "we speak Urdu" chip (make it «ہم اردو بولتے ہیں — We speak Urdu»). A 58-year-old who never finds the toggle still gets the message: *these people speak my language*.
2. **The اردو toggle must become honest.** Today it translates fragments. Target: the *entire* customer-visible page translates — every heading, button, form label, FAQ answer, footer line. Until that's true, the toggle over-promises. This is a top-3 build priority. All strings live in `lib/constants.ts` with `en`/`ur` pairs.
3. **Roman Urdu is a feature, not slang.** The WhatsApp prefill stays warm Roman Urdu ("Assalam o Alaikum, mujhe ghar ke liye nurse/attendant chahiye…"). On-page, use the phrases families actually search — *ghar par nurse*, *attendant chahiye* — naturally inside FAQ answers and the services section (this is also the SEO gap competitors ignore, §9).
4. **Voice & tone** (English and Urdu alike):
   - Short sentences. One idea each. A stressed non-native reader understands instantly.
   - Say "you" and "we." We are people, not a platform. ("We'll call, listen, and arrange…" ✅)
   - Concrete facts over adjectives: "exact price on the first call, no advance, pay after the shift" beats "affordable and transparent."
   - Never medical jargon without a plain gloss (ICU step-down → "care after coming home from the ICU").
   - No exclamation marks. No ALL-CAPS urgency. No emoji in page copy (fine in WhatsApp).
   - Name the fear plainly, then answer it. "How do I know this isn't a scam?" is our best headline pattern — keep that courage.

---

## 6. Site Architecture: one machine + thin satellites

**The model:** one conversion page (home) that does ~95% of the work, plus a small ring of satellite pages that exist for SEO landings and deeper reassurance — and every satellite is itself a *mini conversion page* (what + where + payment terms + form/CTA), never a dead-end brochure page. No page exists that a worried human could land on and feel abandoned.

| Page | Job | Notes |
|---|---|---|
| `/` | **The machine.** Full fear-to-relief narrative + form ×2 | Spec in §7 |
| `/book` | Form-only page for ads/direct links; mirrors hero form | Keep minimal |
| `/book/confirm` | The emotional peak — see spec below | Currently under-loved |
| `/services/qualified-nurse` | SEO landing: "home nursing services Lahore" etc. + deep detail (all 9 services explained) | Mini conversion page |
| `/services/attendant` | SEO landing: "patient attendant Lahore", *attendant chahiye* | Mini conversion page |
| `/services` | Thin index → routes to the two above | Or redirect to `/#services` |
| `/cities/lahore` | "Areas we serve in Lahore" — DHA, Gulberg, Johar Town, Model Town, Bahria Town, Cantt… with honest coverage detail | The only *indexed* city page (non-live cities are already `noindex` "coming soon" — correct; keep it that way; index a city only when we actually launch there) |
| `/about` | The founder story, expanded; team; how verification works | The "who ARE these people" deep-dive |
| ~~`/contact`~~ | Already merged into home (301) — contact lives in the footer + `ContactPoint` schema | Correct call; GBP links to home |
| 404 | One line ("Let's get you back to a human") + Call/WhatsApp buttons | 2-minute build, real trust save |

**Navigation stays skeletal.** Header: logo + phone number + اردو toggle (+ desktop-only WhatsApp/call buttons). No menu of pages on mobile — the page *is* the menu. Footer carries the sitemap links (this is where satellites get their internal links), the number in large type, areas served, and the trust line (PNC · CNIC & references checked · pay after).

**Should the home page have MORE or LESS information?** Less surface, same substance. The current mobile page is ~35 phone-screens long; the target is **≤ 20 screens**. Cut by: collapsing (max 6 FAQ visible, max 6 service chips visible, "show more" for the rest), tightening section headers, and trusting the satellites to hold depth. A stressed person doesn't read 35 screens; they read until they feel safe, then they act. Every screen after safety is friction.

---

## 7. The Home Page, Section by Section (mobile spec)

**Recommended order** (one change from current — testimonials added before FAQ):

> Hero+form → How it works → How payment works → Who comes into your home → Services → **Testimonials** → FAQ → Founder note → Final CTA → Footer

The narrative logic: *act now if you're ready → what happens if I do → what it costs (scam fear) → who enters my home (safety fear) → what exactly you can ask for → other families like mine → remaining worries → the human behind it → act.*

### 7.1 Hero (budget: ~2.5 screens including form)

The current hero's *emotion* is right; its *clarity* has one hole: **it never says what we provide or where.** "Worried about caring for someone at home?" could be an insurance ad. A 58-year-old (and Google) must see the noun and the city.

- **Eyebrow:** `A real person is one call away` (keep).
- **H1 (revised):** name the *thing* and the *place*, keep the beloved highlight device on the action:
  > **A verified nurse or attendant at home, in Lahore. `Leave your number` — a real person calls you back.**
  Urdu mode: گھر پر تصدیق شدہ نرس یا تیماردار، لاہور میں۔ اپنا نمبر چھوڑیں — ایک اصل انسان آپ کو کال کرے گا۔
- **Sub (tighten to 2 lines):** "Take a breath. No advance, no long form. Tell us your name and number — we'll call, listen, and arrange the right person." Plus one small inline Nastaliq line so Urdu is visible pre-toggle.
- **Trust chips (keep, small edits):** `PNC-registered nurses` · `Pay after the shift` · `No advance` (not "0 advance" — "No" reads warmer than a digit) · `First day free` · `Day or night` · `ہم اردو بولتے ہیں — We speak Urdu`.
- **The phone number appears as TEXT:** "Or call **0328-8489988** — 24/7" directly under the form button (tel: linked). Buttons alone hide the number; this audience writes numbers down, reads them out to spouses, and trusts a visible number more than a button. The number-as-text also survives screenshots.
- **Form (unchanged law):** Name + Phone required, care-type chips optional (tap-not-type), promise line **"We call back fast — usually within 15 minutes"**, privacy line ("Your number stays private. We only call about your care."). Inline plain-language errors (already done).
- **Fold test at 393×850:** visible without scrolling = header, H1 (≤3 lines), the chips or sub (at least one), the form's first field, sticky bar. If a real hero photo ever exists (founder or caregiver, warm, non-stock), it may sit small beside the H1 on desktop — never pushing the form down on mobile.

### 7.2 How it works (budget: ~2 screens)

Keep the 3 steps exactly as conceived (leave number / real person calls back & matches / care arrives — can start within 24 hours — pay after) with the WhatsApp-green "we message you when your caregiver is on the way" chip in step 3 (honest — a manual update, no GPS claim). Compress: steps can be tighter cards; the section needs no intro paragraph.

### 7.3 How payment works (budget: ~2 screens) — the site's best idea. Protect it.

Prices are hidden from all public surfaces as of 2026-07-02 (partner decision, explicitly reversible — see Decision Ledger). Same receipt visual, non-numeric rows: Exact price → **told on the first call** · Advance → **none** · First day → **free** · Hidden fees → **none** · **You pay: AFTER SHIFT**. Scalloped ticket edges, dotted leaders, "PNC-registered · CNIC & references checked · NOTHING HIDDEN" footer. Lead copy above the card: "We tell you the exact price on the first call — before care starts. No fine print, no surprises."

Component file stays `components/home/PriceReceipt.tsx` and the section keeps `id="price"` — so numeric prices can be restored quickly if the partner reverses the call.

**Upgrade — make it forwardable (new, cheap, high-leverage):** a small "Share this with your family · اپنے گھر والوں کو بھیجیں" button under the card that opens WhatsApp with a pre-composed message (payment terms + our number + link — **no amounts**). The card is exactly what one sibling forwards to the family group; make that a one-tap act. (Implementation: `wa.me` share text now; a generated card image later.)

Also: one quiet line of context under the card: "Flat rate, same day or night, anywhere in Lahore. First day free — continue only if you're happy."

### 7.4 Who comes into your home (budget: ~2.5 screens)

The deepest fear, answered with the product's #1 feature: **you meet the caregiver before they arrive.**

- Headline pattern: "We send you the nurse's card before the shift." Sub: photo, full name, PNC registration number, verification status — on WhatsApp, before anyone enters your home. "No strangers, no surprises."
- The **sample card** (Ayesha Saleem) stays — with the honesty label — until a **real** staff member's card (with consent) replaces it. That swap converts a concept into proof and is a top-5 priority (§8).
- **Show the verification artifact, not the claim (new):** a small verification block on/near the card — "CNIC checked ✓ · References called ✓ · Police-verified ✓ · Verified on [date]" — the *date* is what no competitor shows. All three checks are true today for every caregiver (finalized 2026-07-01); *police verification* is a term Pakistani families specifically look for — name it.
- Keep the "Female or male nurses. You choose." panel + female-for-female badge. Research confirms gender choice is a first-class screening criterion, not a bonus.

### 7.5 Services (budget: ~2.5 screens)

- Two tiers, plainly split: **Qualified Nurse (PNC-registered, clinical)** vs **Attendant (trained, non-clinical)** — with the one-line "what's the difference" right there, because it's a real question (and keep it in FAQ too).
- Chips with Urdu labels that deep-link to WhatsApp with a pre-filled Roman-Urdu message (keep — this is the site's second-best conversion device).
- **Max 6 chips visible**; the rest behind the existing "All services" disclosure. Post-op, Elderly, Night Duty, Mother & Baby, Dementia, Palliative earn the visible slots (highest-intent needs).
- The honest helper line stays: "Not sure which one fits? WhatsApp us — we'll tell you honestly whether you need a nurse or an attendant." (This sentence *is* the brand.)

### 7.6 Testimonials (budget: ~1.5 screens) — NEW section; build the pipeline first (§8)

- Format: short real quote (Urdu quotes stay in Urdu — a Nastaliq testimonial is *more* convincing to this audience, add a small English gloss) — **Name, Area** (e.g., "Farhana A., DHA Phase 4"), care type, month.
- Max 3 visible. No star-rating theatrics, no carousels.
- **Include one mildly critical/mixed review once we have volume** — research shows it increases believability.
- **Until real ones exist, the section does not appear.** Never fake, never "as seen from our happy clients" filler. (The empty `Testimonials.tsx` stub was the right instinct.)

### 7.7 FAQ — "The worries we hear most, answered plainly" (budget: ~2.5 screens)

- Keep the fear-naming courage ("How do I know this isn't a scam?" with Urdu subtitle) — this section is a differentiator.
- **6 visible, rest collapsed** behind "More questions".
- Add three high-intent Q&As:
  1. **"How fast can care start?"** — "Within 24 hours of your call, often sooner." (Finalized.)
  2. **"What if we're not comfortable with the caregiver?"** — the full replacement promise (upgraded 2026-07-02): "Tell us — we replace the caregiver, free, until you're fully satisfied. You've paid nothing in advance, so you're never stuck."
  3. **"I live abroad — can I arrange care for my parents in Lahore?"** — yes, over WhatsApp; card before the shift; updates on WhatsApp; family in Lahore pays after the shift (or state the actual mechanism).
- All FAQ content emits `FAQPage` JSON-LD (§9).

### 7.8 Founder note (budget: ~1.5 screens)

The grandmother story is the single most credible paragraph on the site — it's true, specific, and exactly mirrors the customer's situation. Keep the current text's shape: *why we exist → what we promise → "I promise to look after your family the way I wanted mine looked after."*

- **Name confirmed: Abdullah Waseem.** The real photo is pending (§8, item 1) — the placeholder keeps its honesty label until the photo lands.
- Consider the "family-run, not a call centre" line — research shows this framing directly defuses the scam fear.
- Signature element: "Abdullah Waseem — Founder, Sehat Connect · Lahore".

### 7.9 Final CTA + Footer (budget: ~2 screens)

- Final CTA: teal drench, short ("Leave your number. A real person calls you back."), the mirrored mini-form, and the phone number as large text with the Urdu line. Keep.
- Footer = the trust ledger: number in large type · WhatsApp link · **care@mysehatconnect.com** · hours (24/7) · **Office: 442-G, Street 7, Phase 6, DHA, Lahore** · areas served (named localities — also SEO) · sitemap links to satellites · the verification trust line · © Sehat Connect, Lahore. A real, checkable street address is rare in this category (only 2 competitors show one) — ours goes in the footer, on `/about`, on GBP, and in the JSON-LD.

### Always-on elements

- **Sticky mobile bar** (Call / WhatsApp / Get a call, ≥56px, safe-area inset): the most important 76 pixels on the site. Never hidden, never redesigned casually. `pb-20` on the body so it never covers content.
- **Header:** slim; logo + tagline, phone number (desktop), اردو toggle ≥56px.

### `/book/confirm` — the neglected emotional peak

The moment after someone hands us their number is the moment of maximum vulnerability ("did that go anywhere? was that stupid?"). Spec:
- Big calm confirmation: "Done. A real person will call you back — usually within 15 minutes." + their name echoed ("Shukriya, Ahmed sahib.") + Urdu line.
- What happens next, in 3 tiny steps (we call → we listen → we send the caregiver's card on WhatsApp before the visit).
- "Can't wait? Call us now: 0328-8489988" + WhatsApp button.
- Optional: "Save our number" (downloads a vCard) so our later call isn't an unknown number — small, but unknown-number anxiety is real in Pakistan.
- No upsells, no "meanwhile, read our blog." Calm.

---

## 8. Trust Asset Roadmap — the real work is not code

The site's design is ahead of its evidence. The highest-leverage work for the next month is **collecting proof**, then slotting it into seams the design already has. In priority order:

1. **Founder photo** (1 hour, free — name confirmed: Abdullah Waseem). Warm, plain-background portrait, arm's-length friendly. Slots into §7.8 and `/about`. *The single cheapest big win on the whole list.*
2. **Google Business Profile** (2 hours, free) — see §9. Technically discovery, but it's also a trust asset: the audience checks Google/Maps before calling.
3. **One real caregiver card** (needs consent + a portrait + their PNC #). Replaces the Ayesha Saleem sample. The site's central promise becomes a photographed fact.
4. **Caregiver portraits, 3–5** (half a day). Plain background, calm, in uniform if uniforms exist. Consent in writing (a WhatsApp "yes, you can use my photo on the website" screenshot is enough process for now). These feed the card, the "who comes in" section, GBP photos, and Facebook.
5. **Testimonial pipeline** (ongoing, start week 1). After every completed engagement, the ops person sends one WhatsApp message: *"Would you write 1–2 lines about how it went? We'd like to put it on our website with your first name and area — only if you're comfortable."* Store text + consent. First 3 real ones unlock §7.6. Later: voice-note testimonials (this audience trusts voices; small audio embeds, phase 3).
6. **Verification artifact** (defined): CNIC checked + references called + police verification — all three, for every caregiver — rendered as the "Verified on [date]" block on cards (§7.4).
7. **Founder video, 30–45s, Urdu** (phase 2): the founder saying the grandmother paragraph to camera. Poster + tap-to-play (no autoplay, no bandwidth cost until tapped). For this demographic a spoken Urdu promise from a real face outperforms any copy.

**Honesty labels stay until the real asset lands.** The labeled sample card is better than a stock photo; an absent testimonial section is better than a fake one.

---

## 9. SEO & Discovery

### 9.0 The domain (BLOCKING — fix before any SEO work)

**Decided: the canonical domain is `mysehatconnect.com`.** The live site currently sits on `lucaintel.com` — a domain with zero relation to the brand — while parts of the metadata already reference `mysehatconnect.com`. Split identity is both an SEO bug (canonicals pointing at a domain that isn't live) and a trust bug (a suspicious Arranger who checks the URL sees a random name).

**Action:** deploy to `mysehatconnect.com`, 301 `lucaintel.com` (and any other alias) to it, and align `SITE_URL` in `lib/constants.ts` (currently set to lucaintel.com), sitemap, robots, canonicals, and all JSON-LD. Set up **care@mysehatconnect.com** (mail forwarding is enough) at the same time. Do this before building links or GBP, so every signal accrues to one domain forever.

### 9.1 Google Business Profile — the highest-leverage discovery action, full stop

For "nurse near me / home care Lahore" queries, the local pack outranks every website. Competitors are weak here (the best-funded one is unrated). Playbook:

- Create/claim the profile: category **Home health care service**; name exactly "Sehat Connect"; the real phone; the office address (**442-G, Street 7, Phase 6, DHA, Lahore**) as the location anchor plus Lahore-wide service area; hours 24/7; link to `mysehatconnect.com`.
- Fill *everything*: services (price told on request — call or WhatsApp for the exact quote; **do not publish prices for now**, per the 2026-07-02 partner decision), description in plain English + Urdu, real photos as they're collected (§8).
- **Review drip:** ask every satisfied family for a Google review (same WhatsApp ask as testimonials — one message, two asks max). Target a steady trickle (1–2/week), never a burst. Respond to every review, warmly, in the reviewer's language.
- Seed the Q&A section with the top 5 FAQ (anyone can ask; the owner can answer).

### 9.2 Keyword map (from live research)

| Intent cluster | Terms | Landing page |
|---|---|---|
| Nursing head terms | home nursing services Lahore · nurse for home Lahore · 24 hour home nursing Lahore · nurse for patient at home | `/services/qualified-nurse` (+ home) |
| Attendant terms | patient attendant Lahore · attendant for patient · female/lady attendant Lahore | `/services/attendant` |
| Elder care | elderly care at home Lahore · old age care Lahore | `/services/qualified-nurse` + home |
| **Roman Urdu gap (low competition — our edge)** | ghar par nurse · attendant chahiye Lahore · bemar ke liye attendant · ghar pe nurse chahiye | Woven *naturally* into home FAQ + services copy (a heading like "Ghar par nurse chahiye? — need a nurse at home?") — not doorway pages |
| Near-me | nurse near me · home care near me | GBP (local pack), not the website |
| Overseas | home care for parents in Lahore/Pakistan (searched from abroad) | Home §7.7 FAQ + `/about` |

### 9.3 On-page mechanics

- One `<h1>` per page containing the service + city ("nurse or attendant at home in Lahore" — §7.1 fixes this for home).
- Title/meta per page, written like a calm classified ad, no price amounts ("Home nursing in Lahore — exact price on the first call, pay after the shift. A real person answers 24/7.") — the meta description is ad copy for the fearful, not keyword soup.
- JSON-LD: `LocalBusiness` (subtype `MedicalBusiness`/`HomeHealthCareService`) with name, phone, **the DHA office address**, area served, hours (no `priceRange` — prices are not public as of 2026-07-02); `FAQPage` on home; keep it in sync with visible content only.
- `sitemap.ts`/`robots.ts` already exist — keep; noindex or remove non-live city pages.
- Internal links: footer → satellites; satellites → home form. (The recent footer-links commit had the right idea; make sure every linked page passes the "mini conversion page" bar.)
- Images: descriptive alt text with real names where consented ("Nurse Ayesha Saleem's verified Sehat Connect ID card").
- **Content later, only when real:** one honest guide per month max ("What a night attendant actually does", "Bringing a parent home after the ICU: a Lahore checklist"). Written from real ops experience, in the site's plain voice. Zero AI-filler pages; thin content damages the exact trust we're building.

### 9.4 Where this audience actually is: Facebook + WhatsApp

- **Facebook page** (40–65 Pakistanis live here): same name, same photos, same testimonials, WhatsApp button, post occasionally (a caregiver intro, a testimonial, a plain-language tip). Low effort, real surface — competitors are thin here too. Many Arrangers will search Facebook *instead of* Google.
- **WhatsApp Business** (not the app's regular account): verified business name "Sehat Connect", profile photo = logo, description naming the two services (no prices — quoted on the call, per the 2026-07-02 decision), catalog with the two services, greeting message in Roman Urdu, away-message honesty at night if not truly 24/7 on WhatsApp. This is free and makes every wa.me tap land on something that looks like a business, not a random number.

---

## 10. Performance & Accessibility Budgets

Hard budgets, verified on every significant change (Lighthouse mobile / real mid-range Android):

- **LCP < 2.5s on Slow 4G**; CLS ≈ 0; total first-load transfer **< 300KB** (the page is mostly text — this is achievable).
- **Fonts are the main risk** (3 families incl. Nastaliq): subset to used glyph ranges, `font-display: swap`, preload only the primary text face; Nastaliq loads lazily unless in Urdu mode.
- Images: AVIF/WebP with explicit width/height, lazy-load below the fold; the future real photos must land compressed (<80KB each).
- **No third-party scripts** except one lightweight analytics (§12). No chat widgets, no tag managers, no consent-banner clutter.
- JS: the page should work as HTML+CSS with JS as enhancement (forms post, accordions degrade open).
- Accessibility floor: WCAG AA contrast, visible focus states, form errors in words not color (done), `lang="ur" dir="rtl"` on Urdu content, `prefers-reduced-motion` respected (done), semantic headings in order.

---

## 11. Features: Build / Skip

### Build (in order)

| Feature | Verdict | Why |
|---|---|---|
| **Pre-visit caregiver card on WhatsApp** (photo, name, PNC #, verified-on date, ETA) | **BUILD — #1 product priority** | Answers the deepest fear; it's a message template + internal discipline, not software |
| Real trust assets (photos, testimonials, GBP) | **BUILD — #1 website priority** | §8; the design has seams waiting for them |
| Honest full-page Urdu toggle | **BUILD** | The toggle exists; make it true (§5) |
| Forwardable payment-terms receipt ("share with family") | **BUILD** (new) | The decision happens in a family WhatsApp group; one tap serves it |
| Status updates via WhatsApp (confirmed → on the way → arrived → done) | **BUILD (light)** | Manual templates; SMS fallback for confirmation + ETA only |
| Same-caregiver continuity | **BUILD (ops, no customer tech)** | Retention + the "request same nurse" FAQ promise |
| Female-for-female matching | **BUILD (ops)** | First-class screening criterion (research-confirmed) |
| Internal ops tool (lead inbox, roster, verification records, templates) | **BUILD** | The only dashboard worth building is for staff |
| "Living abroad?" content + FAQ | **BUILD (content)** | Real high-value segment, zero tech |
| Founder video (Urdu, 30–45s) | **Phase 2** | Highest-trust medium for this audience |
| Voice-note testimonials | **Phase 3** | Novel, credible, cheap; after text testimonials exist |
| Easypaisa/JazzCash | **Later, optional** | Cash-after is itself a trust feature; add e-wallets as convenience, never require upfront |

### Skip (unchanged verdicts + new entries)

| Idea | Why skip |
|---|---|
| Real-time GPS tracking | Cost, privacy/labour friction, breaks visibly; the card + "on the way" message + a callable human is cheaper trust |
| Customer dashboard / login / app | The WhatsApp thread **is** their dashboard |
| Browse-nurses / public profiles / marketplace | Inventory + choice paralysis; "we match you" is the product |
| Public ratings platform | Curated real testimonials + private post-shift feedback |
| Chatbot / AI assistant on site | The entire brand is "a real person answers" — a bot is brand damage |
| Popups, discounts, countdowns, newsletters | Anxiety machines; this audience closes the tab |
| Stock photography | Reads as fake to exactly this audience; labeled placeholders until real photos |
| Fake urgency / fake "online now" dots | Honesty rule |
| Blog/content farm before ops maturity | Thin content erodes the trust position; one real guide/month max, later |

---

## 12. Measurement

Keep it nearly effortless — a weekly 10-minute habit, not a dashboard project:

- **North-star metric: qualified callback requests per week** = form submits + inbound calls + new WhatsApp conversations. (Denominator to watch casually: sessions, from analytics.)
- Instrument the three actions: form submit (already server-side), `tel:` clicks, `wa.me` clicks — one lightweight analytics tool (Vercel Web Analytics or Plausible; **no GA4**, no cookies banner needed).
- GBP insights monthly: calls from profile, direction requests, search terms.
- **Callback integrity.** The printed promise is "usually within 15 minutes" — track the real median for a month. If callbacks genuinely always land inside 15 minutes, the wording may harden to "within 15 minutes"; if not, "usually" stays. The promise text follows reality, never the other way round.
- **The 58-year-old test** (§4.3) after every major change, and quarterly regardless: 10s comprehension / 30s payment terms / 60s action.
- Qualitative: one saved screenshot per week of a real customer WhatsApp exchange (with consent) — the tone families use tells us what the site should say next.

---

## 13. Roadmap

### Now (weeks 1–2) — truth & foundations
1. **Domain consolidation** (§9.0): deploy to `mysehatconnect.com`; 301 `lucaintel.com`; fix `SITE_URL`, canonicals, JSON-LD; set up care@mysehatconnect.com.
2. **Hero H1 says the noun + the city** (§7.1); phone number as visible text in hero and footer; ~~"0 advance" → "No advance"~~ (done 2026-07-02); promise line becomes "We call back fast — usually within 15 minutes".
3. **Google Business Profile** live and complete (§9.1), anchored on the DHA office address. Start the review/testimonial WhatsApp ask on every completed job.
4. **Founder photo** from Abdullah (§8, item 1) — the note itself is final; footer gets the office address + email.
5. **Page diet:** home to ≤20 phone-screens (§6): 6 FAQ + 6 chips visible, rest collapsed.
6. ~~Honest cities + contact cleanup~~ — already done (2026-07-01 route consolidation: non-live cities noindexed, `/contact` and `/faq` 301'd into home). Remaining: give `/cities/lahore` the full "areas we serve" content pass.
7. 404 page + `/book/confirm` upgrade (§7.9 spec).

### Next (months 1–2) — proof & language
8. **Real caregiver card** replaces the sample (photo + consent + PNC #) — plus the verified-on-date artifact (§7.4).
9. 3–5 caregiver portraits shot and placed (site + GBP + Facebook).
10. **First 3 real testimonials** live → §7.6 section mounts.
11. **Full honest Urdu toggle** — every customer-visible string translated, `lib/constants.ts` as the bilingual source of truth.
12. Satellite pages content pass to "mini conversion page" standard (§6) + Roman-Urdu phrases woven into FAQ/services (§9.2).
13. Facebook page + WhatsApp Business profile (§9.4). Receipt "share with family" button (§7.3).
14. New FAQs: 24-hour start, replacement promise, living-abroad (§7.7 — all decided; just write them).

### Later (month 3+) — compounding trust
15. Founder video (Urdu) with tap-to-play.
16. One real guide per month, only from ops experience.
17. Voice-note testimonials; mixed review included once volume exists.
18. Easypaisa/JazzCash as convenience; city expansion pages only when a city is actually live.

---

## 14. Definition of Done (customer-facing changes)

A change ships only if **all** pass:

1. The primary action is still *leave your number / call / WhatsApp* — nothing introduces browsing, accounts, or self-service booking.
2. Form asks Name + Phone; everything else optional and tap-not-type.
3. Call + WhatsApp reachable from every screen (header/hero + sticky bar); all contact values from `lib/constants.ts`, never hardcoded.
4. **The noun test:** a first-time visitor can see *what* we provide and *where* without scrolling.
5. Verified at 390px first: body ≥18px, nothing important <16px, tap targets ≥56px, high-contrast ink, sticky bar overlaps nothing.
6. Fast on mid-range Android / slow data — budgets in §10 hold.
7. Every user-facing string has an `en`/`ur` pair (Nastaliq font for Urdu), and load-bearing reassurances are bilingual inline.
8. **Every claim has an artifact, a checkable number, a named human, or an honesty label.** No unverifiable superlatives; no promises we can't always keep.
9. Plain warm language — short sentences a stressed non-native reader gets instantly; no jargon, no urgency theatrics.
10. Nothing forwardable got broken: receipt, card, and number-as-text still make sense as standalone screenshots.
11. Reuses existing constants/components/tokens; nothing reintroduces the marketplace/account model.
12. The 58-year-old test still passes (10s / 30s / 60s).

---

## Decision Ledger (finalized with the founder, 2026-07-01)

Every previously open question, closed. These are facts the rest of the document builds on:

1. **Canonical domain:** `mysehatconnect.com` — deploy there, 301 `lucaintel.com`.
2. **Founder:** Abdullah Waseem, publicly named, with photo (photo being arranged — the only pending *asset*, not a pending *decision*).
3. **Office address:** 442-G, Street 7, Phase 6, DHA, Lahore, Pakistan — shown in the footer, `/about`, GBP, and JSON-LD. (Corrected 2026-07-02; supersedes the original Model Town placeholder used while the real address was pending.)
4. **Callback promise:** "We call back fast — usually within 15 minutes." The word *usually* stays until ops data proves a bare "within 15 minutes" is always true (§12).
5. **Care start:** within 24 hours of the call.
6. **Replacement promise:** full — "tell us after the first shift and we send someone else." (Superseded 2026-07-02 — see entry 11 below.)
7. **Verification (all true today):** CNIC checked + references called + police verification, for every caregiver, rendered as a dated artifact on the card.
8. **Business email:** care@mysehatconnect.com (mail forwarding is enough).
9. **Prices hidden from public surfaces** (2026-07-02, partner decision, explicitly reversible): Rs 4,000 nurse / Rs 3,000 attendant remain internal facts only — quoted to the family on the first call, before care starts, never published on the site, SEO/JSON-LD, meta descriptions, WhatsApp prefills, or (once live) GBP. The `PRICES` constant stays in `lib/constants.ts`, marked do-not-render, so it can be restored quickly if the partner reverses the call.
10. **Trial promise adopted** (2026-07-02): "Your first day is free — no cost, no obligation. Continue only if you're happy." Short form "First day free." Canonical phrasing, now in the §3 promises table.
11. **Replacement promise upgraded** (2026-07-02): "Not comfortable? Tell us — we replace the caregiver, free, until you're fully satisfied." Supersedes the 2026-07-01 phrasing in entry 6 ("tell us after the first shift and we send someone else").

**Standing rule:** this document never carries open questions. When a new one appears, it gets decided with the founder, recorded here with the date, and folded into the body.
