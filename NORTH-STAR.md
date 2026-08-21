# Sehat Connect — North Star (v2)

**This is the source of truth.** It supersedes `design/north-star.html` and any strategy text in other documents. When another doc disagrees with this one, this one wins. Written 2026-07-01; all operational decisions finalized with the founder the same day, and extended 2026-08-21 (Decision Ledger entries 12–21). **This document carries no open business questions** (see the Decision Ledger at the end). One implementation divergence is recorded rather than hidden — the analytics choice in §12, where the code and this document disagree — and it is flagged for the founder instead of being decided quietly.

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
- Worth a home-page FAQ plus, since 2026-08-21, a page of their own — `/care-from-abroad`, which answers the payment question (Ledger #19), names what does *not* happen (no cameras, no GPS), and says who has to be able to open the door. They convert through the same funnel (WhatsApp especially).

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
| 5 | "Can I just talk to a human?" | Yes — call or WhatsApp right now, or leave a number and a real person calls back | **Visible phone number as text**, sticky Call/WhatsApp bar, callback promise we always hit | Sticky bar ✅ · number-as-text ✅ (2026-08-21, under the form and in the footer) |

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

**The model:** one conversion page (home) that does ~95% of the work, plus a ring of satellite pages that exist for SEO landings and deeper reassurance — and every satellite is itself a *mini conversion page* (what + where + payment terms + form/CTA), never a dead-end brochure page. No page exists that a worried human could land on and feel abandoned.

**The ring grew on 2026-08-21**, from ~10 pages to **26 indexable URLs**. The model did not change: home still carries the conversion, and every new page ends in the same form and the same number. What changed is that a family searching *"drip at home Lahore"* or *"nurse ka kharcha"* now lands on a page written for that sentence instead of on a general one. **`docs/keyword-map.md` is the register of which page owns which phrase** — one page, one primary phrase; before adding or retitling any page, find its row there. Two pages chasing one term make Google choose, and it often chooses wrong.

| Page | Job | Notes |
|---|---|---|
| `/` | **The machine.** Full fear-to-relief narrative + form ×2 | Spec in §7; owns the head terms ("home nurse Lahore") outright |
| `/book` · `/book/confirm` | Form-only page for ads/direct links · the post-submit emotional peak | Confirm page built (spec below); `/book/confirm` stays noindex |
| `/charges` | "What does a home nurse cost in Lahore" — answers **how** pricing works, never **what** it costs | Owns the highest-volume anxious query in the category while publishing no figure (Ledger #9) |
| `/services` | Index of the ten service pages; its real content is the nurse-vs-attendant comparison | Should be retitled to own *"which one do I need"* rather than the head term — see `docs/keyword-map.md` |
| `/services/qualified-nurse` · `/services/attendant` | The two tiers, in depth | Shared `ServiceDetailPage` component |
| `/services/injection-drip` | The **short single visit** — an injection, a drip, a dressing | The highest-volume service the site used to hide (Ledger #14) |
| `/services/post-operative-care` · `/elderly-care` · `/long-term-care` | The three situations families actually arrive in: after surgery, ageing at home, a long illness or a bedridden patient | Step-down only; no ventilator or tracheostomy (Ledger #16) |
| `/services/female-nurse` · `/services/male-nurse` | Who comes into the house, and the family's comfort | Both real (Ledger #17). Gender never changes clinical scope, registration, verification or price — both pages say so |
| `/services/mother-baby-care` | Postnatal care **for the mother** | Newborn care is not sold (Ledger #18) |
| `/services/physiotherapy` | "We **arrange** a physiotherapist" — the only approved framing | Non-employment stated outright (Ledger #15) |
| `/care-from-abroad` | The "Overseas Child" (§2) in full: arranging from the UK/USA/UAE/Canada, what reaches you, what we deliberately don't do, how payment works (Ledger #19) | The segment's own landing page, no longer one FAQ |
| `/guides` + `/guides/<slug>` | Three guides: nurse-or-attendant · post-op checklist · elderly care at home | `/guides/`, never `/blog/` — the one-a-month cap (§9.3, §11) is the point |
| `/areas` + `/areas/dha` · `/gulberg` · `/johar-town` | Lahore areas, **three by choice** | Map-pack rank falls off with distance from the DHA office; area pages plus reviews naming that area are the levers we have (Ledger #20) |
| `/cities/lahore` | Currently near-duplicates home. Its job is to become the parent of the area pages | The only *indexed* city page (non-live cities stay `noindex` "coming soon" — index a city only when we actually launch there) |
| `/about` | The founder story, expanded; team; how verification works | The "who ARE these people" deep-dive |
| ~~`/contact`~~ | Already merged into home (301) — contact lives in the footer + `ContactPoint` schema | Correct call; GBP links to home |
| 404 | One line ("Let's get you back to a human") + Call/WhatsApp buttons | Built |

**Navigation stays skeletal.** Header: logo + phone number + اردو toggle (+ desktop-only WhatsApp/call buttons). No menu of pages on mobile — the page *is* the menu. Footer carries the sitemap links (this is where satellites get their internal links), the number in large type, areas served, and the trust line (PNC · CNIC & references checked · pay after). **The footer has not kept up with the ring** — it still lists the original five service pages, and nothing links to `/areas`, `/guides` or `/care-from-abroad`. A satellite no hub links to is a page Google reaches only through the sitemap; fixing this is §13 item 12.

**Should the home page have MORE or LESS information?** Less surface, same substance. The current mobile page is ~35 phone-screens long; the target is **≤ 20 screens**. Cut by: collapsing (max 6 FAQ visible, max 6 service chips visible, "show more" for the rest), tightening section headers, and trusting the satellites to hold depth. A stressed person doesn't read 35 screens; they read until they feel safe, then they act. Every screen after safety is friction.

---

## 7. The Home Page, Section by Section (mobile spec)

**Recommended order** (one change from current — testimonials added before FAQ):

> Hero+form → How it works → How payment works → Who comes into your home → Services → **Testimonials** → FAQ → Founder note → Final CTA → Footer

The narrative logic: *act now if you're ready → what happens if I do → what it costs (scam fear) → who enters my home (safety fear) → what exactly you can ask for → other families like mine → remaining worries → the human behind it → act.*

### 7.1 Hero (budget: ~2.5 screens including form)

The current hero's *emotion* is right; its *clarity* has one hole: **it never says what we provide or where.** "Worried about caring for someone at home?" could be an insurance ad. A 58-year-old (and Google) must see the noun and the city.

- **Eyebrow:** `Care for your loved one is a call away`.
- **H1 (shipped 2026-08-21)** — names the *thing* and the *place*, keeps the highlight device on the action:
  > **A caring nurse or attendant at home in Lahore. `Leave your number` — we'll arrange the right person.**
  Urdu mode: لاہور میں گھر پر نرس یا اٹینڈنٹ۔ اپنا نمبر دیں — ہم مناسب فرد کا بندوبست کریں گے۔
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
- Bilingual rows that deep-link to WhatsApp with a pre-filled Roman-Urdu message (keep — this is the site's second-best conversion device). As built: six full-width care rows — Post-op, Elderly, Injection & Drip, Physiotherapy, Mother & Baby, Long-term Care — replacing the older chip grid and its "All services" disclosure.
- **Six is the ceiling**, and each row now has a service page behind it. Two consequences: every row should link to its page as well as to WhatsApp (§13 item 12), and **each row's one-line description must not out-promise the page beneath it** — the Mother & Baby row currently does, against Ledger #18.
- The honest helper line stays: "Not sure which one fits? WhatsApp us — we'll tell you honestly whether you need a nurse or an attendant." (This sentence *is* the brand.)

### 7.6 Testimonials (budget: ~1.5 screens) — NEW section; build the pipeline first (§8)

- Format: short real quote (Urdu quotes stay in Urdu — a Nastaliq testimonial is *more* convincing to this audience, add a small English gloss) — **Name, Area** (e.g., "Farhana A., DHA Phase 4"), care type, month.
- Max 3 visible. No star-rating theatrics, no carousels.
- **Include one mildly critical/mixed review once we have volume** — research shows it increases believability.
- **Until real ones exist, the section does not appear.** Never fake, never "as seen from our happy clients" filler. (The empty `Testimonials.tsx` stub was removed 2026-08-21 — it returned null and was imported nowhere, so it was dead code rather than a placeholder. Build the component when the first real quotes exist; this section is the spec for it.)

### 7.7 FAQ — "The worries we hear most, answered plainly" (budget: ~2.5 screens)

- Keep the fear-naming courage ("How do I know this isn't a scam?" with Urdu subtitle) — this section is a differentiator.
- **6 visible, rest collapsed** behind "More questions".
- Add three high-intent Q&As:
  1. **"How fast can care start?"** — "Within 24 hours of your call, often sooner." (Finalized.)
  2. **"What if we're not comfortable with the caregiver?"** — the full replacement promise (upgraded 2026-07-02): "Tell us — we replace the caregiver, free, until you're fully satisfied. You've paid nothing in advance, so you're never stuck."
  3. **"I live abroad — can I arrange care for my parents in Lahore?"** — yes, over WhatsApp; card before the shift; updates on WhatsApp; payment in Pakistan or in the US, settled on the first call (Ledger #19). The full answer now has its own page, `/care-from-abroad`; the FAQ stays short and links to it.
- All FAQ content emits `FAQPage` JSON-LD (§9).

### 7.8 Founder note (budget: ~1.5 screens)

The grandmother story is the single most credible paragraph on the site — it's true, specific, and exactly mirrors the customer's situation. Keep the current text's shape: *why we exist → what we promise → "I promise to look after your family the way I wanted mine looked after."*

- **Name confirmed: Sardar Waseem Ilyas.** The real photo is pending (§8, item 1) — the placeholder keeps its honesty label until the photo lands.
- Consider the "family-run, not a call centre" line — research shows this framing directly defuses the scam fear.
- Signature element: "Sardar Waseem Ilyas — Founder, Sehat Connect · Lahore".

### 7.9 Final CTA + Footer (budget: ~2 screens)

- Final CTA: teal drench, short ("Leave your number. A real person calls you back."), the mirrored mini-form, and the phone number as large text with the Urdu line. Keep.
- Footer = the trust ledger: number in large type · WhatsApp link · **care@mysehatconnect.com** · hours (24/7) · **Office: 4th Floor, 26-T, Commercial Area, DHA Phase 8, Lahore** · areas served (named localities — also SEO) · sitemap links to satellites · the verification trust line · © Sehat Connect, Lahore. A real, checkable street address is rare in this category (only 2 competitors show one) — ours goes in the footer, on `/about`, on GBP, and in the JSON-LD.

### Always-on elements

- **Sticky mobile bar** (Call / WhatsApp / Get a call, ≥56px, safe-area inset): the most important 76 pixels on the site. Never hidden, never redesigned casually. `pb-20` on the body so it never covers content.
- **Header:** slim; logo + tagline, phone number (desktop), اردو toggle ≥56px.

### `/book/confirm` — the emotional peak (built 2026-08-21)

The moment after someone hands us their number is the moment of maximum vulnerability ("did that go anywhere? was that stupid?"). The spec below is what the page now does — keep it that way:
- Big calm confirmation: "Done. A real person will call you back — usually within 15 minutes." + their name echoed ("Shukriya, Ahmed sahib.") + Urdu line.
- What happens next, in 3 tiny steps (we call → we listen → we send the caregiver's card on WhatsApp before the visit).
- "Can't wait? Call us now: 0328-8489988" + WhatsApp button.
- Optional: "Save our number" (downloads a vCard) so our later call isn't an unknown number — small, but unknown-number anxiety is real in Pakistan.
- No upsells, no "meanwhile, read our blog." Calm.

---

## 8. Trust Asset Roadmap — the real work is not code

The site's design is ahead of its evidence. The highest-leverage work for the next month is **collecting proof**, then slotting it into seams the design already has. In priority order:

1. **Founder photo** (1 hour, free — name confirmed: Sardar Waseem Ilyas). Warm, plain-background portrait, arm's-length friendly. Slots into §7.8 and `/about`. *The single cheapest big win on the whole list.*
2. **Google Business Profile** (2 hours, free) — see §9. Technically discovery, but it's also a trust asset: the audience checks Google/Maps before calling.
3. **One real caregiver card** (needs consent + a portrait + their PNC #). Replaces the Ayesha Saleem sample. The site's central promise becomes a photographed fact.
4. **Caregiver portraits, 3–5** (half a day). Plain background, calm, in uniform if uniforms exist. Consent in writing (a WhatsApp "yes, you can use my photo on the website" screenshot is enough process for now). These feed the card, the "who comes in" section, GBP photos, and Facebook.
5. **Testimonial pipeline** (ongoing, start week 1). After every completed engagement, the ops person sends one WhatsApp message: *"Would you write 1–2 lines about how it went? We'd like to put it on our website with your first name and area — only if you're comfortable."* Store text + consent. First 3 real ones unlock §7.6. Later: voice-note testimonials (this audience trusts voices; small audio embeds, phase 3).
6. **Verification artifact** (defined): CNIC checked + references called + police verification — all three, for every caregiver — rendered as the "Verified on [date]" block on cards (§7.4).
7. **Founder video, 30–45s, Urdu** (phase 2): the founder saying the grandmother paragraph to camera. Poster + tap-to-play (no autoplay, no bandwidth cost until tapped). For this demographic a spoken Urdu promise from a real face outperforms any copy.

**Honesty labels stay until the real asset lands.** The labeled sample card is better than a stock photo; an absent testimonial section is better than a fake one.

---

## 9. SEO & Discovery

### 9.0 The domain (settled — one host, forever)

**`https://mysehatconnect.com` is the final and only domain** (decided 2026-08-21). Non-www apex; `www.mysehatconnect.com` 301s to it. There is no interim domain, no second host, and no migration pending — every signal accrues to this one name forever. The site's split identity, which was both an SEO bug (canonicals pointing at a host that wasn't live) and a trust bug (a suspicious Arranger who checks the URL sees a random name), is closed.

**What this means in practice:** `SITE_URL` in `lib/constants.ts` is `https://mysehatconnect.com` and never changes; sitemap, robots, canonicals, and every JSON-LD block emit that host and only that host. Any new alias that ever appears 301s to the apex — never the reverse. **care@mysehatconnect.com** is the business email (mail forwarding is enough). Only the DNS/domain attachment and the mailbox remain as real-world setup steps (§13, item 1).

### 9.1 Google Business Profile — the highest-leverage discovery action, full stop

For "nurse near me / home care Lahore" queries, the local pack outranks every website. Competitors are weak here (the best-funded one is unrated). Playbook:

- Create/claim the profile: category **Home health care service**; name exactly "Sehat Connect"; the real phone; the office address (**4th Floor, 26-T, Commercial Area, DHA Phase 8, Lahore**) as the location anchor plus Lahore-wide service area; hours 24/7; link to `mysehatconnect.com`.
- Fill *everything*: services (price told on request — call or WhatsApp for the exact quote; **do not publish prices for now**, per the 2026-07-02 partner decision), description in plain English + Urdu, real photos as they're collected (§8).
- **Review drip:** ask every satisfied family for a Google review (same WhatsApp ask as testimonials — one message, two asks max). Target a steady trickle (1–2/week), never a burst. Respond to every review, warmly, in the reviewer's language.
- Seed the Q&A section with the top 5 FAQ (anyone can ask; the owner can answer).

### 9.2 Keyword map

**The full, current map lives in `docs/keyword-map.md`** (shipped 2026-08-21) — one row per page: primary phrase, secondary terms, the Roman Urdu variant, and what that page must **not** target. It is the register that keeps two pages from competing, and it is the first thing to read before adding or retitling a page. The clusters below are the shape of it; the file is the detail.

| Intent cluster | Terms | Landing page |
|---|---|---|
| Head terms | home nurse Lahore · nurse at home Lahore · home nursing service Lahore | `/` — owns these outright |
| Which one do I need | difference between a nurse and an attendant | `/services` + `/guides/nurse-or-attendant` |
| The two tiers | qualified/PNC nurse at home · patient attendant, *attendant chahiye* | `/services/qualified-nurse` · `/services/attendant` |
| Single visit | drip at home Lahore · injection at home Lahore | `/services/injection-drip` |
| Situations | post-operative · elderly · long-term/bedridden · postnatal (the mother) | the matching `/services/…` page, one each |
| Who comes | female nurse at home · male nurse at home | `/services/female-nurse` · `/services/male-nurse` |
| Physiotherapy | physiotherapy at home Lahore | `/services/physiotherapy` — "we arrange", never "we employ" (Ledger #15) |
| Cost | home nurse charges Lahore · nurse rate Lahore · *nurse ka kharcha* | `/charges` — never a published figure (Ledger #9) |
| **Roman Urdu gap (low competition — our edge)** | ghar par nurse · attendant chahiye Lahore · bemar ke liye attendant | Woven *naturally* into every page's headings and FAQ — never doorway pages |
| Near-me | nurse near me · home care near me | GBP (local pack), not the website |
| Area | home nurse in DHA / Gulberg / Johar Town | `/areas/<slug>` — three only, and no hospital name in a title, H1 or meta (Ledger #21) |
| Overseas | home care for parents in Lahore from the UK/USA/UAE/Canada | `/care-from-abroad` |

### 9.3 On-page mechanics

- **Exactly one `<h1>` per page**, containing the service + city. Five pages shipped with none — each opened on an `<h2>` inside `.sec-head`. That class now styles `h1` identically, so the correct tag costs nothing visually; there is no reason for a page to lack one.
- Title/meta per page, written like a calm classified ad, no price amounts ("Home nursing in Lahore — exact price on the first call, pay after the shift. A real person answers 24/7.") — the meta description is ad copy for the fearful, not keyword soup.
- JSON-LD: `LocalBusiness` (subtype `MedicalBusiness`/`HomeHealthCareService`) with name, phone, **the DHA office address**, area served, hours (no `priceRange` — prices are not public as of 2026-07-02); `FAQPage` on home and on every satellite that carries an FAQ; `BreadcrumbList` everywhere below the root; keep all of it in sync with visible content only. Every block is built from `lib/schema.ts` so the business identity is byte-identical site-wide.
- **Breadcrumbs: visible trail and `BreadcrumbList` from the same array.** Both are fed one `Crumb[]`, so they cannot disagree — a mismatch between markup and what the page shows is worse than having neither. `Crumb.nameUr` is required: while it was optional, three area pages rendered English inside the Urdu layer and nothing looked broken.
- **The sitemap derives itself from the filesystem.** It was a hand-kept array and had silently dropped four shipped pages; a page Google is never told about earns nothing. Never re-hardcode it. `robots.ts` stays; non-live city pages stay noindexed and out of the sitemap.
- **One OG card per page**, all generated from `lib/og.tsx` — WhatsApp forwarding is this business's main channel, and an identical preview for every link teaches the recipient nothing. **The cards are English only**: the edge renderer has no Nastaliq face, so Urdu there renders as tofu or in a font that sets it badly. Urdu belongs on the page.
- Internal links: footer + hubs → satellites; satellites → home form. Every linked page must pass the "mini conversion page" bar. **Currently behind:** several 2026-08-21 pages have no hub linking to them (§6, §13 item 12).
- Images: descriptive alt text with real names where consented ("Nurse Ayesha Saleem's verified Sehat Connect ID card").
- **Content only when real:** one honest guide per month max, at **`/guides/<slug>`** — never `/blog/`, which signals volume publishing and invites exactly the thin filler that would damage the trust the rest of the site is built on. Written from real ops experience, in the site's plain voice, declared in `lib/guides.ts` first. Zero AI-filler pages.

### 9.4 Where this audience actually is: Facebook + WhatsApp

- **Facebook page** (40–65 Pakistanis live here): same name, same photos, same testimonials, WhatsApp button, post occasionally (a caregiver intro, a testimonial, a plain-language tip). Low effort, real surface — competitors are thin here too. Many Arrangers will search Facebook *instead of* Google.
- **WhatsApp Business** (not the app's regular account): verified business name "Sehat Connect", profile photo = logo, description naming the two services (no prices — quoted on the call, per the 2026-07-02 decision), catalog with the two services, greeting message in Roman Urdu, away-message honesty at night if not truly 24/7 on WhatsApp. This is free and makes every wa.me tap land on something that looks like a business, not a random number.

---

## 10. Performance & Accessibility Budgets

Hard budgets, verified on every significant change (Lighthouse mobile / real mid-range Android):

- **LCP < 2.5s on Slow 4G**; CLS ≈ 0; total first-load transfer **< 300KB** (the page is mostly text — this is achievable).
- **Fonts are the main risk** (3 families incl. Nastaliq): subset to used glyph ranges, `font-display: swap`, preload only the primary text face; Nastaliq loads lazily unless in Urdu mode.
- Images: AVIF/WebP with explicit width/height, lazy-load below the fold; the future real photos must land compressed (<80KB each).
- **No third-party scripts** except one analytics tool (§12). No chat widgets, no tag managers. Keep consent UI to the legal minimum if GA4's cookies require any — a banner is clutter on a page a frightened person is trying to read, so it is a cost to be minimised, not a feature.
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
| ~~"Living abroad?" content + FAQ~~ | **BUILT** (2026-08-21) | `/care-from-abroad` — real high-value segment, zero tech |
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
- Instrument the three actions: form submit (already server-side), `tel:` clicks, `wa.me` clicks — one lightweight analytics tool.
  - **The tool is GA4** (decided 2026-08-21 — supersedes the original *Vercel Web Analytics or Plausible; no GA4* wording; see ledger entry 22). Shipped as `lib/analytics.ts` + `components/analytics/`, firing `lead_call`, `lead_whatsapp` and `lead_form_submit`. **Before `NEXT_PUBLIC_GA4_ID` is set, the cookie/consent question has to be answered** — GA4 writes cookies, which is the thing §10's "no consent-banner clutter" was protecting against. Until the ID is set nothing loads and nothing is collected.
  - Two rules hold whichever tool is used: analytics never gates or breaks a lead action, and it never fires on submit *intent* — only once the server confirms it has the lead, or the conversion count overstates real leads.
- GBP insights monthly: calls from profile, direction requests, search terms.
- **Callback integrity.** The printed promise is "usually within 15 minutes" — track the real median for a month. If callbacks genuinely always land inside 15 minutes, the wording may harden to "within 15 minutes"; if not, "usually" stays. The promise text follows reality, never the other way round.
- **The 58-year-old test** (§4.3) after every major change, and quarterly regardless: 10s comprehension / 30s payment terms / 60s action.
- Qualitative: one saved screenshot per week of a real customer WhatsApp exchange (with consent) — the tone families use tells us what the site should say next.

---

## 13. Roadmap

### Now (weeks 1–2) — truth & foundations
1. ~~**Domain consolidation** (§9.0): `SITE_URL`, canonicals, sitemap, robots, and JSON-LD all on `mysehatconnect.com`~~ — **done in code (2026-08-21); `mysehatconnect.com` is the final and only host.** Remaining real-world steps: attach the apex domain in DNS with `www` 301'ing to it, and set up care@mysehatconnect.com.
2. ~~**Hero H1 says the noun + the city** (§7.1); phone number as visible text in hero and footer; "0 advance" → "No advance"; promise line becomes "We call back fast — usually within 15 minutes"~~ — **all done** ("0 advance" 2026-07-02, the rest 2026-08-21). The H1 reads *"A caring nurse or attendant at home in Lahore. Leave your number — we'll arrange the right person."*, the number sits as text under the form and in the footer, and the callback promise is verbatim from `lib/constants.ts`.
3. **Google Business Profile** live and complete (§9.1), anchored on the DHA office address. Start the review/testimonial WhatsApp ask on every completed job — ~~the ask itself needs writing~~; the scripts are ready in `docs/review-ask-messages.md` (2026-08-21). **This is now the single highest-value item on the list**, and the one blocking the area pages from earning their reviews.
4. **Founder photo** from Sardar Waseem Ilyas (§8, item 1) — the note itself is final; ~~footer gets the office address + email~~ (done). The photo is the only pending brand asset.
5. **Page diet:** home to ≤20 phone-screens (§6). The FAQ half is done (6 visible + a "More questions" disclosure), and the services section was rebuilt as six WhatsApp care rows rather than a chip grid, so the "6 chips + All services" wording in §7.5 describes a section that no longer exists. What remains is the measurement itself: count the screens at 390px and cut. The satellites now hold the depth that made a long home page defensible, so the case for cutting is stronger than it was.
6. ~~Honest cities + contact cleanup~~ — done (2026-07-01 route consolidation: non-live cities noindexed, `/contact` and `/faq` 301'd into home). **Remaining, and now sharper:** `/cities/lahore` still near-duplicates home. Its job is to become the parent of `/areas/dha`, `/gulberg` and `/johar-town`; if that is not done, 301 it to `/` — a near-duplicate of the home page is worth less than nothing (`docs/keyword-map.md`).
7. ~~404 page + `/book/confirm` upgrade (§7.9 spec)~~ — **done 2026-08-21.** Both exist; `/book/confirm` echoes the name, gives the three next steps, and offers "save our number".
8. **Set the Supabase env vars on Vercel.** Leads currently reach a human only through the ntfy channel; nothing is persisted. The lead-capture code is already fail-safe (§11) — this is one dashboard action.

### Next (months 1–2) — proof & language
9. **Real caregiver card** replaces the sample (photo + consent + PNC #) — plus the verified-on-date artifact (§7.4).
10. 3–5 caregiver portraits shot and placed (site + GBP + Facebook).
11. **First 3 real testimonials** live → §7.6 section mounts. The area pages want one review each from that area (§6).
12. **Internal linking catches up with the ring.** The footer and `/services` still list only the original five service pages; `/areas`, `/guides`, `/care-from-abroad`, `/services/mother-baby-care` and `/services/physiotherapy` have no hub pointing at them. Also retitle `/services` off the head term (`docs/keyword-map.md`). Cheap, and it is what turns 26 pages into one site.
    - **One copy fix rides with it, and it is not cosmetic:** the home page's Mother & Baby row still reads *"Newborn and postnatal support for new mothers"*, which promises the newborn care Ledger #18 says we do not sell — the service page beneath it refuses that promise explicitly. The home page must be brought to the page's scope, never the reverse. The home care rows also open WhatsApp only; giving each row a link to its service page is the same edit.
13. **Full honest Urdu toggle** — every customer-visible string translated, `lib/constants.ts` as the bilingual source of truth. The 2026-08-21 satellites all ship `en`/`ur` pairs, so the remaining gap is narrower than it was.
14. ~~Satellite pages content pass to "mini conversion page" standard (§6) + Roman-Urdu phrases woven in (§9.2)~~ — **done 2026-08-21**: every satellite ends in the form, the number and the payment terms, and carries at least one natural Roman Urdu phrase.
15. Facebook page + WhatsApp Business profile (§9.4). Receipt "share with family" button (§7.3).
16. ~~New FAQs: 24-hour start, replacement promise, living-abroad (§7.7)~~ — done (2026-07-02); the living-abroad answer now has a whole page behind it (`/care-from-abroad`).

### Later (month 3+) — compounding trust
17. Founder video (Urdu) with tap-to-play.
18. One real guide per month, only from ops experience — three exist (§6); the fourth is due, not overdue. `/guides/verify-pnc-registration` is the strongest candidate and is blocked on someone actually walking the PNC portal and screenshotting it.
19. Voice-note testimonials; mixed review included once volume exists.
20. Easypaisa/JazzCash as convenience; city expansion pages only when a city is actually live. A **fourth area page** belongs here too, and only once it passes the swap test with a real review from that area (Ledger #20).

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

1. **Canonical domain:** `mysehatconnect.com` — deploy there, 301 any other alias to it. (Reaffirmed and made absolute 2026-08-21 — see entry 12 below.)
2. **Founder:** Sardar Waseem Ilyas, publicly named, with photo (photo being arranged — the only pending *asset*, not a pending *decision*).
3. **Office address:** 442-G, Street 7, Phase 6, DHA, Lahore, Pakistan — shown in the footer, `/about`, GBP, and JSON-LD. (Corrected 2026-07-02; superseded the original Model Town placeholder used while the real address was pending. **Superseded in turn 2026-08-21 — see entry 13 below**; this Phase 6 address is dead and must appear nowhere.)
4. **Callback promise:** "We call back fast — usually within 15 minutes." The word *usually* stays until ops data proves a bare "within 15 minutes" is always true (§12).
5. **Care start:** within 24 hours of the call.
6. **Replacement promise:** full — "tell us after the first shift and we send someone else." (Superseded 2026-07-02 — see entry 11 below.)
7. **Verification (all true today):** CNIC checked + references called + police verification, for every caregiver, rendered as a dated artifact on the card.
8. **Business email:** care@mysehatconnect.com (mail forwarding is enough).
9. **Prices hidden from public surfaces** (2026-07-02, partner decision, explicitly reversible): Rs 4,000 nurse / Rs 3,000 attendant remain internal facts only — quoted to the family on the first call, before care starts, never published on the site, SEO/JSON-LD, meta descriptions, WhatsApp prefills, or (once live) GBP. The `PRICES` constant stays in `lib/constants.ts`, marked do-not-render, so it can be restored quickly if the partner reverses the call.
10. **Trial promise adopted** (2026-07-02): "Your first day is free — no cost, no obligation. Continue only if you're happy." Short form "First day free." Canonical phrasing, now in the §3 promises table.
11. **Replacement promise upgraded** (2026-07-02): "Not comfortable? Tell us — we replace the caregiver, free, until you're fully satisfied." Supersedes the 2026-07-01 phrasing in entry 6 ("tell us after the first shift and we send someone else").
12. **Domain settled, permanently** (2026-08-21, owner): `https://mysehatconnect.com` is the final and only URL — non-www apex, with `www` 301'd to it. The old `lucaintel.com` host will never be used again; it is not an interim domain, and there is no cutover left to plan. Supersedes the "deploy there, 301 lucaintel" framing in entry 1 — the code already ships this host, so only DNS and the mailbox remain (§9.0, §13 item 1).
13. **Office address moved** (2026-08-21, owner): **4th Floor, 26-T, Commercial Area, DHA Phase 8, Lahore, Pakistan** — shown in the footer, `/about`, GBP, JSON-LD, and every citation. Supersedes the Phase 6 address in entry 3, which is dead and must appear nowhere. **The postal code is deliberately omitted everywhere:** the old 54920 belonged to Phase 6 and is wrong for Phase 8, and a wrong code damages NAP consistency more than a missing one. The correct code is pending confirmation from the Google Business Profile (§9.1); until it is confirmed, no postal code is published.

14. **Care formats — the single visit is real** (2026-08-21, owner): a nurse can come for a **short one-off visit** (an injection, a drip, a dressing change) as well as for a 12-hour shift. The site had modelled only 12-hour shifts, which hid the highest search-volume service in the category. **Round-the-clock cover is two caregivers across two 12-hour shifts — never one person awake for 24 hours**, and we say so plainly, because agencies that imply otherwise are lying and families can tell. Both facts live in `CARE_FORMATS` in `lib/constants.ts`.

15. **Physiotherapy stays deliberately vague** (2026-08-21, owner): physiotherapy is listed as a service, but it is **not confirmed in-house — early on it may be delivered by a contractor.** So no surface may claim we employ or directly provide a physiotherapist, and no page may promise rehabilitation, therapy or a structured recovery programme. The existing home-page wording — "Movement, mobility and recovery support at home" — is the **ceiling**, not a starting point. Helping a patient move, walk, change position or get out of bed is ordinary caregiving and may be described as such; calling it therapy is not. Revisit only when physiotherapists are actually employed (honesty rule, §3).

16. **ICU scope is step-down only** (2026-08-21, owner): we take patients **home after ICU/HDU** and say so, but we do **not** offer ventilator or tracheostomy care. Competitors lead with those; we do not have the nurses or equipment, so no page may imply we do. Revisit only if that changes.

17. **Male nurses are on the roster** (2026-08-21, owner): male PNC-registered nurses are available, not only female ones, so `/services/male-nurse` describes a real service rather than an aspiration. **Gender changes who walks into the house and whether the family is comfortable — never the clinical scope, the registration, the verification or the price**, and both gender pages must say so plainly. The two pages answer different questions on purpose: the male page is about physical handling, an older man's dignity and night duty; the female page is about modesty, the female patient, and how to make the request. If they ever converge they are one page competing with itself (`docs/keyword-map.md` rule 1).

18. **Mother & baby means the mother** (2026-08-21, owner): the service is care for the **mother after delivery** — C-section wound care and dressing, vitals, prescribed medicines, injections and drips on the doctor's prescription (nurse work) — plus **traditional postnatal support** so she can rest: her meals, hygiene, help moving around the house, company, overnight duty (attendant work). **Day-to-day newborn care is not confirmed and is therefore not sold.** No surface may promise baby, newborn or neonatal care or imply a caregiver will look after the infant; "baby care nurse Lahore" is deliberately not targeted. A family expecting a baby nurse and receiving a maternal attendant is the mismatch that destroys trust on day one, so the page refuses it once, plainly, in the FAQ. Maternal health is high-stakes YMYL: no breastfeeding advice, no guidance on bleeding, pain or resuming anything, no warning-signs list, no recovery timeline — every clinical worry routes back to the doctor who looked after the delivery.

19. **Paying from abroad — two options, settled on the call** (2026-08-21, owner): an overseas family can pay **in Pakistan** (someone in Lahore pays after the shift) **or in the United States**. Which of the two suits them is settled on the first call, before care starts. **No payment rail is ever named on the site** — no bank, no Wise, Zelle, Remitly or PayPal, no IBAN, no account number — because none is confirmed, and naming one that later turns out wrong reads as a scam to precisely the reader who is most alert to one (§4 law 6). What does not change, wherever the money comes from: no advance, pay after the shift, first day free.

20. **Area pages stop at three** (2026-08-21, owner): DHA, Gulberg and Johar Town, held in `AREAS` in `lib/areas.ts`. Seven near-identical pages for one city is the doorway pattern Google discounts, and they would cannibalise each other and `/cities/lahore` for the same terms. **The swap test is the bar: if two area pages could exchange names and still read correctly, they are not done.** A fourth is earned — by having something true only of that area to say, ideally a real review from a family there — not added because the area exists. Model Town, Cantt, Bahria Town and Wapda Town are deliberately unbuilt, not forgotten. Why area pages matter at all here: map-pack rank falls off with distance from the office, and the office sits in DHA Phase 8 on the city's eastern edge, so for Gulberg and Johar Town proximity works against us and an area page plus reviews naming that area are the levers we actually have.

21. **Hospitals are context, never affiliation** (2026-08-21, owner): real Lahore hospital names may appear on the site **only as a factual statement about where our patients come from** — "families call us after discharge from…". We have no relationship with any of them. No page may imply partnership, affiliation, referral or endorsement, and **no hospital name goes in a title, an H1 or a meta description**, where it would read as a claim rather than as context and invite a complaint we would deserve. Names must be verified real ones; never invent one to fill an area page.

22. **GA4 is the analytics tool** (2026-08-21, owner): supersedes §12's original *"Vercel Web Analytics or Plausible; **no GA4**"*. The reason for the reversal is narrow and specific: a Google Ads Search campaign can only optimise against conversions **Google** records, and Plausible and Vercel Web Analytics cannot feed the Ads account. Since the plan runs a paid campaign, refusing GA4 would mean paying for clicks we cannot optimise. The original objection stands on its own terms and is not dismissed — GA4 is heavier than the alternatives on the mid-range Androids this site is built for, and it writes cookies, which is exactly what §10's "no consent-banner clutter" was guarding. **So: `NEXT_PUBLIC_GA4_ID` must not be set until the cookie/consent question is answered.** Until it is set the script never loads and nothing is collected, so the module sitting in the repo collects nothing and commits nothing. If the paid campaign is ever abandoned, this decision should be revisited rather than inherited — the justification disappears with it.

23. **Say what we do; refuse only when refusing is necessary** (2026-08-21, owner): the site had grown a defensive habit of writing "we do not…" — thirty-odd instances, including a flat "No" to newborn care and the same we-won't-invent-a-response-time caveat four times across three pages. The owner's position: newborn care is not something we *usually* do, but we could arrange it if a family asked, and publishing a refusal converts a possible booking into a closed door. **Not promising is sufficient.** The pattern is: describe what the caregiver comes for, then invite the ask on the first call. This does NOT loosen the honesty rule — never promise what ops cannot deliver, and never let a family expect a service they will not get. It removes the *unnecessary* half: refusals that protect nobody. Necessary refusals are narrow and stay — ventilator and tracheostomy care (entry 16), diagnosing or prescribing, medical guidance owed to the treating doctor, capabilities a reader would otherwise assume such as cameras or GPS tracking, and the no-affiliation line on hospital names (entry 21).

24. **Prices stay off the site** (2026-08-21, owner — reaffirms entry 9): asked again with the full trade laid out, and the answer is unchanged. `/charges` ranks by explaining *how* pricing works and never publishes a figure. The cost is accepted: some price-shoppers will bounce. The gains are that Z Care and Shine Care cannot undercut a number they cannot see, and a human frames first-day-free and pay-after-the-shift before any figure is spoken. Revisit only as a deliberate decision, never by drift.

25. **`/services` moved off the head term; `/cities/lahore` is gone** (2026-08-21, owner): three pages were competing for "home nurse Lahore" with near-identical descriptions. **`/` keeps the head term.** `/services` now carries the nurse-vs-attendant comparison intent it already answered on the page but never claimed in its title. **`/cities/lahore` 301s to `/`** — with one live city, a "Lahore" page *is* the home page, and the area-hub job the keyword map had earmarked for it went to `/areas` instead. `LIVE_CITIES` is now empty and Lahore is dropped from `generateStaticParams`, so nothing generates or links a redirecting URL. The `/cities` tree stays for a genuine second city.

26. **The home page no longer advertises newborn care** (2026-08-21, owner): the Mother & Baby tile read "Newborn and postnatal support for new mothers" while the page it links to says the caregiver is there for the mother. A visitor clicking through saw the contradiction. The tile now matches the confirmed scope (entry 18). The tiles' WhatsApp-only behaviour is untouched and remains a parked decision — this was a copy fix, not a conversion change.

27. **No caregivers page** (2026-08-21, owner): decided against building one. It targets no search anyone performs, so the SEO value is near zero, and a list of first names on a website is unverifiable — a family gets no more assurance from it than from a stock photo, which is the owner's own reasoning. The trust it was meant to carry is already carried by things a family can check: the caregiver card sent on WhatsApp before the visit with a PNC number they can verify themselves, the verification promise, and real reviews. Effort goes to reviews instead.

28. **GA4 ships without a consent banner** (2026-08-21, owner — conditions on entry 22): defensible where the business is today — a Pakistani company, no EU or UK establishment, ads geo-limited to Lahore. §10's objection to banner clutter wins on the current facts, since a consent bar sits between a frightened person and the phone number. **Two triggers should reopen this, and both are visible in Search Console:** running ads aimed at the overseas segment (Google's own EU User Consent Policy then applies), or `/care-from-abroad` producing meaningful UK/EU traffic (GDPR reaches outside the EU when services are offered to people inside it, and that page targets exactly those families). This is a business judgement, not legal advice, and was taken without one.

29. **Paediatric care is real** (2026-08-21, owner): a PNC-registered nurse does care for an ill child at home — medicines, monitoring, post-operative care. The `QUALIFIED_NURSE_SERVICES.paediatric_care` claim stands and could carry its own page. Note the distinction from entry 18: *clinical nursing for a sick child* is confirmed; *day-to-day care of a healthy newborn* is not, and the two must not blur into each other in copy.

**Standing rule:** this document never carries open questions. When a new one appears, it gets decided with the founder, recorded here with the date, and folded into the body.
