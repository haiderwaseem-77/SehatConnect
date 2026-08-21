import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "The Lahore areas Sehat Connect sends nurses and attendants to";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "Areas we serve in Lahore",
    subline: "DHA, Gulberg, Johar Town and across the rest of the city.",
  });
}
