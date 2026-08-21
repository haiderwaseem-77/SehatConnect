import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "Guide: choosing between a nurse and an attendant at home";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    headline: "Nurse or attendant?",
    subline: "Which one your patient needs, answered with real situations.",
  });
}
