/**
 * Environment configuration and validation.
 *
 * Public values are read from `NEXT_PUBLIC_*` variables, which Next.js inlines
 * into the browser bundle at build time. Server-only secrets are read in
 * `env.server.ts`, which imports `server-only` so it can never leak to a client
 * bundle.
 *
 * Nothing here throws at import time: a missing Supabase project must not break
 * the build or the app shell. Callers use `isSupabaseConfigured` to render an
 * honest "not configured" state instead of pretending the integration works.
 */

export type SupabasePublicConfig = {
  url: string;
  anonKey: string;
};

const SUPABASE_URL_PATTERN = /^https:\/\/[a-z0-9-]+(\.[a-z0-9-]+)+$/i;
const MIN_KEY_LENGTH = 20;

function readPublic(name: string): string | undefined {
  const raw = process.env[name];
  const value = raw?.trim();
  return value ? value : undefined;
}

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = readPublic("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = readPublic("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !anonKey) return null;
  if (!SUPABASE_URL_PATTERN.test(url)) return null;
  if (anonKey.length < MIN_KEY_LENGTH) return null;

  return { url, anonKey };
}

export const isSupabaseConfigured = getSupabasePublicConfig() !== null;

/**
 * Human-readable reason the Supabase integration is inactive, or `null` when it
 * is ready. Surfaced in the UI so the exact missing action is always explicit.
 */
export function getSupabaseConfigIssue(): string | null {
  if (isSupabaseConfigured) return null;

  const url = readPublic("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = readPublic("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url && !anonKey) {
    return "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are not set.";
  }
  if (!url) return "NEXT_PUBLIC_SUPABASE_URL is not set.";
  if (!anonKey) return "NEXT_PUBLIC_SUPABASE_ANON_KEY is not set.";
  if (!SUPABASE_URL_PATTERN.test(url)) {
    return "NEXT_PUBLIC_SUPABASE_URL is not a valid https URL.";
  }
  return "NEXT_PUBLIC_SUPABASE_ANON_KEY looks too short to be a valid key.";
}
