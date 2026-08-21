import type { Metadata } from "next";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";
import { breadcrumbList, businessSameAs, OPENING_HOURS } from "@/lib/schema";
import {
  QUALIFIED_NURSE_SERVICES,
  SITE_URL,
  CONTACT_PHONE_TEL,
  OFFICE_POSTAL_ADDRESS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Qualified Home Nurse in Lahore | PNC Registered",
  description:
    "Qualified nurses at home in Lahore for injections, drips, wound care and post-surgery care. First day free, no advance — pay after the 12-hour shift.",
  alternates: { canonical: `${SITE_URL}/services/qualified-nurse` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Qualified Nurse at Home (Lahore)",
  description:
    "PNC-registered nurses at home for wounds, dressings, injections, medicines, monitoring, post-operative and ICU step-down care.",
  url: `${SITE_URL}/services/qualified-nurse`,
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
  relevantSpecialty: QUALIFIED_NURSE_SERVICES.map((s) => s.label),
};

const crumbs = [
  { name: "Services", nameUr: "خدمات", path: "/services" },
  { name: "Qualified Nurse", nameUr: "PNC رجسٹرڈ نرس" },
];
const breadcrumbs = breadcrumbList(crumbs);

const CAN_DO: { en: string; ur: string }[] = [
  { en: "Injections & drips — IM/IV injections and IV drips, given on the doctor's prescription", ur: "انجیکشن اور ڈرپ — ڈاکٹر کے نسخے کے مطابق IM/IV انجیکشن اور IV ڈرپ" },
  { en: "Wound care & dressing — cleaning wounds, changing dressings, caring for post-surgery sites", ur: "زخم اور ڈریسنگ — زخم صاف کرنا، ڈریسنگ بدلنا اور آپریشن کے بعد زخم کی دیکھ بھال" },
  { en: "Vitals monitoring — blood pressure, temperature, pulse, blood sugar and oxygen checks", ur: "طبی علامات کی نگرانی — بلڈ پریشر، درجہ حرارت، نبض، شوگر اور آکسیجن چیک کرنا" },
  { en: "Tubes & catheters — looking after catheters and feeding (NG) tubes on the doctor's plan", ur: "ٹیوب اور کیتھیٹر — ڈاکٹر کے پلان کے مطابق کیتھیٹر اور NG فیڈنگ ٹیوب کی دیکھ بھال" },
  { en: "Medicines — giving prescribed medicines on time and watching for any reaction", ur: "دوائیں — تجویز کردہ دوائیں وقت پر دینا اور کسی بھی ردعمل پر نظر رکھنا" },
  { en: "Post-op & recovery — following the surgeon's after-care and spotting warning signs early", ur: "آپریشن کے بعد ریکوری — سرجن کی ہدایات کے مطابق دیکھ بھال اور خطرے کی علامات جلد پہچاننا" },
];

const NurseExtra = (
  <>
    {/* ---- what a qualified nurse can do (clinical tasks) ---- */}
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
            <span data-en>Clinical care</span>
            <span data-ur lang="ur" dir="rtl" className="urdu">طبی دیکھ بھال</span>
          </span>
          <h2 style={{ fontSize: "clamp(22px,5vw,30px)", marginBottom: 8 }}>
            <span data-en>What a qualified nurse can do</span>
            <span data-ur lang="ur" dir="rtl" className="urdu">نرس کون سے طبی کام سنبھالتی ہے</span>
          </h2>
          <p style={{ fontSize: 17, color: "var(--ink-soft)", fontWeight: 500, marginBottom: 20, maxWidth: "48ch" }}>
            <span data-en>
              A qualified nurse handles the medical tasks a patient needs at home — the clinical work that follows the doctor&rsquo;s plan, done safely and on time.
            </span>
            <span data-ur lang="ur" dir="rtl" className="urdu">
              نرس گھر پر وہ طبی کام سنبھالتی ہے جو ڈاکٹر کے پلان کے مطابق کرنے ہوتے ہیں — محفوظ طریقے سے اور وقت پر۔
            </span>
          </p>
          <ul style={{ display: "grid", gap: 12 }} className="sm:grid-cols-2">
            {CAN_DO.map((d) => (
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
                  <span data-ur lang="ur" dir="rtl" className="urdu">{d.ur}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* honesty note: a nurse is more than daily help */}
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
              <b style={{ color: "var(--ink)" }}>Only need daily, non-medical help</b> — feeding, bathing, company, movement? That is a{" "}
              <b style={{ color: "var(--ink)" }}>Patient Attendant</b>, not a nurse. We&rsquo;ll always tell you honestly which one your patient needs.
            </span>
            <span data-ur lang="ur" dir="rtl" className="urdu">
              <b style={{ color: "var(--ink)" }}>صرف روزمرہ، غیر طبی مدد</b> — کھانا کھلانا، غسل، ساتھ بیٹھنا یا چلنے پھرنے میں سہارا چاہیے؟ یہ{" "}
              <b style={{ color: "var(--ink)" }}>اٹینڈنٹ</b> کا کام ہے، نرس کا نہیں۔ ہم صاف بتا دیں گے کہ آپ کے مریض کے لیے کون سا فرد مناسب ہے۔
            </span>
          </p>
        </div>
      </div>
    </section>
  </>
);

export default function QualifiedNursePage() {
  return (
    <ServiceDetailPage
      role="Qualified Nurse"
      roleUrdu="PNC رجسٹرڈ نرس"
      badge={{ en: "PNC Registered", ur: "PNC رجسٹرڈ" }}
      category="qualified_nurse"
      intro={{
        en: "PNC-registered nurses at home for wounds, dressings, injections, medicines, monitoring, post-op and ICU step-down care.",
        ur: "PNC رجسٹرڈ نرسیں گھر پر طبی کام سنبھالتی ہیں: ڈریسنگ، انجیکشن، ڈرپ، دوائیں، نگرانی، آپریشن کے بعد اور ICU کے بعد دیکھ بھال۔",
      }}
      gridHeading={{
        en: "What our nurses handle",
        ur: "ہماری نرسیں کون سے کام سنبھالتی ہیں",
      }}
      gridSub={{
        en: "Every nurse is PNC registered.",
        ur: "ہر نرس PNC رجسٹرڈ ہے۔",
      }}
      services={QUALIFIED_NURSE_SERVICES}
      jsonLd={jsonLd}
      breadcrumbs={breadcrumbs}
      crumbs={crumbs}
      extra={NurseExtra}
    />
  );
}
