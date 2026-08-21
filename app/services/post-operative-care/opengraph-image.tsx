import { START_PROMISE } from "@/lib/constants";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Post-operative care at home in Lahore after surgery or discharge";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  // Subline is START_PROMISE verbatim — "can start", never "starts".
  return ogImage({
    headline: "Care at home after surgery",
    subline: START_PROMISE.en,
  });
}
