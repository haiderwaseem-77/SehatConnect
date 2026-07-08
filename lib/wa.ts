import { WHATSAPP_NUMBER, CONTACT_PHONE_DISPLAY } from "@/lib/constants";

// Roman-Urdu prefills, matching the direction-6 mockup exactly.
export const GENERIC_WA_MSG =
  "Assalam o Alaikum, mujhe ghar par nurse ya attendant chahiye. Bara-e-karam rabta kar lein, shukriya.";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function serviceWaMsg(service: string): string {
  return `Assalam o Alaikum. Mujhe ghar par ${service} chahiye. Price aur details bata dein, shukriya.`;
}

// Forwardable "share with family" summary for the receipt share button.
// No prices — prices are hidden from all public surfaces as of 2026-07-02
// (see PRICES comment in lib/constants.ts); leads with approval-based payment,
// package options, and replacement support.
export function receiptShareMsg(): string {
  return `Sehat Connect: ghar par nurse ya attendant ka bandobast. Payment tab shuru hoti hai jab family nurse/attendant se mutmain ho. Agar fit na lage to replacement arrange kar dete hain. Daily, weekly aur monthly options available. Call ya WhatsApp: ${CONTACT_PHONE_DISPLAY}.`;
}
