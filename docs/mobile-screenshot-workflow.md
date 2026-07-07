# Mobile Screenshot Workflow

Use this pass when visual-reviewing the live Lucaintel mobile experience.

1. Commit and deploy source changes first.
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
