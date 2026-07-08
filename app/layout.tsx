import type { Metadata } from "next";
import {
  Fraunces,
  Noto_Nastaliq_Urdu,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import "./direction6.css";
import StickyActionBar from "@/components/ui/StickyActionBar";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { SITE_URL } from "@/lib/constants";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["italic"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  display: "swap",
  preload: false,
  weight: ["400", "600", "700"],
  variable: "--font-urdu",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sehat Connect | Home Nursing Service in Lahore | Nurse at Home",
    template: "%s | Sehat Connect",
  },
  description:
    "Leave your number for a nurse or patient attendant at home in Lahore. PNC-registered nurses, trained attendants, first day free, no advance. Call 0328-8489988.",
  keywords: [
    "home nurse Lahore",
    "nurse at home Lahore",
    "home nursing service Lahore",
    "patient attendant Lahore",
    "home healthcare Lahore",
    "qualified nurse at home Lahore",
    "post operative care at home Lahore",
    "elderly care at home Lahore",
    "female nurse at home Lahore",
    "male nurse at home Lahore",
    "ghar par nurse Lahore",
    "home nurse Pakistan",
    "nursing care at home Pakistan",
    "PNC registered nurse home visit",
    "attendant for patient at home",
    "Sehat Connect",
    "sehat-connect.pk",
  ],
  authors: [{ name: "Sehat Connect" }],
  creator: "Sehat Connect",
  publisher: "Sehat Connect",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: "Sehat Connect",
    title: "Sehat Connect | Home Nursing Service in Lahore",
    description:
      "Nurses and patient attendants at home in Lahore. CNIC checked, references called, police-verified. Call 0328-8489988.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sehat Connect | Home Nursing Service in Lahore",
    description:
      "Need a nurse or attendant at home in Lahore? Call or WhatsApp. Our team arranges care.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVars = [
    plusJakarta.variable,
    fraunces.variable,
    notoNastaliqUrdu.variable,
  ].join(" ");

  return (
    <html lang="en-PK" className={fontVars}>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          {children}
          <StickyActionBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
