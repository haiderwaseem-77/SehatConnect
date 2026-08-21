import type { Metadata } from "next";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";
import { breadcrumbList, businessSameAs, OPENING_HOURS } from "@/lib/schema";
import {
  ATTENDANT_SERVICES,
  SITE_URL,
  CONTACT_PHONE_TEL,
  OFFICE_POSTAL_ADDRESS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Patient Attendant at Home in Lahore | Sehat Connect",
  description:
    "Trained male or female patient attendants at home in Lahore for elderly care, personal hygiene, companionship and overnight duty. First day free, no advance — pay after the shift.",
  alternates: { canonical: `${SITE_URL}/services/attendant` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Home patient attendant care",
  name: "Patient Attendant at Home (Lahore)",
  description:
    "Trained attendants for non-clinical home care: feeding, hygiene, movement, companionship and overnight duty. CNIC checked, references called, police-verified.",
  url: `${SITE_URL}/services/attendant`,
  provider: {
    "@type": "MedicalBusiness",
    name: "Sehat Connect",
    telephone: CONTACT_PHONE_TEL,
    address: OFFICE_POSTAL_ADDRESS,
    areaServed: { "@type": "City", name: "Lahore" },
    openingHours: OPENING_HOURS,
    sameAs: businessSameAs(),
  },
  areaServed: { "@type": "City", name: "Lahore" },
  offers: {
    "@type": "Offer",
    description: "Exact price told on the first call. Pay after the shift, no advance.",
  },
};

const breadcrumbs = breadcrumbList([
  { name: "Services", path: "/services" },
  { name: "Patient Attendant" },
]);

const DOES: { en: string; ur: string }[] = [
  { en: "Feeding & meals — help with eating, drinking and timing medicines you hand over", ur: "کھانا — کھانا کھلانا، پانی پلانا، اور آپ کی دی ہوئی دوا وقت پر دینا" },
  { en: "Hygiene & bathing — sponge bath, changing, toilet help, keeping the patient clean", ur: "صفائی اور غسل — سپنج باتھ، کپڑے بدلوانا، بیت الخلا میں مدد اور مریض کو صاف رکھنا" },
  { en: "Movement & positioning — turning, sitting up, walking support to prevent bed sores", ur: "حرکت اور پوزیشن — کروٹ بدلوانا، بٹھانا، چلنے میں سہارا تاکہ بیڈ سورز کا خطرہ کم ہو" },
  { en: "Companionship — sitting with them, talking, keeping them calm and not alone", ur: "ساتھ — مریض کے پاس بیٹھنا، بات کرنا، تسلی دینا اور اکیلا نہ چھوڑنا" },
];

const AttendantExtra = (
  <>
    {/* ---- what an attendant does ---- */}
    <section className="block" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div
          style={{
            background: "var(--paper)",
            border: "1px solid var(--line)",
            borderRadius: 20,
            padding: "28px 22px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <span className="eyebrow" style={{ marginBottom: 14 }}>
            <span data-en>Non-clinical care</span>
            <span data-ur className="urdu">غیر طبی دیکھ بھال</span>
          </span>
          <h2 style={{ fontSize: "clamp(22px,5vw,30px)", marginBottom: 8 }}>
            <span data-en>What an attendant does</span>
            <span data-ur className="urdu">اٹینڈنٹ کون سی مدد کرتا ہے</span>
          </h2>
          <p style={{ fontSize: 17, color: "var(--ink-soft)", fontWeight: 500, marginBottom: 20, maxWidth: "48ch" }}>
            <span data-en>
              An attendant handles the everyday, hands-on care an unwell or elderly person needs — the non-medical work that keeps them comfortable, clean and safe.
            </span>
            <span data-ur className="urdu">
              اٹینڈنٹ بیمار یا بزرگ فرد کی روزمرہ، غیر طبی مدد کرتا ہے — آرام، صفائی اور حفاظت کا خیال رکھتے ہوئے۔
            </span>
          </p>
          <ul style={{ display: "grid", gap: 12 }} className="sm:grid-cols-2">
            {DOES.map((d) => (
              <li key={d.en} style={{ display: "flex", gap: 12, alignItems: "flex-start", listStyle: "none" }}>
                <span
                  style={{
                    flex: "none",
                    width: 24,
                    height: 24,
                    borderRadius: 7,
                    background: "rgba(13,122,110,.12)",
                    display: "grid",
                    placeItems: "center",
                    marginTop: 2,
                  }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, stroke: "var(--teal)", strokeWidth: 3, fill: "none" }}>
                    <path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{ fontSize: 16, fontWeight: 600, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                  <span data-en>{d.en}</span>
                  <span data-ur className="urdu">{d.ur}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* honesty note: attendant is not a nurse */}
          <p
            style={{
              marginTop: 18,
              paddingTop: 16,
              borderTop: "1px dashed var(--line)",
              fontSize: 15.5,
              color: "var(--ink-soft)",
              lineHeight: 1.55,
              fontWeight: 500,
            }}
          >
            <span data-en>
              <b style={{ color: "var(--ink)" }}>Need a medical task</b> — injections, drips, wound dressing or monitoring? That is a{" "}
              <b style={{ color: "var(--ink)" }}>Qualified Nurse</b>, not an attendant. We&rsquo;ll always tell you honestly which one you need.
            </span>
            <span data-ur className="urdu">
              <b style={{ color: "var(--ink)" }}>طبی کام</b> — انجیکشن، ڈرپ، ڈریسنگ یا نگرانی چاہیے؟ یہ{" "}
              <b style={{ color: "var(--ink)" }}>نرس</b> کا کام ہے، اٹینڈنٹ کا نہیں۔ ہم صاف بتا دیں گے کہ آپ کے لیے کون سا فرد مناسب ہے۔
            </span>
          </p>
        </div>

        {/* ---- female / male choice ---- */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
            background: "var(--mist)",
            border: "1px solid var(--line)",
            borderRadius: 18,
            padding: "20px 20px",
          }}
        >
          <span
            style={{
              flex: "none",
              width: 44,
              height: 44,
              borderRadius: 13,
              background: "#fff",
              border: "1.5px solid var(--teal)",
              display: "grid",
              placeItems: "center",
            }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: "var(--teal-deep)", strokeWidth: 2, fill: "none" }}>
              <path d="M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 8v10m-4-4h8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div style={{ minWidth: 0 }}>
            <b style={{ display: "block", fontSize: 17, fontWeight: 800, color: "var(--ink)", lineHeight: 1.3 }}>
              <span data-en>Female or male attendant — you choose</span>
              <span data-ur className="urdu">خاتون یا مرد اٹینڈنٹ — آپ کی پسند</span>
            </b>
            <span style={{ display: "block", marginTop: 4, fontSize: 15.5, fontWeight: 500, color: "var(--ink-soft)", lineHeight: 1.5 }}>
              <span data-en>
                Caring for a woman or an elderly mother? Ask for a female attendant — female-for-female, always. Just tell us on the call.
              </span>
              <span data-ur className="urdu">
                خاتون مریض یا بزرگ والدہ کے لیے خاتون اٹینڈنٹ چاہیے؟ کال پر بتا دیں؛ خاتون کے لیے خاتون کا بندوبست کیا جا سکتا ہے۔
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default function AttendantPage() {
  return (
    <ServiceDetailPage
      role="Attendant"
      roleUrdu="اٹینڈنٹ"
      badge={{ en: "CNIC Checked", ur: "شناختی کارڈ چیک شدہ" }}
      category="attendant"
      intro={{
        en: "Non-clinical personal care from trained attendants: feeding, hygiene, movement, companionship and comfort.",
        ur: "تربیت یافتہ اٹینڈنٹ روزمرہ غیر طبی مدد دیتے ہیں: کھانا کھلانا، صفائی، چلنے پھرنے میں سہارا، ساتھ بیٹھنا اور آرام۔",
      }}
      gridHeading={{
        en: "What our attendants help with",
        ur: "ہمارے اٹینڈنٹ کن کاموں میں مدد کرتے ہیں",
      }}
      gridSub={{
        en: "Trained attendants.",
        ur: "ہر اٹینڈنٹ تربیت یافتہ ہے۔",
      }}
      services={ATTENDANT_SERVICES}
      waPrefix="an Attendant for "
      jsonLd={jsonLd}
      breadcrumbs={breadcrumbs}
      extra={AttendantExtra}
    />
  );
}
