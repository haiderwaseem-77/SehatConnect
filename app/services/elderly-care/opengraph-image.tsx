import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Elderly care at home in Lahore, day shift or night shift";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "Elderly care at home",
    subline: "Day shift, night shift, or round-the-clock as two caregivers.",
  });
}
