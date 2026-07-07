# Mobile Screenshot Workflow

Use this pass when visual-reviewing the live Lucaintel mobile experience.

1. If app code, app assets, routes, styles, runtime config, dependencies, metadata,
   or other user-facing behavior changed, commit and deploy that app change first.
   Documentation-only, screenshot-only, and local workflow/tooling-only commits do
   not need a deploy.
2. Run:

```bash
npm run screenshots:live
```

3. Review the ignored output folder:

```text
screenshots/lucaintel-<date>-mobile/representative
```

Screenshots stay local. The repo ignores `/screenshots/`, so visual QA artifacts should not be committed.

The repo command delegates to the reusable `$mobile-app-screenshots` skill and captures the standard Lucaintel public routes: home, services, qualified nurse, attendant, cities, Lahore, about, and book.
