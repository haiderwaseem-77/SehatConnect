import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Sehat Connect — Home Nursing Service in Lahore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  // The original site-wide card, unchanged: brand tagline in the headline slot,
  // no subline, the default trust pills.
  return ogImage({ headline: "bringing the hospital to your home" });
}
