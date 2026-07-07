// No metadata export here — app/book/page.tsx's own `metadata` export wins for
// this route (page-level overrides layout-level on conflicting fields), so a
// second export here was dead weight.
export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
