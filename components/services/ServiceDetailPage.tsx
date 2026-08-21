// Direction-6 service detail page shell — shared by
// /services/qualified-nurse and /services/attendant.
// Renders inside LandingRoot so it inherits d6 typography, background and the
// اردو toggle. Server component: accepts a JSON-LD node to inject.
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import CtaBanner from "@/components/home/CtaBanner";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/constants";
import { waLink, serviceWaMsg } from "@/lib/wa";

type Service = {
  id: string;
  label: string;
  urdu: string;
  description: string;
  descriptionUrdu: string;
};

interface Bilingual {
  en: string;
  ur: string;
}

interface Props {
  role: string;
  roleUrdu: string;
  badge: Bilingual;
  category: "qualified_nurse" | "attendant";
  intro: Bilingual;
  gridHeading: Bilingual;
  /** Role-specific lead only (e.g. "Every nurse is PNC registered."). The shared
   *  verification promise + CTA tail is appended by the shell — don't repeat it here. */
  gridSub?: Bilingual;
  services: Service[];
  /** Prefixed onto each service label in the WhatsApp prefill (e.g. "an Attendant for "). */
  waPrefix?: string;
  jsonLd: object;
  /** BreadcrumbList JSON-LD, built with breadcrumbList() from lib/schema. */
  breadcrumbs?: object;
  /** Optional extra section rendered between the grid and the closing CTA. */
  extra?: ReactNode;
}

// Shared across both routes so the verbatim verification promise (NORTH-STAR §3)
// lives in one place and each route only supplies its role-specific lead.
const VERIFY_TAIL: Bilingual = {
  en: "CNIC checked, references called, police-verified. Tap WhatsApp or ask us to call you back.",
  ur: "شناختی کارڈ اور حوالہ جات چیک ہو جاتے ہیں، اور پولیس تصدیق بھی ہو جاتی ہے۔ واٹس ایپ کریں یا واپس کال کی درخواست دیں۔",
};

const CARD: CSSProperties = {
  background: "var(--paper)",
  border: "1px solid var(--line)",
  borderRadius: 18,
  padding: "22px 20px",
  boxShadow: "var(--shadow-sm)",
  display: "flex",
  flexDirection: "column",
};

function WaMini() {
  return (
    <span
      style={{
        width: 30,
        height: 30,
        borderRadius: 9,
        background: "rgba(31,168,85,.12)",
        display: "grid",
        placeItems: "center",
        flex: "none",
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "var(--wa)" }}>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Z" />
      </svg>
    </span>
  );
}

export default function ServiceDetailPage({
  role,
  roleUrdu,
  badge,
  category,
  intro,
  gridHeading,
  gridSub,
  services,
  waPrefix = "",
  jsonLd,
  breadcrumbs,
  extra,
}: Props) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {breadcrumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
      )}
      <LandingRoot>
        <Navbar />
        <main className="flex-1">
          {/* ---- intro hero ---- */}
          <section className="block" style={{ paddingBottom: 26 }}>
            <div className="wrap">
              <span className="eyebrow">
                <span data-en>{badge.en}</span>
                <span data-ur className="urdu">{badge.ur}</span>
              </span>
              <div className="sec-head" style={{ marginTop: 14, marginBottom: 22 }}>
                {/* The page's H1. This was an <h2>, leaving /services/qualified-nurse
                    and /services/attendant — both priority-0.9 SEO pages — with no
                    H1 at all. `role` already carries each page's primary phrase. */}
                <h1>
                  <span data-en>{role}</span>
                  <span data-ur className="urdu">{roleUrdu}</span>
                </h1>
                <p>
                  <span data-en>{intro.en}</span>
                  <span data-ur className="urdu">{intro.ur}</span>
                </p>
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "var(--teal-deep)",
                  letterSpacing: "-.01em",
                }}
              >
                <span data-en>First day free &middot; No advance &middot; Pay after the shift</span>
                <span data-ur className="urdu">پہلا دن مفت &middot; پیشگی ادائیگی نہیں &middot; ادائیگی شفٹ کے بعد</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
                <a
                  className="btn btn-wa"
                  href={waLink(serviceWaMsg(role))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="wadot" />
                  <span data-en>WhatsApp us</span>
                  <span data-ur className="urdu">واٹس ایپ کریں</span>
                </a>
                <a className="btn btn-call" href={`tel:${CONTACT_PHONE_TEL}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                  <span data-en>Call {CONTACT_PHONE_DISPLAY}</span>
                  <span data-ur className="urdu">کال کریں <bdi dir="ltr">{CONTACT_PHONE_DISPLAY}</bdi></span>
                </a>
              </div>
            </div>
          </section>

          {/* ---- services grid ---- */}
          <section className="block" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="sec-head" style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: "clamp(22px,5vw,30px)" }}>
                  <span data-en>{gridHeading.en}</span>
                  <span data-ur className="urdu">{gridHeading.ur}</span>
                </h2>
                {gridSub && (
                  <p>
                    <span data-en>{gridSub.en} {VERIFY_TAIL.en}</span>
                    <span data-ur className="urdu">{gridSub.ur} {VERIFY_TAIL.ur}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((s) => (
                  <div key={s.id} style={CARD}>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--ink)", lineHeight: 1.25 }}>
                      <span data-en>{s.label}</span>{" "}
                      <span data-ur className="urdu" style={{ fontSize: 15, color: "var(--teal-deep)", fontWeight: 600, marginRight: 6 }}>
                        {s.urdu}
                      </span>
                    </h3>
                    <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.5, marginTop: 8, fontWeight: 500, flex: 1 }}>
                      <span data-en>{s.description}</span>
                      <span data-ur className="urdu">{s.descriptionUrdu}</span>
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: 16 }}>
                      <a
                        href={waLink(serviceWaMsg(`${waPrefix}${s.label}`))}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 9,
                          minHeight: 44,
                          padding: "0 14px",
                          borderRadius: 12,
                          border: "1.5px solid var(--line)",
                          background: "var(--cream)",
                          fontSize: 15.5,
                          fontWeight: 700,
                          color: "var(--ink)",
                        }}
                        className="hover:!border-[color:var(--wa)] focus-visible:!border-[color:var(--wa)] transition-colors"
                      >
                        <WaMini />
                        <span data-en>WhatsApp</span>
                        <span data-ur className="urdu">واٹس ایپ</span>
                      </a>
                      <Link
                        href={`/book?service=${s.id}&category=${category}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          minHeight: 44,
                          fontSize: 15.5,
                          fontWeight: 800,
                          color: "var(--teal-deep)",
                        }}
                      >
                        <span data-en>Call me back →</span>
                        <span data-ur className="urdu">واپس کال منگوائیں ←</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {extra}

          <CtaBanner />
          <div className="seam-gold" aria-hidden="true" />
        </main>
        <Footer />
      </LandingRoot>
    </>
  );
}
