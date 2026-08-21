import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Guide: a checklist for bringing someone home after surgery";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "Bringing someone home after surgery",
    subline: "What to prepare, what to ask before you leave the hospital.",
  });
}
