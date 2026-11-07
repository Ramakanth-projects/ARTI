import { Spinner } from "@/components/ui/spinner";

/**
 * Route-level loading state.
 *
 * Shown while a route segment streams in. The skeleton mirrors the workspace
 * layout so the transition feels stable rather than blank.
 */
export default function Loading() {
  return (
    <div className="container-arti py-8 sm:py-10" aria-busy="true">
      <div className="flex items-center gap-3">
        <Spinner />
        <p className="text-sm font-medium text-foreground-muted">
          Loading workspace…
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="h-40 animate-soft-pulse rounded-2xl bg-sand-200" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-soft-pulse rounded-xl bg-sand-200"
              style={{ animationDelay: `${index * 90}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
