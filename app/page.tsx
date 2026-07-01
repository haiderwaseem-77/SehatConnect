import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import PriceReceipt from "@/components/home/PriceReceipt";
import ServicesSection from "@/components/home/ServicesSection";
import VerifiedCard from "@/components/home/VerifiedCard";
import HomeFAQ from "@/components/home/HomeFAQ";
import FounderNote from "@/components/home/FounderNote";
import CtaBanner from "@/components/home/CtaBanner";
import { CONTACT_PHONE_TEL, WHATSAPP_NUMBER, PRICES, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sehat Connect | Home Nursing Service in Lahore | Nurse at Home",
  description:
    "Worried about caring for someone at home in Lahore? Leave your name and number — a real person calls you back. PNC-registered nurses, CNIC & references checked. Rs 4,000 / 12-hr shift, pay after the shift, no advance.",
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Sehat Connect",
  description:
    "Home nursing service in Lahore providing PNC-registered nurses and trained attendants for post-operative care, elderly care, paediatric care and more.",
  url: SITE_URL,
  telephone: CONTACT_PHONE_TEL,
  email: "",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  areaServed: {
    "@type": "City",
    name: "Lahore",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: CONTACT_PHONE_TEL,
    contactType: "customer service",
    areaServed: "Lahore",
    availableLanguage: ["en", "ur"],
  },
  serviceType: [
    "Home Nursing",
    "Post-operative Care",
    "Elderly Care",
    "Paediatric Care",
    "Patient Attendant",
    "Night Duty Nurse",
  ],
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: `Rs. ${PRICES.attendant.toLocaleString()} - Rs. ${PRICES.qualified_nurse.toLocaleString()} per shift`,
  sameAs: [`https://wa.me/${WHATSAPP_NUMBER}`],
};

// FAQPage structured data — must mirror the questions/answers VISIBLE in
// components/home/HomeFAQ.tsx (Google requires schema to match on-page content).
const nursePrice = `Rs ${PRICES.qualified_nurse.toLocaleString("en-US")}`;
const attendantPrice = `Rs ${PRICES.attendant.toLocaleString("en-US")}`;

const homeFaq: { q: string; a: string }[] = [
  {
    q: "How do I know this isn’t a scam?",
    a: "There’s no advance and no card number to hand over. The nurse finishes the 12-hour shift in your home — then you pay, cash on the visit. We’re a real Lahore service working 24/7, and a real person is always one call away.",
  },
  {
    q: "Who actually comes into my home?",
    a: "A verified person whose card we send you first — photo, name and PNC number on WhatsApp before they arrive. Every Qualified Nurse is PNC registered; attendants are background-verified, CNIC & references checked. Caring for a woman? Ask for a female nurse or attendant — female-for-female, always.",
  },
  {
    q: "Can they actually do the medical work?",
    a: "Yes. Our Qualified Nurses are Pakistan Nursing Council registered and do real nursing at home — wounds, dressings, injections, medicines, monitoring, post-op and ICU step-down care. For non-clinical help (feeding, hygiene, movement) an Attendant is enough, and we’ll tell you honestly which you need.",
  },
  {
    q: "What’s the difference between a nurse and an attendant?",
    a: `A Qualified Nurse (${nursePrice}) handles clinical care — medicines, wounds, injections, monitoring. An Attendant (${attendantPrice}) handles non-clinical care — feeding, hygiene, movement and comfort. Both per 12-hour shift.`,
  },
  {
    q: "How and when do I pay?",
    a: "Cash after the shift — no advance, ever. Easypaisa and JazzCash are coming soon for convenience. You can cancel or reschedule free up to 4 hours before.",
  },
  {
    q: "Can I request the same nurse again?",
    a: "Yes. Tell us on WhatsApp and we try our best to send the same caregiver, so your loved one sees a familiar face. Continuity matters to us too.",
  },
  {
    q: "Which areas of Lahore do you cover?",
    a: "All of Lahore — DHA, Gulberg, Johar Town, Model Town, Bahria Town, Cantt and everywhere in between, 24/7. We ask your exact area on the call.",
  },
  {
    q: "What if the caregiver is running late?",
    a: "We keep you updated by WhatsApp/SMS, and you can always call us. If there’s a delay, we sort out a replacement quickly — you’re never left waiting without an answer.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: a,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <LandingRoot>
        <Navbar />
        <a id="top" />
        <main className="flex-1">
          <Hero />
          <HowItWorks />
          <PriceReceipt />
          <ServicesSection />
          <VerifiedCard />
          <HomeFAQ />
          <FounderNote />
          <CtaBanner />
          <div className="seam-gold" aria-hidden="true" />
        </main>
        <Footer />
      </LandingRoot>
    </>
  );
}
