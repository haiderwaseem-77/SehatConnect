import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book a Home Nurse in Lahore | Sehat Connect",
  description:
    "Request a verified nurse or patient attendant at home in Lahore. Leave your name and number and a real person will call you back to arrange care. No payment needed upfront.",
  alternates: { canonical: `${SITE_URL}/book` },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
