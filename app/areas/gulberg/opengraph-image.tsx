import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Nurses and attendants at home in Gulberg, Lahore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "Nurse or attendant in Gulberg",
    subline: "Night shifts so the house can sleep, and daily care that runs for months.",
  });
}
