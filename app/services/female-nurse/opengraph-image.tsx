import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Female nurses at home in Lahore, female-for-female on request";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "Ask for a female nurse",
    subline: "Female-for-female whenever you ask — you never have to explain why.",
  });
}
