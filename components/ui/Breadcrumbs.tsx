import Link from "next/link";
import type { Crumb } from "@/lib/schema";

/**
 * The visible breadcrumb trail.
 *
 * The site already emitted BreadcrumbList JSON-LD on every page, but had no
 * breadcrumb UI. That gap mattered once the page tree went three levels deep
 * (/services/injection-drip, /areas/dha, /guides/…): someone arriving from a
 * search result landed with no way up, and Google's guidance is to render the
 * trail as well as mark it up.
 *
 * Pass the SAME array you pass to breadcrumbList(), so the visible trail and the
 * structured data can never disagree — a mismatch between them is worse than
 * having neither. "Home" is prepended here exactly as it is there.
 *
 * The last crumb is the current page: rendered as plain text, not a link, and
 * marked aria-current so a screen reader announces the position rather than
 * offering a link to where the user already is.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ name: "Home", nameUr: "ہوم", path: "" }, ...items];

  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          const label = (
            <>
              <span data-en>{crumb.name}</span>
              <span data-ur lang="ur" dir="rtl" className="urdu">{crumb.nameUr}</span>
            </>
          );
          return (
            <li key={`${crumb.name}-${i}`}>
              {isLast ? (
                <span aria-current="page">{label}</span>
              ) : (
                <Link href={crumb.path || "/"}>{label}</Link>
              )}
              {!isLast && (
                <span className="crumb-sep" aria-hidden="true">
                  &rsaquo;
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
