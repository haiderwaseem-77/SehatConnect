import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "About Sehat Connect — the Lahore home nursing service and its founder";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "The people behind Sehat Connect",
    subline: "A Lahore home nursing service, founded and run by Sardar Waseem Ilyas.",
  });
}
