import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getSupabasePublicConfig } from "@/lib/config/env";
import type { Database } from "@/types/database";

export type ArtiServerClient = ReturnType<typeof createServerClient<Database>>;

/**
 * Create a Supabase client for Server Components, Server Actions and Route
 * Handlers.
 *
 * The cookie adapter writes refreshed session cookies through the Next.js cookie
 * store. In Server Components the store is read-only, so the `setAll` call is
 * wrapped: Next.js throws when cookies are written outside an action or route
 * handler, and session refresh is handled there instead.
 *
 * Returns `null` when the project is not configured.
 */
export async function createClient(): Promise<ArtiServerClient | null> {
  const config = getSupabasePublicConfig();
  if (!config) return null;

  const cookieStore = await cookies();

  return createServerClient<Database>(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component render, where cookies are immutable.
        }
      },
    },
  });
}
