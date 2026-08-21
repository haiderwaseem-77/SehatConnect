import { NextRequest, NextResponse } from "next/server";
import type { Lead, DeliveryResult } from "@/lib/lead/types";
import { appendToSheet } from "@/lib/lead/sheet";
import { sendWhatsApp } from "@/lib/lead/whatsapp";
import { sendTelegram } from "@/lib/lead/telegram";

/**
 * Lead capture. The single most important endpoint on the site.
 *
 * ONE RULE: never lose a lead. A frightened family member has just typed their
 * name and phone number. That intent must reach a human even when a service is
 * down, misconfigured, or rate-limiting us.
 *
 * So three independent channels run concurrently and the request succeeds if
 * ANY of them delivered:
 *
 *   Google Sheet  — the record the ops team works (call notes, status, outcome)
 *   WhatsApp      — the primary alert, in the app the team already lives in
 *   Telegram      — the backup alert; free, no verification, near-certain
 *
 * A total failure is the only case that returns an error, and the form then
 * shows call and WhatsApp buttons — the honest answer when we cannot promise
 * to ring back.
 *
 * Runs on the Node runtime, not edge: these are three outbound calls to three
 * third parties, and Node gives more generous limits than the edge runtime.
 */
export const runtime = "nodejs";

const MIN_PHONE_DIGITS = 7;
const MAX_FIELD = 200;
/** A human cannot read the form, type a name and a number, and submit this fast. */
const MIN_FILL_MS = 2500;
/** Same number twice inside this window is a double-tap, not a second enquiry. */
const DEDUPE_WINDOW_MS = 90_000;

/**
 * Best-effort duplicate suppression.
 *
 * Deliberately in-memory: serverless instances are not shared, so this catches
 * the common case (one person double-tapping submit) without adding a Redis
 * dependency to a business receiving a handful of leads a day. Genuine flood
 * protection belongs at the platform edge — turn on Vercel's firewall rate
 * limiting rather than rebuilding it here.
 */
const recent = new Map<string, number>();
function isDuplicate(phone: string): boolean {
  const now = Date.now();
  for (const [k, t] of recent) if (now - t > DEDUPE_WINDOW_MS) recent.delete(k);
  const key = phone.replace(/\D/g, "");
  if (recent.has(key)) return true;
  recent.set(key, now);
  return false;
}

const clean = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, MAX_FIELD) : "");

/** Readable, sortable, and unique — unlike the old 4-digit random, which collided. */
function makeRef(): string {
  const d = new Date();
  const stamp = [d.getUTCFullYear() % 100, d.getUTCMonth() + 1, d.getUTCDate()]
    .map((n) => String(n).padStart(2, "0"))
    .join("");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SC-${stamp}-${rand}`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
  const raw = (body ?? {}) as Record<string, unknown>;

  // --- Abuse checks. Silent 200s, never an error: a bot that learns which
  // --- rejection it triggered just edits its script and tries again.
  if (clean(raw.company)) {
    // Honeypot. Hidden from people, irresistible to form-fillers.
    console.warn("[lead] honeypot tripped — discarded");
    return NextResponse.json({ success: true });
  }
  const elapsed = Number(raw.elapsedMs);
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < MIN_FILL_MS) {
    console.warn(`[lead] submitted in ${elapsed}ms — too fast for a human, discarded`);
    return NextResponse.json({ success: true });
  }

  const name = clean(raw.name);
  const phone = clean(raw.phone);
  if (!name) return NextResponse.json({ error: "name_required" }, { status: 400 });
  if (phone.replace(/\D/g, "").length < MIN_PHONE_DIGITS) {
    return NextResponse.json({ error: "phone_required" }, { status: 400 });
  }

  if (isDuplicate(phone)) {
    // Their first submission is already on its way. Telling them it failed
    // would make them submit a third time.
    console.info("[lead] duplicate within the dedupe window — acknowledged, not re-sent");
    return NextResponse.json({ success: true, duplicate: true });
  }

  const lead: Lead = {
    name,
    phone,
    source: clean(raw.source) || "/",
    variant: clean(raw.variant) || "hero",
    area: clean(raw.area),
    // Server-generated. A client-supplied ref is not trustworthy and the old
    // one was Math.random() over 9,000 values, so collisions were certain.
    ref: makeRef(),
    receivedAt: new Date().toISOString(),
  };

  const results: DeliveryResult[] = await Promise.all([
    appendToSheet(lead),
    sendWhatsApp(lead),
    sendTelegram(lead),
  ]);

  const delivered = results.filter((r) => r.ok).map((r) => r.channel);
  // A channel nobody has set up yet is not a failure. WhatsApp may arrive weeks
  // after Telegram, and shouting about it on every single lead would teach the
  // team that the error log is noise — so the two are logged differently.
  const broken = results.filter((r) => !r.ok && r.configured);
  const notSetUp = results.filter((r) => !r.configured).map((r) => r.channel);

  for (const f of broken) {
    console.error(`[lead] channel ${f.channel} FAILED for ${lead.ref}: ${f.detail}`);
  }
  if (notSetUp.length) {
    console.info(`[lead] not configured, skipped: ${notSetUp.join(", ")}`);
  }

  if (delivered.length === 0) {
    // The only path where a lead can actually be lost. Log everything needed to
    // recover it by hand from the Vercel logs.
    console.error(
      `[lead] LEAD LOST — every channel failed. ref=${lead.ref} name=${lead.name} phone=${lead.phone}`,
    );
    return NextResponse.json({ error: "delivery_failed" }, { status: 503 });
  }

  if (broken.length > 0) {
    console.warn(
      `[lead] ${lead.ref} delivered on ${delivered.join(", ")} but ${broken
        .map((f) => f.channel)
        .join(", ")} is set up and failing. The lead is safe; fix the channel.`,
    );
  }

  return NextResponse.json({ success: true, ref: lead.ref, delivered });
}
