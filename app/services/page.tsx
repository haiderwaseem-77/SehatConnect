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
  SITE_URL,
  CONTACT_PHONE_TEL,
  CONTACT_EMAIL,
  WHATSAPP_NUMBER,
  OFFICE_POSTAL_ADDRESS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Home Nursing Services in Lahore | Qualified Nurse & Attendant | Sehat Connect",
  description:
    "Nurses and attendants at home in Lahore for post-op, elderly, paediatric, diabetic and night care. Leave your number. A real person calls back.",
  alternates: { canonical: `${SITE_URL}/services` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Sehat Connect — Home Nursing Services in Lahore",
  url: `${SITE_URL}/services`,
  telephone: CONTACT_PHONE_TEL,
  email: CONTACT_EMAIL,
  address: OFFICE_POSTAL_ADDRESS,
  areaServed: { "@type": "City", name: "Lahore" },
  // priceRange / offers.price intentionally omitted — prices are hidden from
  // all public surfaces as of 2026-07-02 (NORTH-STAR Decision Ledger).
  sameAs: [`https://wa.me/${WHATSAPP_NUMBER}`],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home care services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "MedicalTherapy", name: "Qualified Nurse at Home" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Patient Attendant at Home" },
      },
    ],
  },
};

const CATEGORIES = [
  {
    cat: "qualified_nurse" as const,
    title: "Qualified Nurse",
    titleUr: "PNC رجسٹرڈ نرس",
    href: "/services/qualified-nurse",
    badge: { en: "PNC Registered", ur: "PNC رجسٹرڈ" },
    desc: {
      en: "PNC-registered nurses for medical tasks at home: wound dressing, drips, injections, medicines and monitoring.",
      ur: "گھر پر طبی کام کے لیے PNC رجسٹرڈ نرسیں: زخم کی ڈریسنگ، ڈرپ، انجیکشن، دوائیں اور نگرانی۔",
    },
    services: QUALIFIED_NURSE_SERVICES,
  },
  {
    cat: "attendant" as const,
    title: "Attendant",
    titleUr: "اٹینڈنٹ",
    href: "/services/attendant",
    badge: { en: "CNIC Checked", ur: "شناختی کارڈ چیک شدہ" },
    desc: {
      en: "Trained attendants for daily support: feeding, hygiene, movement, companionship and overnight duty.",
      ur: "روزمرہ غیر طبی مدد کے لیے تربیت یافتہ اٹینڈنٹ: کھانا، صفائی، چلنا پھرنا، ساتھ بیٹھنا اور رات کی ڈیوٹی۔",
    },
    services: ATTENDANT_SERVICES,
  },
];

// nurse-vs-attendant comparison (preserved from the original page)
type CellValue = boolean | { en: string; ur: string };
const FREE = { en: "Free", ur: "مفت" };
const COMPARE: [{ en: string; ur: string }, CellValue, CellValue][] = [
  [{ en: "PNC registered", ur: "PNC رجسٹرڈ" }, true, false],
  [{ en: "Wound dressing / IV care", ur: "زخم کی ڈریسنگ / IV ڈرپ" }, true, false],
  [{ en: "Injections & medication", ur: "انجیکشن اور ادویات" }, true, false],
  [{ en: "Vitals monitoring", ur: "طبی علامات کی نگرانی" }, true, false],
  [{ en: "Personal hygiene support", ur: "ذاتی صفائی میں مدد" }, true, true],
  [{ en: "Feeding assistance", ur: "کھانا کھلانے میں مدد" }, true, true],
  [{ en: "Companionship / support", ur: "ساتھ بیٹھنا / سہارا" }, true, true],
  [{ en: "Overnight duty", ur: "رات کی ڈیوٹی" }, true, true],
  [{ en: "First day", ur: "پہلا دن" }, FREE, FREE],
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

function Cell({ v }: { v: CellValue }) {
  if (typeof v === "object") {
    return (
      <span style={{ fontWeight: 800, color: "var(--teal-deep)" }}>
        <span data-en>{v.en}</span>
        <span data-ur className="urdu">{v.ur}</span>
      </span>
    );
  }
  return v ? (
    <span style={{ color: "var(--teal)", fontWeight: 800 }} aria-label="Yes">✓</span>
  ) : (
    <span style={{ color: "var(--ink-soft)", fontWeight: 700, opacity: 0.55 }} aria-label="No">–</span>
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
                <span data-ur className="urdu">لاہور میں گھر پر دیکھ بھال</span>
              </span>
              <div className="sec-head" style={{ marginTop: 14, marginBottom: 0 }}>
                <h2>
                  <span data-en>Our services</span>
                  <span data-ur className="urdu">ہماری خدمات</span>
                </h2>
                <p>
                  <span data-en>
                    Need medical care? Choose a Qualified Nurse. Need daily support? Choose an Attendant. First day free. Pay after the shift. Not sure? We&rsquo;ll tell you honestly.
                  </span>
                  <span data-ur className="urdu">
                    طبی کام ہو تو نرس، روزمرہ مدد ہو تو اٹینڈنٹ مناسب ہے۔ پہلا دن مفت ہے، ادائیگی شفٹ کے بعد۔ سمجھ نہ آئے تو ہم صاف بتا دیں گے۔
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
                          <span data-en>{c.title}</span>{" "}
                          <span data-ur className="urdu" style={{ fontSize: 16, color: "var(--teal-deep)", fontWeight: 700, marginRight: 4 }}>
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
                      <div style={{ fontSize: 17, fontWeight: 700, color: "var(--teal-deep)", letterSpacing: "-.01em" }}>
                        <span data-en>First day free &middot; Pay after the shift</span>
                        <span data-ur className="urdu">پہلا دن مفت &middot; ادائیگی شفٹ کے بعد</span>
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
                              <span data-en>{s.label}</span>{" "}
                              <span data-ur className="urdu" style={{ fontSize: 14, color: "var(--teal-deep)", fontWeight: 600 }}>{s.urdu}</span>
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
                          <span data-en>See details</span>
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
                  <span data-ur className="urdu">سمجھ نہیں آ رہا نرس چاہیے یا اٹینڈنٹ؟</span>
                </h2>
                <p style={{ fontSize: 16, color: "var(--ink-soft)", fontWeight: 500, marginBottom: 18 }}>
                  <span data-en>A quick look at what each one covers.</span>
                  <span data-ur className="urdu">دونوں کا فرق مختصر میں دیکھ لیں۔</span>
                </p>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, tableLayout: "fixed" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px dashed var(--line-strong)" }}>
                        <th style={{ textAlign: "left", padding: "10px 6px", color: "var(--ink-soft)", fontWeight: 700 }}>
                          <span data-en>Feature</span>
                          <span data-ur className="urdu">کام</span>
                        </th>
                        <th style={{ width: "28%", textAlign: "center", padding: "10px 4px", color: "var(--teal-deep)", fontWeight: 800, lineHeight: 1.2, hyphens: "none", overflowWrap: "normal" }}>
                          <span data-en>Qualified Nurse</span>
                          <span data-ur className="urdu">نرس</span>
                        </th>
                        <th style={{ width: "28%", textAlign: "center", padding: "10px 4px", color: "var(--ink)", fontWeight: 800, lineHeight: 1.2, hyphens: "none", overflowWrap: "normal" }}>
                          <span data-en>Attendant</span>
                          <span data-ur className="urdu">اٹینڈنٹ</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARE.map(([feat, n, a]) => (
                        <tr key={feat.en} style={{ borderBottom: "1px solid var(--line)" }}>
                          <td style={{ padding: "12px 6px", color: "var(--ink)", fontWeight: 600, lineHeight: 1.35 }}>
                            <span data-en>{feat.en}</span>
                            <span data-ur className="urdu">{feat.ur}</span>
                          </td>
                          <td style={{ textAlign: "center", padding: "12px 4px" }}><Cell v={n} /></td>
                          <td style={{ textAlign: "center", padding: "12px 4px" }}><Cell v={a} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 15, color: "var(--ink-soft)", fontWeight: 600, marginTop: 16 }}>
                  <span data-en>You pay after the shift — we tell you the exact price on the first call.</span>
                  <span data-ur className="urdu">ادائیگی شفٹ کے بعد ہوتی ہے — صحیح قیمت پہلی کال پر بتا دی جاتی ہے۔</span>
                </p>
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
