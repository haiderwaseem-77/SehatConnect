import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, area, careType, ref } = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // Save to Supabase
    const res = await fetch(`${supabaseUrl}/rest/v1/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Prefer": "return=minimal",
      },
      // NOTE: `care_type` requires a column on the Supabase `bookings` table
      // (text, nullable). Add it with:
      //   alter table bookings add column if not exists care_type text;
      body: JSON.stringify({ name, phone, area, care_type: careType || null, ref, status: "pending" }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Supabase error:", res.status, error);
      return NextResponse.json({ error }, { status: 500 });
    }

    // Send ntfy notification (fire and forget — don't let it block or crash)
    notify({
      title: "New Booking - Sehat Connect",
      priority: "high",
      tags: "hospital",
      body: `Name: ${name}\nPhone: ${phone}\nArea: ${area}\nCare: ${careType || "—"}\nRef: ${ref}`,
    }).catch(() => {});

    return NextResponse.json({ success: true });

  } catch (e) {
    console.error("API error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
