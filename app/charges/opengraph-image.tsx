import { PROMISES } from "@/lib/constants";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "How home nursing charges work at Sehat Connect in Lahore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  // No figure, range or currency here or anywhere else on a card
  // (Decision Ledger #9) — the exact price is quoted on the first call.
  // The subline is PROMISES.payment verbatim.
  return ogImage({
    headline: "How our charges work",
    subline: PROMISES.payment.en,
  });
}
