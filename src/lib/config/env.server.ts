import "server-only";

/**
 * Server-only secrets. Importing this module from a Client Component is a
 * build-time error, which keeps privileged keys out of the browser bundle.
 */

export type SupabaseServiceConfig = {
  url: string;
  serviceRoleKey: string;
};

/**
 * The service-role key bypasses Row Level Security. It is optional: the
 * foundation works with the anon key alone. Only read it when a server task
 * genuinely needs elevated access.
 */
export function getSupabaseServiceConfig(): SupabaseServiceConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) return null;
  return { url, serviceRoleKey };
}

export const hasSupabaseServiceRole = getSupabaseServiceConfig() !== null;
