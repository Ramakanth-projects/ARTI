import { connection } from "next/server";

import { isSupabaseConfigured } from "@/lib/config/env";
import { siteConfig } from "@/lib/config/site";

/**
 * Health check.
 *
 * `connection()` opts the handler into request-time rendering, which is correct
 * for a liveness probe: the response must reflect the running deployment rather
 * than a build-time snapshot.
 *
 * The payload reports only booleans about configuration. It never echoes
 * environment values, so it is safe to expose.
 */
export async function GET() {
  await connection();

  return Response.json(
    {
      status: "ok",
      application: siteConfig.name,
      version: siteConfig.version,
      stage: siteConfig.stage,
      timestamp: new Date().toISOString(),
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown",
      integrations: {
        supabase: isSupabaseConfigured ? "configured" : "not_configured",
      },
    },
    {
      headers: { "Cache-Control": "no-store" },
    },
  );
}
