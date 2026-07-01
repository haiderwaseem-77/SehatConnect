import type { Metadata } from "next";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";
import {
  ATTENDANT_SERVICES,
  PRICES,
  SITE_URL,
  CONTACT_PHONE_TEL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Patient Attendant at Home in Lahore | Sehat Connect",
  description:
    "Book a trained male or female patient attendant at home in Lahore. Elderly care, personal hygiene, companionship and overnight duty. Rs. 3,000 per 12-hour shift.",
  alternates: { canonical: `${SITE_URL}/services/attendant` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Home patient attendant care",
  name: "Patient Attendant at Home (Lahore)",
  description:
    "Trained, background-verified attendants for non-clinical home care — feeding, hygiene, movement, companionship and overnight duty. Female or male, you choose.",
  url: `${SITE_URL}/services/attendant`,
  provider: {
    "@type": "MedicalBusiness",
    name: "Sehat Connect",
    telephone: CONTACT_PHONE_TEL,
    areaServed: { "@type": "City", name: "Lahore" },
  },
  areaServed: { "@type": "City", name: "Lahore" },
  offers: {
    "@type": "Offer",
    price: PRICES.attendant,
    priceCurrency: "PKR",
    description: "Per 12-hour shift, paid after the shift — no advance.",
  },
};

const DOES: { en: string; ur: string }[] = [
  { en: "Feeding & meals — help with eating, drinking and timing medicines you hand over", ur: "کھانا کھلانا — کھانے، پینے اور دوا وقت پر دینے میں مدد" },
  { en: "Hygiene & bathing — sponge bath, changing, toilet help, keeping the patient clean", ur: "صفائی اور غسل — سپنج غسل، کپڑے بدلنا، بیت الخلا میں مدد" },
  { en: "Movement & positioning — turning, sitting up, walking support to prevent bed sores", ur: "نقل و حرکت — کروٹ بدلنا، بٹھانا، چلنے میں سہارا تاکہ زخم نہ بنیں" },
  { en: "Companionship — sitting with them, talking, keeping them calm and not alone", ur: "رفاقت — ساتھ بیٹھنا، بات چیت، مریض کو پُرسکون اور تنہا نہ چھوڑنا" },
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
            <span data-ur className="urdu">غیر طبی نگہداشت</span>
          </span>
          <h2 style={{ fontSize: "clamp(22px,5vw,30px)", marginBottom: 8 }}>
            <span data-en>What an attendant does</span>
            <span data-ur className="urdu">اٹینڈنٹ کیا کرتا ہے</span>
          </h2>
          <p style={{ fontSize: 17, color: "var(--ink-soft)", fontWeight: 500, marginBottom: 20, maxWidth: "48ch" }}>
            <span data-en>
              An attendant handles the everyday, hands-on care an unwell or elderly person needs — the non-medical work that keeps them comfortable, clean and safe.
            </span>
            <span data-ur className="urdu">
              اٹینڈنٹ روزمرہ کی وہ دیکھ بھال کرتا ہے جو کسی بیمار یا بزرگ فرد کو درکار ہوتی ہے — وہ غیر طبی کام جو انہیں آرام دہ، صاف اور محفوظ رکھتا ہے۔
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
              <b style={{ color: "var(--ink)" }}>طبی کام</b> — انجیکشن، ڈرپ، زخم کی ڈریسنگ یا نگرانی چاہیے؟ یہ{" "}
              <b style={{ color: "var(--ink)" }}>کوالیفائیڈ نرس</b> کا کام ہے، اٹینڈنٹ کا نہیں۔ ہم ہمیشہ سچ بتائیں گے کہ آپ کو کون سا چاہیے۔
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
              <span data-ur className="urdu">اٹینڈنٹ خاتون ہو یا مرد — آپ کا فیصلہ</span>
            </b>
            <span style={{ display: "block", marginTop: 4, fontSize: 15.5, fontWeight: 500, color: "var(--ink-soft)", lineHeight: 1.5 }}>
              <span data-en>
                Caring for a woman or an elderly mother? Ask for a female attendant — female-for-female, always. Just tell us on the call.
              </span>
              <span data-ur className="urdu">
                کسی خاتون یا بزرگ ماں کی دیکھ بھال؟ خاتون اٹینڈنٹ مانگیں — خاتون کے لیے خاتون، ہمیشہ۔ کال پر بس بتا دیں۔
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
      badge={{ en: "Trained & Verified", ur: "تربیت یافتہ و تصدیق شدہ" }}
      price={PRICES.attendant}
      category="attendant"
      intro={{
        en: "Non-clinical personal care and companionship from trained, background-verified attendants — feeding, hygiene, movement and comfort.",
        ur: "تربیت یافتہ، تصدیق شدہ اٹینڈنٹس کی طرف سے غیر طبی ذاتی نگہداشت اور رفاقت — کھانا کھلانا، صفائی، نقل و حرکت اور آرام۔",
      }}
      gridHeading={{
        en: "What our attendants help with",
        ur: "ہمارے اٹینڈنٹ کن چیزوں میں مدد کرتے ہیں",
      }}
      gridSub={{
        en: "Trained, CNIC & references checked. Tap WhatsApp or ask us to call you back.",
        ur: "تربیت یافتہ، شناختی کارڈ اور حوالہ جات کی جانچ شدہ۔ واٹس ایپ کریں یا کال کی درخواست کریں۔",
      }}
      services={ATTENDANT_SERVICES}
      waPrefix="an Attendant for "
      jsonLd={jsonLd}
      extra={AttendantExtra}
    />
  );
}
