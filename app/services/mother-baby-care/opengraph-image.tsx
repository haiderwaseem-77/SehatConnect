import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Postnatal care at home in Lahore for the mother after delivery";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  // Scope is the MOTHER after delivery, never newborn or neonatal care
  // (Decision Ledger, 2026-08-21).
  return ogImage({
    headline: "Care for the mother after delivery",
    subline: "A nurse or attendant at home so she can rest. Female caregiver on request.",
  });
}
