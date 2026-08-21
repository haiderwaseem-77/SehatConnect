import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Arranging a nurse or attendant for your parents in Lahore from abroad";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "Care for your parents in Lahore",
    subline: "Arranged from the UK, USA, UAE or Canada, by phone and WhatsApp.",
  });
}
