import { NextResponse } from "next/server";
import { notify } from "@/lib/notify";

export async function GET() {
  // Ping Supabase to prevent free tier from pausing
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  await fetch(`${supabaseUrl}/rest/v1/bookings?limit=1`, {
    headers: {
      "apikey": supabaseKey,
      "Authorization": `Bearer ${supabaseKey}`,
    },
  }).catch(() => {});

  // Ping ntfy to keep subscription alive
  await notify({
    title: "Sehat Connect - System Online",
    priority: "min",
    tags: "white_check_mark",
    body: "Keepalive ping - Supabase and ntfy are active.",
  });

  return NextResponse.json({ ok: true });
}
