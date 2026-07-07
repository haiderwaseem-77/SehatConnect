# Sehat Connect — Redesign Brief v2 (clean-room)

> **STATUS (2026-07-01): HISTORICAL.** This brief did its job — direction-6 (a hybrid of the 5 concepts below) won, was polished (`AUDIT-direction-6.md`), and is live in the Next.js app. Product strategy now lives in **`/NORTH-STAR.md`**; where this brief and it disagree, NORTH-STAR wins. The v1 `design-explorations/` folder it references has been deleted. Kept for design-history reference only.

> Input pack for a fresh Hallmark run. The goal is **5 genuinely different structural directions**, not 5 re-skins. Read "Why v1 failed" before generating anything.

---

## Why v1 (design-explorations/) failed — do not repeat

The three v1 directions (A editorial, B minimal, C atmospheric) **share one skeleton with each other and with the old live site**: identical section order, identical hero copy ("A trusted nurse or caregiver, right at your home" — verbatim from the live site), identical call-back card with Call/WhatsApp/Get-a-call tabs, identical How-It-Works 01/02/03, identical Services toggle, identical FAQ. They differ only in font + colour. That's a re-skin.

**Root cause:** the generator anchored on the existing Next.js components + old live screenshots as scaffolding. The North Star text was clean; the *structure* was inherited from the contaminated UI.

## Clean-room rules for v2 (mandatory)

1. **Do NOT read** `app/`, `components/`, the old `design-explorations/`, or `shots-live/`. No existing component, section order, or headline may be reused as a starting point.
2. Build each direction's **information architecture from scratch** from this brief only.
3. The **only** inputs are: this brief, the locked brand assets (`design/Sehat Connect Logo.jpg`, `design/Sehat Connect Visiting Card Standalone.html`), and the Content Pack below.
4. Each direction must have a **different IA, hero concept, and emotional metaphor** — see the 5 concepts. If two directions could swap section orders without anyone noticing, they have failed.

---

## Locked brand (MUST be shared — this is correct convergence)

From the visiting card + logo (the only finalized visual assets):

- **Palette:** warm cream `#FBF8F2` · teal `#0D7A6E` · dark teal `#0A2E2B`. High contrast, warm-not-clinical.
- **Type:** Plus Jakarta Sans is the brand face. Display type may vary per direction *within* a warm, readable feel; Urdu always Noto Nastaliq Urdu.
- **Motif:** heartbeat/pulse waveform line; 8px teal accent bar; minimal geometric, clean line work.
- **Tone:** professional, trustworthy, warm. Not clinical/cold, not decorative/loud.

## Shared product DNA (MUST be shared — from the North Star)

- Mobile-first, correct at **390px single column** before desktop.
- **One page, one action:** everything funnels to "we'll call you" + Call + WhatsApp. No browsing, accounts, calendars, or marketplace.
- Form asks **Name + Phone only**; "who needs care?" optional, **tap-not-type** chips.
- **Call + WhatsApp reachable everywhere** — header button + sticky mobile bar. Numbers from the Content Pack, never hardcoded elsewhere.
- Body **≥18px**, nothing important <16px, tap targets **≥56px**, dark-teal text on cream (no faint grey).
- **Trust via specifics**, not icon-claims: real prices, pay-after/no-advance, PNC, CNIC & references checked, female-for-female, 24/7.
- **Bilingual-ready:** every string has an Urdu counterpart in Noto Nastaliq.
- **No false promises:** no GPS, no live "Available" roster, no customer dashboard, no unguaranteed response times.
- Fast on a mid-range Android on patchy data.

## Free-to-diverge axes (where the 5 MUST differ)

Information architecture & section order · hero composition & concept · the emotional metaphor / which of the 5 fears it leads with · layout system (photography vs chat vs editorial vs app-utility vs timeline) · how the form/CTA is framed · imagery vs icons · motion.

**The 5 family fears to defuse:** (1) is this a scam? (2) will a safe, verified, often-female person come into my home? (3) can they do the medical task? (4) what will it cost? (5) can I just talk to a human?

---

## Content Pack (verbatim — generators use THIS, not the live components)

**Brand:** Sehat Connect · Lahore · 24/7
**Contact:** display `0328-8489988` · tel `+923288489988` · WhatsApp `923288489988`
**Prices:** Qualified Nurse **Rs 4,000 / 12-hr shift** · Attendant **Rs 3,000 / 12-hr shift** · **Pay after the shift, no advance.**

**Qualified Nurse services** (label · Urdu · what it is):
- Post-op Care · آپریشن کے بعد دیکھ بھال · wound care, dressing changes, recovery support after surgery
- Elderly Care · بزرگوں کی دیکھ بھال · medicines, movement, day-to-day health monitoring
- Paediatric Care · بچوں کی دیکھ بھال · nursing care for newborns, infants, young children
- ICU Step-down · آئی سی یو کے بعد · care for patients home after ICU/HDU
- Night Duty · رات کی ڈیوٹی · a nurse stays through the night to monitor and care
- Diabetic Care · ذیابیطس کی دیکھ بھال · blood sugar checks, insulin, diet guidance
- Mother & Baby Care · ماں اور بچے کی دیکھ بھال · newborn + postnatal support for new mothers
- Dementia & Alzheimer's Care · ڈیمنشیا کی دیکھ بھال · routine, safety, companionship
- Palliative & Long-term Care · آرام دہ نگہداشت · comfort-focused nursing, pain & symptom management

**Attendant services:** Elderly Care · Paediatric Care · Night Duty (non-clinical: feeding, hygiene, movement, comfort).

**Trust facts (use as specifics):** Every Qualified Nurse is **PNC (Pakistan Nursing Council) registered**, verified by our team · Attendants background-verified · **CNIC & references checked** · **female nurse/attendant on request** (female-for-female) · cancel/reschedule free up to 4 hrs before · cash on visit (Easypaisa/JazzCash coming) · we serve all Lahore (DHA, Gulberg, Johar Town, Model Town, Bahria Town, Cantt…).

**FAQ themes:** PNC registration · request same nurse again · nurse vs attendant · how to pay · cancel/reschedule · coverage area · female nurse · what if late. (Full copy in `lib/constants.ts` FAQ_ITEMS.)

---

## The 5 structural concepts

Each is a *different building*, not a different paint colour.

### 1 — "Who's Coming In"  (human / portrait-led)
- **Leads with fear:** #2 who enters my home (+ #1 scam).
- **Hero:** a single large, calm caregiver portrait + one promise line + floating verified badges + one giant CTA. The pre-visit caregiver profile turned into the homepage.
- **IA:** portrait hero → "This is who comes to you" verified-person card (photo · name · PNC# · CNIC checked · female-for-female) → thin proof strip (prices · pay-after) → how we match you (3 calm steps) → testimonials with face/name/area → form.
- **Metaphor:** meeting the person before you let them in.
- **Signature element:** the verified-person card. Photography-led throughout.
- **Risk:** needs real photos; mock with placeholder portraits.

### 2 — "Just Say Hello"  (conversational / WhatsApp-native)
- **Leads with fear:** #5 can I just talk to a human (+ form-allergy).
- **Hero:** the start of a WhatsApp-style chat — an incoming Roman-Urdu greeting bubble + reassuring replies, big "Continue on WhatsApp" + "Call now". Form reframed as "send us a message."
- **IA:** chat-thread hero → the 5 fears answered as a flowing exchange (worry = grey bubble, our reply = teal bubble carrying a *specific fact*: price, PNC, female option) → services as quick-reply chips → "leave your number, we'll message you" → footer.
- **Metaphor:** you're already in a conversation; no scary website.
- **Signature element:** the fear→reassurance chat exchange.
- **Risk:** must not imply a fake live chat — it's a layout metaphor; CTAs go to the real WhatsApp/phone.

### 3 — "Nothing Hidden"  (open-ledger / radical transparency)
- **Leads with fear:** #1 scam (+ #4 cost).
- **Hero:** blunt honest statement with the price right there — no marketing fluff. "A nurse at home. Rs 4,000 for 12 hours. Pay after the shift. No advance."
- **IA:** blunt headline+price → itemized receipt: "exactly what you get / exactly what we check / exactly what you pay" → who we are (real founder note) → testimonials name+area → form. Document-like, editorial.
- **Metaphor:** an honest receipt; we hide nothing.
- **Signature element:** the itemized get/check/pay ledger with tabular figures.
- **Risk:** can read cold — warm it with the founder note + plain language.

### 4 — "Name. Number. Done."  (single-screen utility / action-first)
- **Leads with fear:** overwhelm / form-allergy — the least patient, most stressed user.
- **Hero:** the whole decision on one screen — one reassurance line + the Name+Phone form (and Call/WhatsApp) immediately, one thin trust line beneath. No scroll needed to act.
- **IA:** action-first hero (the form *is* the hero) → everything else behind tidy "Show more" disclosures: prices · services · how it works · FAQ. App-like, fast.
- **Metaphor:** zero effort, act in 10 seconds.
- **Signature element:** complete above-the-fold conversion + progressive disclosure.
- **Risk:** must still carry one strong trust specific above the fold.

### 5 — "From Worry to Relief"  (guided narrative path)
- **Leads with fear:** #3 can they do the medical task (+ overall anxiety), answered in sequence.
- **Hero:** names the worry and promises a calm walk. "Worried about caring for someone at home? Let's walk through it together."
- **IA:** one vertical guided spine; each station answers ONE fear in emotional order — scam → license & pay-after · who comes → verified + female option · the medical task → PNC nurse + services · cost → Rs 4,000, pay after · talk to a person → call/WhatsApp — ending at the form. A connected timeline threads the whole page.
- **Metaphor:** taken by the hand from anxiety to calm.
- **Signature element:** the connected worry→relief spine; cream→soft-teal descent.
- **Risk:** longer scroll — keep the CTA/sticky bar present throughout.

---

## Generation plan (after you approve the 5)

1. Hallmark builds each as a **standalone static HTML mockup** (no Next.js), clean-room inputs only.
2. Render **mobile + desktop** screenshots per direction.
3. You pick **one** winner (or a hybrid).
4. *Only then* do we build the winner into the real Next.js app.
