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
| `/about` | Sehat Connect founder / brand | who runs Sehat Connect | — | service terms |
| `/book` | request a call back | — | — | everything (conversion page) |

---

## Planned pages

Ordered by expected value. URLs follow the existing short-slug pattern under
`/services/` — do not switch to keyword-stuffed slugs; mixing the two looks
unmaintained and gains nothing Google needs.

| URL | Primary phrase | Roman Urdu | Status |
|---|---|---|---|
| `/services/long-term-care` | long term care at home Lahore · palliative care at home | lambi bimari ki dekh bhaal | **Gap** — sold on the home page, no page exists |
| `/guides/nurse-or-attendant` | difference between nurse and attendant | — | Group A article |
| `/guides/post-operative-care-checklist` | post operative care checklist | — | Group A article |
| `/guides/elderly-care-at-home` | elderly care at home what to expect | — | Group A article |
| `/care-from-abroad` | nurse for parents in Lahore from UK/UAE/USA | bahar se walidain ki dekh bhaal | Blocked — need to know how overseas families pay |
| `/services/female-nurse` | female nurse at home Lahore | female nurse ghar par | Blocked — confirm roster |
| `/services/male-nurse` | male nurse at home Lahore | male nurse ghar par | Blocked — confirm roster |
| `/services/mother-baby-care` | postnatal care at home Lahore · baby care nurse Lahore | zachgi ke baad dekh bhaal | Blocked — need scope |
| `/services/physiotherapy` | physiotherapy at home Lahore | ghar par physiotherapy | Decision — contractor framing (Ledger #15) |
| `/areas/<slug>` | home nurse in DHA / Gulberg / Johar Town | — | Decision — 3 or 7 |

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
