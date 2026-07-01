import type { Metadata } from "next";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";
import {
  QUALIFIED_NURSE_SERVICES,
  PRICES,
  SITE_URL,
  CONTACT_PHONE_TEL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Qualified Home Nurse in Lahore | PNC Registered | Sehat Connect",
  description:
    "Book a PNC-registered qualified nurse at home in Lahore for post-op care, elderly care, ICU step-down, diabetic care and more. Rs. 4,000 per 12-hour shift. Call 0328-8489988.",
  alternates: { canonical: `${SITE_URL}/services/qualified-nurse` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Qualified Nurse at Home (Lahore)",
  description:
    "Clinical home nursing by Pakistan Nursing Council registered nurses — wound care, dressings, injections, medication management, monitoring, post-operative and ICU step-down care.",
  url: `${SITE_URL}/services/qualified-nurse`,
  provider: {
    "@type": "MedicalBusiness",
    name: "Sehat Connect",
    telephone: CONTACT_PHONE_TEL,
    areaServed: { "@type": "City", name: "Lahore" },
  },
  areaServed: { "@type": "City", name: "Lahore" },
  offers: {
    "@type": "Offer",
    price: PRICES.qualified_nurse,
    priceCurrency: "PKR",
    description: "Per 12-hour shift, paid after the shift — no advance.",
  },
  relevantSpecialty: QUALIFIED_NURSE_SERVICES.map((s) => s.label),
};

export default function QualifiedNursePage() {
  return (
    <ServiceDetailPage
      role="Qualified Nurse"
      roleUrdu="کوالیفائیڈ نرس"
      badge={{ en: "PNC Registered", ur: "پی این سی رجسٹرڈ" }}
      price={PRICES.qualified_nurse}
      category="qualified_nurse"
      intro={{
        en: "Clinical home nursing by Pakistan Nursing Council registered nurses — wounds, dressings, injections, medicines, monitoring, post-op and ICU step-down care.",
        ur: "پاکستان نرسنگ کونسل کی رجسٹرڈ نرسیں گھر پر طبی نگہداشت فراہم کرتی ہیں — زخم، ڈریسنگ، انجیکشن، ادویات، نگرانی، آپریشن اور آئی سی یو کے بعد کی دیکھ بھال۔",
      }}
      gridHeading={{
        en: "What our nurses handle",
        ur: "ہماری نرسیں کیا سنبھالتی ہیں",
      }}
      gridSub={{
        en: "Every nurse is PNC registered, CNIC & references checked. Tap WhatsApp or ask us to call you back.",
        ur: "ہر نرس پی این سی رجسٹرڈ ہے، شناختی کارڈ اور حوالہ جات کی جانچ شدہ۔ واٹس ایپ کریں یا کال کی درخواست کریں۔",
      }}
      services={QUALIFIED_NURSE_SERVICES}
      jsonLd={jsonLd}
    />
  );
}
