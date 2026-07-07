import { WHATSAPP_NUMBER, CONTACT_PHONE_DISPLAY } from "@/lib/constants";

// Roman-Urdu prefills, matching the direction-6 mockup exactly.
export const GENERIC_WA_MSG =
  "Assalam o Alaikum, mujhe ghar par nurse/attendant chahiye. Rabta karein, shukriya.";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function serviceWaMsg(service: string): string {
  return `Assalam o Alaikum. Mujhe ghar par ${service} chahiye. Rates aur details bata dein, shukriya.`;
}

// Forwardable "share with family" summary for the receipt share button.
// No prices — prices are hidden from all public surfaces as of 2026-07-02
// (see PRICES comment in lib/constants.ts); leads with the free first-day
// trial and payment-after promises instead (PROMISES in lib/constants.ts).
export function receiptShareMsg(): string {
  return `Sehat Connect: ghar par qualified nurse ya attendant, CNIC-checked aur police-verified staff. Pehla din bilkul free — koi advance nahi, payment sirf shift ke baad. Call ya WhatsApp karein: ${CONTACT_PHONE_DISPLAY}.`;
}
