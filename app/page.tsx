import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingRoot from "@/components/home/LandingRoot";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import PriceReceipt from "@/components/home/PriceReceipt";
import ServicesSection from "@/components/home/ServicesSection";
import HomeFAQ from "@/components/home/HomeFAQ";
import FounderNote from "@/components/home/FounderNote";
import TeamSection from "@/components/home/TeamSection";
import CtaBanner from "@/components/home/CtaBanner";
import { CONTACT_PHONE_TEL, CONTACT_EMAIL, SITE_URL, OFFICE_POSTAL_ADDRESS } from "@/lib/constants";
import { businessSameAs } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Sehat Connect | Home Nursing Service in Lahore | Nurse at Home",
  description:
    "Qualified nurses and attendants at home in Lahore, 24/7. First day free, no advance, pay after the shift. CNIC checked, references called, police-verified.",
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
  email: CONTACT_EMAIL,
  address: OFFICE_POSTAL_ADDRESS,
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
  ],
  openingHours: "Mo-Su 00:00-23:59",
  // priceRange intentionally omitted — prices are hidden from all public
  // surfaces as of 2026-07-02 (NORTH-STAR Decision Ledger); see PROMISES.priceOnCall.
  sameAs: businessSameAs(),
};

// FAQPage structured data — must mirror all questions/answers rendered in
// components/home/HomeFAQ.tsx (Google requires schema to match on-page content).
// That includes the 5 items collapsed behind "More questions" there — collapsed
// accordion content is still real, reachable, on-page content.
const homeFaq: { q: string; a: string }[] = [
  {
    q: "How do I know my loved one will get the care they deserve?",
    a: "We call first and understand your needs. First day is free, there is no advance, and if the person does not feel right, we replace them until your family is comfortable.",
  },
  {
    q: "Who actually comes into my home?",
    a: "We arrange a caring nurse or attendant based on what your loved one needs. Every caregiver is CNIC checked, references called, and police-verified. Caring for a woman? You can ask for female-for-female.",
  },
  {
    q: "How fast can care start?",
    a: "Often within 24 hours. We confirm the details on the call and arrange the right person for your loved one’s care.",
  },
  {
    q: "What if we’re not comfortable with the caregiver?",
    a: "Tell us. We replace the caregiver until your family is comfortable. Payment only starts once the right person is finalized.",
  },
  {
    q: "How and when do I pay?",
    a: "There is no advance payment. First day is free, and payment starts only once the right person is finalized and your family is comfortable.",
  },
  {
    q: "Which areas of Lahore do you cover?",
    a: "All of Lahore — DHA, Gulberg, Johar Town, Model Town, Bahria Town, Cantt and everywhere in between, 24/7. We ask your exact area on the call.",
  },
  {
    q: "What’s the difference between a nurse and an attendant?",
    a: "A Qualified Nurse is PNC registered and handles clinical care — injections, drips, wound dressing, medicines and monitoring. An Attendant gives non-clinical support — feeding, hygiene, movement and companionship. We tell you the exact price on the first call, depending on which you need; either way, your first day is free, there is no advance, and you pay cash after the shift.",
  },
  {
    q: "Can they actually do the medical work?",
    a: "Yes. Our Qualified Nurses are Pakistan Nursing Council registered and do real nursing at home — wounds, dressings, injections, medicines, monitoring, post-op and ICU step-down care. For non-clinical help (feeding, hygiene, movement) an Attendant is enough, and we’ll tell you honestly which you need.",
  },
  {
    q: "Can I request the same nurse again?",
    a: "Yes. Tell us on WhatsApp and we try our best to send the same caregiver, so your loved one sees a familiar face. Familiarity and comfort matter to us too.",
  },
  {
    q: "What if the caregiver is running late?",
    a: "We keep you updated on WhatsApp or by phone, and you can always call us. If there is a delay, we sort out the next step quickly so your family is not left waiting without an answer.",
  },
  {
    q: "I live abroad — can I arrange care for my parents in Lahore?",
    a: "Yes. Many families arrange care for parents in Lahore from abroad. We keep you updated on WhatsApp, and your family in Lahore pays after care begins, same as usual.",
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
          <HomeFAQ />
          <FounderNote />
          <TeamSection />
          <CtaBanner />
          <div className="seam-gold" aria-hidden="true" />
        </main>
        <Footer />
      </LandingRoot>
    </>
  );
}
