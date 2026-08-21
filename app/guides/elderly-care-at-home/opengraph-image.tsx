import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Guide: what elderly care at home in Lahore actually involves";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "Elderly care at home in Lahore",
    subline: "What a caregiver actually does, and what changes over time.",
  });
}
