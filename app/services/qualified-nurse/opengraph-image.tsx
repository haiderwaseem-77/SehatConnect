import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "PNC-registered qualified nurses at home in Lahore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "A qualified nurse at home",
    subline: "PNC-registered, for wound dressings, injections, drips and monitoring.",
  });
}
