import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Sehat Connect guides for families arranging care at home in Lahore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "Guides for families",
    subline: "Plain answers for anyone arranging care at home in Lahore.",
  });
}
