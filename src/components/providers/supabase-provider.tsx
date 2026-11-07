"use client";

import { createContext, useContext, useMemo } from "react";

import { getSupabasePublicConfig } from "@/lib/config/env";

type SupabaseContextValue = {
  /** True when both public Supabase variables are present and well formed. */
  isConfigured: boolean;
};

const SupabaseContext = createContext<SupabaseContextValue>({
  isConfigured: false,
});

/**
 * Expose Supabase availability to the component tree.
 *
 * The value is derived from build-time public environment variables, so it is
 * identical on the server and the client and needs no subscription.
 */
export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo<SupabaseContextValue>(
    () => ({ isConfigured: getSupabasePublicConfig() !== null }),
    [],
  );

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabaseStatus(): SupabaseContextValue {
  return useContext(SupabaseContext);
}
