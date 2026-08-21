import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "A nurse visits your home in Lahore for an injection, drip or dressing";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "An injection or drip at home",
    subline: "A single nurse visit on the doctor's prescription — no 12-hour commitment.",
  });
}
