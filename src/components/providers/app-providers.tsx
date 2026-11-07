"use client";

import { ServiceWorkerRegistrar } from "@/components/providers/service-worker-registrar";
import { SupabaseProvider } from "@/components/providers/supabase-provider";

/**
 * Client-side provider boundary for the ARTI shell.
 *
 * Kept intentionally thin: it hosts only the context that genuinely needs to be
 * client-side, so the surrounding layout can stay a Server Component.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      {children}
      <ServiceWorkerRegistrar />
    </SupabaseProvider>
  );
}
