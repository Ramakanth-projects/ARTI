import { cn } from "@/lib/utils/cn";

/** Accessible indeterminate progress indicator. */
export function Spinner({
  className,
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span role="status" aria-live="polite" className="inline-flex">
      <span className="sr-only">{label}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className={cn("size-5 animate-spin text-wine-600", className)}
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2.5"
          className="opacity-20"
        />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
