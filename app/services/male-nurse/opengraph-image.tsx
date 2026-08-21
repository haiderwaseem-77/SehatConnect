import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Male nurses at home in Lahore for lifting, personal care and night duty";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "Ask for a male nurse",
    subline: "Lifting, turning, personal care and night duty — ask, and nobody asks why.",
  });
}
