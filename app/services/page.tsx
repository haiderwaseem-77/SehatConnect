import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import CtaBanner from "@/components/home/CtaBanner";
import {
  QUALIFIED_NURSE_SERVICES,
  ATTENDANT_SERVICES,
  PRICES,
  SITE_URL,
  CONTACT_PHONE_TEL,
  WHATSAPP_NUMBER,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Home Nursing Services in Lahore | Qualified Nurse & Attendant | Sehat Connect",
  description:
    "Post-operative care, elderly care, paediatric care, diabetic care and more — provided by PNC-registered nurses and trained attendants at your home in Lahore. Book now.",
  alternates: { canonical: `${SITE_URL}/services` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Sehat Connect — Home Nursing Services in Lahore",
  url: `${SITE_URL}/services`,
  telephone: CONTACT_PHONE_TEL,
  areaServed: { "@type": "City", name: "Lahore" },
  priceRange: `Rs. ${PRICES.attendant.toLocaleString()} - Rs. ${PRICES.qualified_nurse.toLocaleString()} per shift`,
  sameAs: [`https://wa.me/${WHATSAPP_NUMBER}`],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home care services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "MedicalTherapy", name: "Qualified Nurse at Home" },
        price: PRICES.qualified_nurse,
        priceCurrency: "PKR",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Patient Attendant at Home" },
        price: PRICES.attendant,
        priceCurrency: "PKR",
      },
    ],
  },
};

const CATEGORIES = [
  {
    cat: "qualified_nurse" as const,
    title: "Qualified Nurse",
    titleUr: "کوالیفائیڈ نرس",
    href: "/services/qualified-nurse",
    price: PRICES.qualified_nurse,
    badge: { en: "PNC Registered", ur: "پی این سی رجسٹرڈ" },
    desc: {
      en: "PNC-registered nurses for clinical home care — wound dressing, IV therapy, injections, medication and monitoring.",
      ur: "طبی نگہداشت کے لیے پی این سی رجسٹرڈ نرسیں — زخم کی ڈریسنگ، ڈرپ، انجیکشن، ادویات اور نگرانی۔",
    },
    services: QUALIFIED_NURSE_SERVICES,
  },
  {
    cat: "attendant" as const,
    title: "Attendant",
    titleUr: "اٹینڈنٹ",
    href: "/services/attendant",
    price: PRICES.attendant,
    badge: { en: "Trained & Verified", ur: "تربیت یافتہ و تصدیق شدہ" },
    desc: {
      en: "Trained, verified attendants for non-clinical care — feeding, hygiene, movement, companionship and overnight duty.",
      ur: "غیر طبی نگہداشت کے لیے تربیت یافتہ، تصدیق شدہ اٹینڈنٹ — کھانا، صفائی، نقل و حرکت، رفاقت اور رات کی ڈیوٹی۔",
    },
    services: ATTENDANT_SERVICES,
  },
];

// nurse-vs-attendant comparison (preserved from the original page)
const COMPARE: [string, boolean | string, boolean | string][] = [
  ["PNC registered", true, false],
  ["Wound dressing / IV care", true, false],
  ["Injections & medication", true, false],
  ["Vitals monitoring", true, false],
  ["Personal hygiene support", true, true],
  ["Feeding assistance", true, true],
  ["Companionship / support", true, true],
  ["Overnight duty", true, true],
  ["Price per shift", `Rs ${PRICES.qualified_nurse.toLocaleString()}`, `Rs ${PRICES.attendant.toLocaleString()}`],
];

const CARD: CSSProperties = {
  background: "var(--paper)",
  border: "1px solid var(--line)",
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "var(--shadow-sm)",
  display: "flex",
  flexDirection: "column",
};

function Cell({ v }: { v: boolean | string }) {
  if (typeof v === "string") {
    return <span style={{ fontWeight: 800, color: "var(--teal-deep)", fontVariantNumeric: "tabular-nums" }}>{v}</span>;
  }
  return v ? (
    <span style={{ color: "var(--teal)", fontWeight: 800 }} aria-label="Yes">✓</span>
  ) : (
    <span style={{ color: "#B3261E", fontWeight: 700 }} aria-label="No">✕</span>
  );
}

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LandingRoot>
        <Navbar />
        <main className="flex-1">
          {/* ---- intro ---- */}
          <section className="block" style={{ paddingBottom: 30 }}>
            <div className="wrap">
              <span className="eyebrow">
                <span data-en>Home care in Lahore</span>
                <span data-ur className="urdu">لاہور میں گھر پر نگہداشت</span>
              </span>
              <div className="sec-head" style={{ marginTop: 14, marginBottom: 0 }}>
                <h2>
                  <span data-en>Our services</span>
                  <span data-ur className="urdu">ہماری خدمات</span>
                </h2>
                <p>
                  <span data-en>
                    Two kinds of verified caregiver, one flat price each, paid after the shift. Not sure which you need? We&rsquo;ll tell you honestly.
                  </span>
                  <span data-ur className="urdu">
                    تصدیق شدہ نگہداشت کی دو اقسام، ہر ایک کی مقررہ قیمت، شفٹ کے بعد ادائیگی۔ سمجھ نہیں آ رہا کون سا چاہیے؟ ہم سچ بتائیں گے۔
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ---- two category cards ---- */}
          <section className="block" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {CATEGORIES.map((c) => (
                  <div key={c.cat} style={CARD}>
                    <div style={{ background: "var(--mist)", padding: "24px 22px", borderBottom: "1px solid var(--line)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)" }}>
                          {c.title}{" "}
                          <span className="urdu" style={{ fontSize: 16, color: "var(--teal-deep)", fontWeight: 700, marginRight: 4 }}>
                            {c.titleUr}
                          </span>
                        </h3>
                        <span
                          style={{
                            flex: "none",
                            background: "var(--teal)",
                            color: "#fff",
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing: ".04em",
                            textTransform: "uppercase",
                            padding: "5px 11px",
                            borderRadius: 999,
                          }}
                        >
                          <span data-en>{c.badge.en}</span>
                          <span data-ur className="urdu">{c.badge.ur}</span>
                        </span>
                      </div>
                      <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.55, marginBottom: 14, fontWeight: 500 }}>
                        <span data-en>{c.desc.en}</span>
                        <span data-ur className="urdu">{c.desc.ur}</span>
                      </p>
                      <div style={{ fontSize: 26, fontWeight: 800, color: "var(--teal-deep)", letterSpacing: "-.02em" }}>
                        Rs {c.price.toLocaleString()}{" "}
                        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--ink-soft)" }}>
                          <span data-en>/ 12-hr shift</span>
                          <span data-ur className="urdu">/ 12 گھنٹے کی شفٹ</span>
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <ul style={{ display: "grid", gap: 9, marginBottom: 20, flex: 1 }}>
                        {c.services.slice(0, 5).map((s) => (
                          <li key={s.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", listStyle: "none" }}>
                            <span
                              style={{
                                flex: "none",
                                width: 22,
                                height: 22,
                                borderRadius: 6,
                                background: "rgba(13,122,110,.12)",
                                display: "grid",
                                placeItems: "center",
                                marginTop: 2,
                              }}
                              aria-hidden="true"
                            >
                              <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, stroke: "var(--teal)", strokeWidth: 3, fill: "none" }}>
                                <path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <span style={{ fontSize: 16, fontWeight: 600, color: "var(--ink-soft)", lineHeight: 1.4 }}>
                              {s.label}{" "}
                              <span className="urdu" style={{ fontSize: 14, color: "var(--teal-deep)", fontWeight: 600 }}>{s.urdu}</span>
                            </span>
                          </li>
                        ))}
                        {c.services.length > 5 && (
                          <li style={{ listStyle: "none", fontSize: 15, fontWeight: 700, color: "var(--teal-deep)", paddingLeft: 32 }}>
                            <span data-en>+{c.services.length - 5} more</span>
                            <span data-ur className="urdu">+{c.services.length - 5} مزید</span>
                          </li>
                        )}
                      </ul>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <Link className="btn btn-ghost" href={c.href} style={{ minHeight: 52, fontSize: 16 }}>
                          <span data-en>Learn more</span>
                          <span data-ur className="urdu">مزید جانیں</span>
                        </Link>
                        <Link className="btn btn-primary" href={`/book?category=${c.cat}`} style={{ minHeight: 52, fontSize: 16 }}>
                          <span data-en>Request a call</span>
                          <span data-ur className="urdu">کال منگوائیں</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---- comparison table ---- */}
          <section className="block" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--line)",
                  borderRadius: 20,
                  padding: "26px 20px",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <h2 style={{ fontSize: "clamp(20px,4.6vw,26px)", marginBottom: 4 }}>
                  <span data-en>Not sure which you need?</span>
                  <span data-ur className="urdu">سمجھ نہیں آ رہا کون سا چاہیے؟</span>
                </h2>
                <p style={{ fontSize: 16, color: "var(--ink-soft)", fontWeight: 500, marginBottom: 18 }}>
                  <span data-en>A quick look at what each one covers.</span>
                  <span data-ur className="urdu">ایک نظر میں دیکھیں کہ ہر ایک کیا کرتا ہے۔</span>
                </p>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, tableLayout: "fixed" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px dashed var(--line-strong)" }}>
                        <th style={{ textAlign: "left", padding: "10px 6px", color: "var(--ink-soft)", fontWeight: 700 }}>
                          <span data-en>Feature</span>
                          <span data-ur className="urdu">خدمت</span>
                        </th>
                        <th style={{ width: "20%", textAlign: "center", padding: "10px 4px", color: "var(--teal-deep)", fontWeight: 800, lineHeight: 1.2 }}>
                          <span data-en>Qualified Nurse</span>
                          <span data-ur className="urdu">نرس</span>
                        </th>
                        <th style={{ width: "20%", textAlign: "center", padding: "10px 4px", color: "var(--ink)", fontWeight: 800, lineHeight: 1.2 }}>
                          <span data-en>Attendant</span>
                          <span data-ur className="urdu">اٹینڈنٹ</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARE.map(([feat, n, a]) => (
                        <tr key={feat} style={{ borderBottom: "1px solid var(--line)" }}>
                          <td style={{ padding: "12px 6px", color: "var(--ink)", fontWeight: 600, lineHeight: 1.35 }}>{feat}</td>
                          <td style={{ textAlign: "center", padding: "12px 4px" }}><Cell v={n} /></td>
                          <td style={{ textAlign: "center", padding: "12px 4px" }}><Cell v={a} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <CtaBanner />
          <div className="seam-gold" aria-hidden="true" />
        </main>
        <Footer />
      </LandingRoot>
    </>
  );
}
