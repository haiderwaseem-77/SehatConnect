# Sehat Connect

Lead-generation and trust-building website for **Sehat Connect** — a home-care service in Lahore, Pakistan providing PNC-registered nurses and trained attendants for 12-hour home shifts (elderly care, post-op, mother & baby, dementia, palliative). Pay after the shift, no advance.

The site has one job: get a worried family member to leave their name + phone — or call / WhatsApp — so a real person calls back and arranges care.

## Documents

- **[`NORTH-STAR.md`](./NORTH-STAR.md)** — the product source of truth: mission, users, page specs, promises, SEO plan, roadmap, Definition of Done. Read this first.
- **[`CLAUDE.md`](./CLAUDE.md)** — operational guide: codebase facts, hard rules, deployment gotchas.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Supabase (lead capture) · Vercel

## Commands

```bash
npm run dev    # local dev
npm run build  # production build
npm run lint   # linting
```

## Deployment

Live at **`https://mysehatconnect.com`** — the final and only domain (non-www apex; `www` 301s to it). Deploy recipe lives in the gitignored local `DEPLOY-ACCESS.md`.
