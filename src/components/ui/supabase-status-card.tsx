"use client";

import { Badge } from "@/components/ui/badge";
import { DatabaseIcon } from "@/components/ui/icons";
import { useSupabaseStatus } from "@/components/providers/supabase-provider";

/**
 * Honest Supabase connection status.
 *
 * Reports the real state of the integration: whether the public environment
 * variables are present and valid. It never claims a working connection that
 * has not been verified, and it names the exact action needed when the project
 * is not yet linked.
 */
export function SupabaseStatusCard({ detail }: { detail: string | null }) {
  const { isConfigured } = useSupabaseStatus();

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-wine-100 text-wine-700">
          <DatabaseIcon className="size-5" />
        </span>
        <div className="flex flex-col gap-1">
          <p className="font-medium text-ink-900">Supabase integration</p>
          <p className="max-w-prose text-sm leading-relaxed text-foreground-muted">
            {isConfigured
              ? "Public environment variables are present and well formed. Browser and server clients are ready; no schema has been created in this step."
              : detail ??
                "Supabase is not configured. Add the public environment variables to activate the integration."}
          </p>
        </div>
      </div>
      <Badge
        tone={isConfigured ? "brand" : "sand"}
        className="w-fit shrink-0 self-start"
      >
        {isConfigured ? "Configured" : "Not configured"}
      </Badge>
    </div>
  );
}
