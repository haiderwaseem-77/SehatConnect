# Project Instructions

## Deployment After App Commits

- Deploy only when Codex creates a commit that changes the live app: application code,
  public assets used by the app, runtime configuration, dependencies, routes, metadata,
  styles, or other user-facing behavior.
- Do not deploy for documentation-only, screenshot-only, local workflow/tooling-only,
  AGENTS/instruction-only, or other non-app commits.
- Current live URL: https://mysehatconnect.com (non-www apex — the final and only host; `www` 301s to it).
- Vercel project/account: `lucaintel` on `lucaagent000`. **The Vercel project still carries a legacy
  name** — the project was created before the brand domain was settled. The *site* is
  mysehatconnect.com; `lucaintel` here is only the Vercel project slug. Renaming the project is a
  separate real-world action for the owner, so keep this slug accurate until they do it.
- Use the repo-local deploy recipe in `DEPLOY-ACCESS.md` for access details. That file is local-only and must not be committed.
- Production deploy command: `npx vercel deploy --prod`

## Direct Deployment Checklist

Use this checklist for future app commits so deployment is direct and repeatable:

1. Check the tree: `git --no-optional-locks status --short`.
2. Run verification before committing:
   - `npm run lint`
   - `npm run build`
3. If `npm run build` fails only because `next/font` cannot fetch Google Fonts in the sandbox, rerun the same build with network escalation. Do not treat that as a code failure unless the escalated build also fails.
4. Commit only the intended files with a clear message.
5. Deploy the committed app change with `npx vercel deploy --prod`. This command needs network access and may require escalation in Codex.
6. Confirm Vercel reports `readyState: READY`, `target: production`, and an alias for `https://mysehatconnect.com`.
7. Verify the live site responds: `curl -I https://mysehatconnect.com` should return `HTTP/2 200`.
8. Finish with `git --no-optional-locks status --short` and report any remaining local changes.
