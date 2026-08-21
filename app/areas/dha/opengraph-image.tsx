import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Nurses and attendants at home in DHA, Lahore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  // No response-time number: none has been measured (see lib/areas.ts).
  return ogImage({
    headline: "Nurse or attendant in DHA",
    subline: "Our office is in DHA Phase 8 — the part of Lahore we are closest to.",
  });
}
