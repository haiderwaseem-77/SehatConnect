// Shared section-header accent — the brand ECG / heartbeat motif rendered as a
// single inline SVG so every home section's header uses ONE implementation (no
// copy-paste drift). Styles + the scroll draw-in live in app/direction6.css
// under `.d6-pulse-accent`. `pathLength={1}` normalises the stroke length so the
// stroke-dashoffset draw-in is uniform regardless of the path's real length.
//
// tone="cream" swaps the stroke to a light variant so the accent reads on the
// dark teal band (CtaBanner). Server component — no client JS.
export default function PulseAccent({
  tone = "brand",
  className,
}: {
  tone?: "brand" | "cream";
  className?: string;
}) {
  const cls = ["d6-pulse-accent", tone === "cream" ? "is-cream" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <svg className={cls} viewBox="0 0 64 20" fill="none" aria-hidden="true">
      <path pathLength={1} d="M1 10 H21 L26 4 L31 16 L35 10 H43 L46 6.5 L49 10 H63" />
      <circle className="d6-pulse-accent-node" cx="1" cy="10" r="2.6" />
    </svg>
  );
}
