import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Lazily-constructed Supabase client.
 *
 * This module previously called createClient() at import time with non-null
 * assertions on the env vars. When the vars were unset — which is exactly the
 * state the production deployment was in — merely importing this file threw,
 * taking down whatever route imported it. Constructing on demand and returning
 * null when unconfigured means an unconfigured deployment degrades instead of
 * crashing.
 *
 * Lead capture (`app/api/book/route.ts`) deliberately does NOT use this client:
 * it talks to the REST endpoint directly so it can treat a database failure as
 * a recoverable condition rather than an exception.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    console.error(
      "getSupabase: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set.",
    );
    return null;
  }

  client = createClient(url, anonKey);
  return client;
}
