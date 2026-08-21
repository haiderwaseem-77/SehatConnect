# Keyword and page map

One row per page: what it targets, what it must **not** target, and the Roman Urdu
variant. The point of this document is not to collect keywords — it is to make sure
**no two pages compete for the same phrase.** When two pages chase one term, Google
picks one and often picks the wrong one; both rank worse than a single page would.

**On the numbers:** there is no keyword tool in this project, so nothing here is a
measured search volume. Priorities are directional, based on how this category
behaves in Pakistan. Validate against Google autocomplete and People-also-ask
*from a Lahore location* before betting a week of work on any single phrase.

---

## The problem this map found first

Three pages currently target the same head term:

| Page | Current title |
|---|---|
| `/` | Sehat Connect \| **Home Nursing Service in Lahore** \| Nurse at Home |
| `/services` | **Home Nursing Services in Lahore** \| Nurse & Attendant |
| `/cities/lahore` | **Nurse or Attendant at Home in Lahore** |

Their meta descriptions are near-identical too — all three lead with "nurses and
attendants at home in Lahore". And because **Lahore is the only live city**,
`/cities/lahore` is close to a straight duplicate of the home page.

This is the most valuable fix on the list, and it costs almost nothing.

### Recommended split

- **`/` owns the head terms.** "home nurse Lahore", "nurse at home Lahore",
  "home nursing service Lahore". It has the most authority and the strongest
  conversion path, so it should win these outright. No change needed.

- **`/services` stops competing and owns the comparison.** Its actual content is
  already a nurse-vs-attendant comparison table — the title just doesn't say so.
  Retitle toward "which one do I need" intent: *Nurse or Attendant at Home in
  Lahore — Which One You Need*. That intent is genuinely distinct, well-searched,
  and the page already answers it.

- **`/cities/lahore` becomes the area hub.** Right now it duplicates `/`. Give it
  a job no other page has: listing and linking the areas served — DHA, Gulberg,
  Johar Town, Model Town, Cantt, Bahria Town — and become the parent of the area
  pages when those ship. If the area pages are never built, 301 it to `/` instead;
  a near-duplicate of the home page is worth less than nothing.

---

## Live pages

| URL | Primary phrase | Also targets | Roman Urdu | Must NOT target |
|---|---|---|---|---|
| `/` | home nurse Lahore | nurse at home Lahore · home nursing service Lahore · 24 hour nurse Lahore | ghar par nurse Lahore | charges, individual services |
| `/services` | nurse or attendant Lahore | difference between nurse and attendant · which one do I need | nurse ya attendant | the bare head term (see above) |
| `/services/qualified-nurse` | qualified nurse at home Lahore | PNC registered nurse Lahore · trained nurse home visit | PNC nurse ghar par | attendant terms |
| `/services/attendant` | patient attendant Lahore | attendant for patient at home · ward boy at home Lahore | mareez ka attendant | nurse/clinical terms |
| `/services/injection-drip` | drip at home Lahore | injection at home Lahore · IV drip at home · nurse visit for injection | ghar par drip lagwana · ghar par injection | shift-only framing |
| `/services/post-operative-care` | post operative care at home Lahore | post surgery care Lahore · wound dressing at home Lahore · care after discharge | operation ke baad dekh bhaal | ICU/ventilator terms |
| `/services/elderly-care` | elderly care at home Lahore | old age care Lahore · 24 hour attendant for elderly · dementia care at home | buzurgon ki dekh bhaal | clinical nursing terms |
| `/charges` | home nurse charges Lahore | nurse rate Lahore · attendant price Lahore · home nursing cost | nurse ka kharcha | a published number (Ledger #9) |
| `/services/long-term-care` | long term care at home Lahore | palliative care at home · bedridden patient care · permanent attendant Lahore | lambi bimari ki dekh bhaal | pain/symptom management (clinical) |
| `/services/female-nurse` | female nurse at home Lahore | female nurse for female patient · lady nurse Lahore | female nurse ghar par | anything implying different clinical scope by gender |
| `/services/male-nurse` | male nurse at home Lahore | male nurse for male patient · attendant for lifting | male nurse ghar par | as above |
| `/services/mother-baby-care` | postnatal care at home Lahore | care after delivery at home · nurse after C-section | zachgi ke baad dekh bhaal | **baby care nurse Lahore** · newborn/neonatal terms — scope is the mother (Ledger, 2026-08-21) |
| `/care-from-abroad` | nurse for parents in Lahore from abroad | home care for parents in Pakistan from UK / USA / UAE / Canada | bahar se walidain ki dekh bhaal | named payment rails, monitoring/cameras |
| `/guides` + `/guides/<slug>` | informational, per guide | — | — | service/transactional terms |
| `/areas` + `/areas/<slug>` | home nurse in DHA / Gulberg / Johar Town | attendant in <area> | — | hospital names in title/H1/meta |
| `/about` | Sehat Connect founder / brand | who runs Sehat Connect | — | service terms |
| `/book` | request a call back | — | — | everything (conversion page) |

---

## Planned pages

URLs follow the existing short-slug pattern under `/services/` — do not switch to
keyword-stuffed slugs; mixing the two looks unmaintained and gains nothing Google
needs.

| URL | Primary phrase | Roman Urdu | Status |
|---|---|---|---|
| `/services/physiotherapy` | physiotherapy at home Lahore | ghar par physiotherapy | **Decision needed** — not confirmed in-house, may be a contractor (Ledger #15). Build only with "we arrange a physiotherapist" framing, never "we employ" |
| `/areas/model-town`, `/areas/cantt`, `/areas/bahria-town`, `/areas/wapda-town` | home nurse in <area> Lahore | — | **Deliberately not built.** Three areas ship first; a fourth is earned by passing the swap test in rule 5, ideally with a real review from that area to quote |
| `/services/paediatric-care` | nursing care for children at home Lahore | bachon ki nursing | **Scope unconfirmed.** `QUALIFIED_NURSE_SERVICES.paediatric_care` currently claims "newborns, infants and young children" — verify what is actually delivered before writing a page on it |
| `/guides/verify-pnc-registration` | how to check a nurse's PNC registration | — | Blocked — needs the real PNC portal walked and screenshotted |

### Article URLs

Use **`/guides/<slug>`**, not `/blog/`. NORTH-STAR §12 already calls these
"guides" and caps them at roughly one a month, written from real ops experience.
"Blog" signals volume publishing, which is the opposite of the intent, and thin
guide pages would damage exactly the trust the rest of the site is built on.

---

## Rules for whoever writes the next page

1. **One page, one primary phrase.** Before adding a page, find its row here. If
   the phrase already belongs to another page, improve that page instead.
2. **The primary phrase goes in the title, the H1 and the first 100 words** — once
   each, phrased the way a person would say it. No stuffing.
3. **Every page carries at least one natural Roman Urdu phrase**, in a heading or
   an FAQ. A large share of this audience searches that way, and no competitor
   writes for it.
4. **Never target a term the business cannot deliver.** Ventilator and
   tracheostomy care (Ledger #16) and anything implying an employed
   physiotherapist (Ledger #15) are off-limits regardless of search volume.
5. **Areas are earned, not claimed.** An area page must say something true only of
   that area — the hospitals nearby, typical requests, a real review from there.
   If two area pages could swap names and still read correctly, they are not done
   and Google will treat them as doorway pages.
