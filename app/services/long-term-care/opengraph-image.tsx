import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Long-term care at home in Lahore for bedridden and long-illness patients";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "Long-term care at home",
    subline: "Daily care for bedridden, dementia and palliative patients.",
  });
}
