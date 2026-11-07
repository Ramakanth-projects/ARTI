"use client";

import { useEffect } from "react";

import { Button, ButtonLink } from "@/components/ui/button";
import { AlertIcon, HomeIcon, RefreshIcon } from "@/components/ui/icons";

/**
 * Route-level error boundary.
 *
 * Next.js 16 passes `retry` rather than the previous `reset` prop; calling it
 * re-fetches and re-renders the failed segment.
 */
export default function ErrorBoundary({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    // Surface the failure for observability without exposing it to the user.
    console.error("[ARTI] route error:", error);
  }, [error]);

  return (
    <div className="container-arti flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-wine-100 text-wine-700">
        <AlertIcon className="size-7" />
      </span>
      <h1 className="mt-5 text-2xl sm:text-3xl">Something went wrong</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground-muted">
        This part of the ARTI workspace could not be rendered. You can retry, or
        return to the workspace home.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => retry()}>
          <RefreshIcon className="size-4" />
          Try again
        </Button>
        <ButtonLink href="/" variant="outline">
          <HomeIcon className="size-4" />
          Return home
        </ButtonLink>
      </div>
    </div>
  );
}
