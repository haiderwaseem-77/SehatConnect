# Project Instructions

## Deployment After App Commits

- Deploy only when Codex creates a commit that changes the live app: application code,
  public assets used by the app, runtime configuration, dependencies, routes, metadata,
  styles, or other user-facing behavior.
- Do not deploy for documentation-only, screenshot-only, local workflow/tooling-only,
  AGENTS/instruction-only, or other non-app commits.
- Current live URL: https://lucaintel.com
- Vercel project/account: `lucaintel` on `lucaagent000`.
- Use the repo-local deploy recipe in `DEPLOY-ACCESS.md` for access details. That file is local-only and must not be committed.
- Production deploy command: `npx vercel deploy --prod`
