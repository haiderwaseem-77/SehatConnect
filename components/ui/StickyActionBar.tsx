// Direction-6 sticky mobile action bar — Call / WhatsApp / Get a call.
// Ported from design-explorations-v2/direction-6-combined.html
import Link from "next/link";
import { CONTACT_PHONE_TEL } from "@/lib/constants";
import { waLink, GENERIC_WA_MSG } from "@/lib/wa";

export default function StickyActionBar() {
  return (
    <nav className="sticky-bar" aria-label="Quick contact">
      <a className="s-call" href={`tel:${CONTACT_PHONE_TEL}`}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
        Call
      </a>
      <a className="s-wa" href={waLink(GENERIC_WA_MSG)} target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.52 0-3-.41-4.3-1.18l-.31-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.25-8.23 4.55 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.25 8.24Z" />
        </svg>
        WhatsApp
      </a>
      <Link className="s-cta" href="/#get-call">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h4l2-6 4 12 2-6h6" />
        </svg>
        Get a call
      </Link>
    </nav>
  );
}
