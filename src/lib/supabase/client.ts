"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicConfig } from "@/lib/config/env";
import type { Database } from "@/types/database";

export type ArtiBrowserClient = ReturnType<typeof createBrowserClient<Database>>;

/**
 * Create a Supabase client for browser code.
 *
 * Returns `null` when the project is not configured so callers can render an
 * honest unconfigured state instead of throwing at import time.
 */
export function createClient(): ArtiBrowserClient | null {
  const config = getSupabasePublicConfig();
  if (!config) return null;

  return createBrowserClient<Database>(config.url, config.anonKey);
}
