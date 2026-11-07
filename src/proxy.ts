import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabasePublicConfig } from "@/lib/config/env";
import type { Database } from "@/types/database";

/**
 * ARTI proxy (the Next.js 16 replacement for middleware).
 *
 * Two responsibilities:
 *
 * 1. Apply security headers to every document response. These are set here
 *    rather than in `next.config.ts` so a single nonce-free policy is applied
 *    consistently and can later be tightened for authenticated routes.
 * 2. Refresh the Supabase session when the project is configured, so Server
 *    Components always observe a valid token. When Supabase is not configured
 *    this is skipped entirely and the request passes through untouched.
 *
 * Proxy runs before rendering, so it must stay free of application state.
 */

const SECURITY_HEADERS: ReadonlyArray<readonly [string, string]> = [
  ["X-Content-Type-Options", "nosniff"],
  ["X-Frame-Options", "DENY"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["X-DNS-Prefetch-Control", "off"],
  [
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  ],
];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const config = getSupabasePublicConfig();
  if (config) {
    const supabase = createServerClient<Database>(config.url, config.anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    });

    // Touching the user record is what triggers a token refresh.
    await supabase.auth.getUser();
  }

  for (const [name, value] of SECURITY_HEADERS) {
    response.headers.set(name, value);
  }

  return response;
}

export const config = {
  /**
   * Run on document routes only. Static assets, image optimisation and the
   * event stream are excluded: the stream must not be buffered or rewritten,
   * and assets gain nothing from a header pass.
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons/|sw.js|robots.txt|api/events).*)",
  ],
};
