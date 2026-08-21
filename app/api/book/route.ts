import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";

/**
 * Lead capture — the single most important endpoint on the site.
 *
 * Design rule: NEVER LOSE A LEAD. A worried family member has just typed their
 * name and phone number; that intent must reach a human even if our database is
 * misconfigured, paused, or down. So the ntfy notification (which reaches a real
 * phone) is treated as an independent delivery channel, not as a nice-to-have
 * side effect of a successful database write.
 *
 * The endpoint therefore succeeds if EITHER channel delivered the lead, and only
 * fails when both did — in which case the client shows the call / WhatsApp
 * fallback, which is the honest thing to do.
 */

// Deliberately generous: Pakistani numbers get typed as 0328-8489988,
// +92 328 8489988, 03288489988 … all of which are fine. We only reject
// input that cannot plausibly be a phone number at all.
const MIN_PHONE_DIGITS = 7;
const MAX_FIELD_LENGTH = 200;

type LeadPayload = {
  name: string;
  phone: string;
  area: string;
  careType: string;
  ref: string;
};

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

async function saveToSupabase(lead: LeadPayload): Promise<boolean> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Missing env vars are a deployment problem, not a user problem. Log loudly
  // so it is obvious in the Vercel logs, then let the notification carry the lead.
  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "[lead] Supabase is not configured — set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY in the Vercel project. Lead not persisted.",
    );
    return false;
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      // NOTE: `care_type` requires a column on the Supabase `bookings` table
      // (text, nullable). Add it with:
      //   alter table bookings add column if not exists care_type text;
      body: JSON.stringify({
        name: lead.name,
        phone: lead.phone,
        area: lead.area,
        care_type: lead.careType || null,
        ref: lead.ref,
        status: "pending",
      }),
    });

    if (!res.ok) {
      // Log the detail server-side; never return it to the browser.
      console.error("[lead] Supabase rejected the insert:", res.status, await res.text());
      return false;
    }

    return true;
  } catch (e) {
    console.error("[lead] Supabase request failed:", e);
    return false;
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;
  const lead: LeadPayload = {
    name: clean(raw.name),
    phone: clean(raw.phone),
    area: clean(raw.area),
    careType: clean(raw.careType),
    ref: clean(raw.ref),
  };

  // Name + phone are the only required fields (NORTH-STAR: form = Name + Phone).
  // Mirror the client-side validation so a malformed direct POST cannot create
  // an un-callable lead row.
  if (!lead.name) {
    return NextResponse.json({ error: "name_required" }, { status: 400 });
  }
  if (lead.phone.replace(/\D/g, "").length < MIN_PHONE_DIGITS) {
    return NextResponse.json({ error: "phone_required" }, { status: 400 });
  }

  // Both channels run concurrently. Neither is allowed to throw — saveToSupabase
  // and notify both resolve to a boolean — so one failing never prevents the other
  // from delivering the lead.
  const [saved, notified] = await Promise.all([
    saveToSupabase(lead),
    notify({
      title: "New Lead - Sehat Connect",
      priority: "high",
      tags: "hospital",
      body:
        `Name: ${lead.name}\nPhone: ${lead.phone}\nArea: ${lead.area || "—"}\n` +
        `Care: ${lead.careType || "—"}\nRef: ${lead.ref}`,
    }),
  ]);

  if (saved && notified) {
    return NextResponse.json({ success: true });
  }

  // Degraded but delivered: a human will see this lead, so the family has done
  // their part and must not be told to try again.
  if (saved || notified) {
    console.warn(
      `[lead] Delivered on one channel only (supabase=${saved}, ntfy=${notified}) — ref ${lead.ref}. ` +
        "Fix the failing channel; the lead itself is safe.",
    );
    return NextResponse.json({ success: true, degraded: true });
  }

  // Nothing delivered. This is the only case where we may lose the lead, so it
  // is logged at the highest volume and the client shows call / WhatsApp instead.
  console.error(
    `[lead] LEAD LOST — neither Supabase nor ntfy accepted it. ref=${lead.ref} ` +
      `name=${lead.name} phone=${lead.phone}`,
  );
  return NextResponse.json({ error: "delivery_failed" }, { status: 503 });
}
