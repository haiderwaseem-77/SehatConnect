---
name: phone-preview
description: Render this project's UI (the direction-6 HTML mockups in design-explorations-v2/, or the running Next.js app) at real Android phone sizes with web fonts painted, then look at the screenshots, so the design can be judged and polished VISUALLY — not just code-correct. Use whenever the user says things like "show me how this looks on a phone", "screenshot the mockup", "render it on mobile", "check it visually", "is the fold okay on mobile", or otherwise wants to see/verify the Sehat Connect UI on a phone. Scoped to the sehatghar-pk / Sehat Connect repo.
---

# phone-preview

Reliable mobile-visual loop for Sehat Connect. The customer is an older Android user in Lahore on a mid/low-end phone — the design MUST be judged at real phone dimensions, with the real web fonts, not just read as code. This skill renders the page through the **same browser engine Android Chrome uses** and produces screenshots you (Claude) then `Read` and judge.

## When to use
Any request to *see* or *visually verify* the UI on a phone: "how does this look on mobile", "screenshot the mockup", "render direction-6", "check the fold", "does the Urdu look right", before/after a visual change, etc. Default target is the winning mockup `design-explorations-v2/direction-6-combined.html`.

## How to run
From the repo root:

```
node .claude/skills/phone-preview/shoot.mjs [target] [outDir]
```

- `target` (optional): a file path, `file://…`, or `http://localhost:3000/…`. Default = `design-explorations-v2/direction-6-combined.html`. For the live Next.js app, pass `http://localhost:3000/` (a `npm run dev` server is usually already up on port 3000).
- `outDir` (optional): default `./.phone-preview-shots`. For throwaway iteration prefer the session scratchpad dir so the repo stays clean; only save into `design-explorations-v2/shots/` when you want to keep a labelled record (use a clear infix, never overwrite the originals).

It writes:
- `m393-fold.png` + `m393-full.png` — typical mid-range Android (393px CSS, DPR 3)
- `m360-fold.png` + `m360-full.png` — narrow budget Android (360px) — the tightest common case
- `desktop-full.png` — 1280px

**Then `Read` the PNGs and actually look.** That visual judgement is the point of the skill — do not stop at "the script ran."

## Why it's reliable (and the one caveat)
- **Same engine:** Chromium = Blink, the exact engine in Chrome on Android and most Android in-app browsers — the dominant browser for this audience. Layout, CSS, grid/flex, the receipt mask: render identically.
- **Real fonts:** the harness waits for `document.fonts.ready` before shooting, so Plus Jakarta Sans / Fraunces / Noto Nastaliq Urdu paint exactly as on-device (no FOUT fallback in the shot).
- **Real phone metrics:** 393 + 360 CSS widths at DPR 3, mobile UA, `isMobile`/`hasTouch`.
- **Fold honesty:** the `-fold` shots use a conservative **720px** viewport height to mimic real mobile Chrome with its address bar showing — so the fold you see is the *tightest* real case, not a generous one.
- **Caveat — what it does NOT show:** touch feel, scroll momentum, low-end-Android animation jank, and device notch/safe-area padding. These are not visual-layout issues. For "how it looks / what fits," treat the output as ~95% representative of a real Android Chrome user.

## Hard constraints to check in every render (product law — see CLAUDE.md)
- Mobile-first correct at 390px (and not broken at 360px). Body ≥18px; nothing important <16px; tap targets ≥56px; high-contrast dark-teal on cream, no faint grey.
- Name + Phone reach the fold with minimal scroll; sticky bar (Call / WhatsApp / Get-a-call) never permanently covers a field.
- Locked palette (cream #FBF8F2 / teal #0D7A6E / dark teal #0A2E2B / gold #C9A24B); heartbeat motif + 8px accent bar intact; Urdu in Noto Nastaliq.

## Gotchas
- Paths self-discover (newest cached Chromium, the Playwright in the npx cache). If discovery ever fails, override with `PW_MODULE=/abs/playwright/index.js` and/or `PW_CHROME=/abs/chrome`.
- `StickyActionBar` in the Next.js app is mobile-only via `md:hidden` but its inline `display:grid` outranks it — there's a `!important` desktop-hide in `app/globals.css`. Watch for that leaking onto the 1280px shot.
- See also the `ui-screenshot-recipe` memory for the lower-level details this skill wraps.
