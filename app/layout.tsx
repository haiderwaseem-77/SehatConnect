import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./direction6.css";
import StickyActionBar from "@/components/ui/StickyActionBar";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
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
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500;1,600&family=Fraunces:ital,opsz,wght@1,9..144,500;1,9..144,600&family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          {children}
          <StickyActionBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
