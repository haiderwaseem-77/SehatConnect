import type { Metadata } from "next";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";
import {
  QUALIFIED_NURSE_SERVICES,
  SITE_URL,
  CONTACT_PHONE_TEL,
  OFFICE_POSTAL_ADDRESS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Qualified Home Nurse in Lahore | PNC Registered | Sehat Connect",
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
  },
  areaServed: { "@type": "City", name: "Lahore" },
  offers: {
    "@type": "Offer",
    description: "Exact price told on the first call. Pay after the shift, no advance.",
  },
  relevantSpecialty: QUALIFIED_NURSE_SERVICES.map((s) => s.label),
};

export default function QualifiedNursePage() {
  return (
    <ServiceDetailPage
      role="Qualified Nurse"
      roleUrdu="کوالیفائیڈ نرس"
      badge={{ en: "PNC Registered", ur: "پی این سی رجسٹرڈ" }}
      category="qualified_nurse"
      intro={{
        en: "PNC-registered nurses at home for wounds, dressings, injections, medicines, monitoring, post-op and ICU step-down care.",
        ur: "پاکستان نرسنگ کونسل کی رجسٹرڈ نرسیں گھر پر طبی نگہداشت فراہم کرتی ہیں — زخم، ڈریسنگ، انجیکشن، ادویات، نگرانی، آپریشن اور آئی سی یو کے بعد کی دیکھ بھال۔",
      }}
      gridHeading={{
        en: "What our nurses handle",
        ur: "ہماری نرسیں کیا سنبھالتی ہیں",
      }}
      gridSub={{
        en: "Every nurse is PNC registered. CNIC checked, references called, police-verified. Tap WhatsApp or ask us to call you back.",
        ur: "ہر نرس PNC رجسٹرڈ ہے۔ شناختی کارڈ، حوالہ جات اور پولیس تصدیق چیک ہوتی ہے۔ واٹس ایپ کریں یا کال کی درخواست کریں۔",
      }}
      services={QUALIFIED_NURSE_SERVICES}
      jsonLd={jsonLd}
    />
  );
}
