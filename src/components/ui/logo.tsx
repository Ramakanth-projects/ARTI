import { cn } from "@/lib/utils/cn";

/**
 * ARTI wordmark.
 *
 * The monogram is a wine-red tile holding the letter "A"; the wordmark renders
 * the product name with a subtle, brand-consistent gradient. No external image
 * assets are required, so the mark stays crisp at any size.
 */
export function Logo({
  className,
  showWordmark = true,
  size = "md",
}: {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const tile = {
    sm: "size-8 text-base rounded-lg",
    md: "size-9 text-lg rounded-lg",
    lg: "size-12 text-2xl rounded-xl",
  }[size];

  const word = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  }[size];

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "grid place-items-center bg-gradient-to-br from-wine-600 to-wine-800 font-display font-semibold text-sand-50 shadow-soft",
          tile,
        )}
      >
        A
      </span>
      {showWordmark ? (
        <span
          className={cn(
            "font-display font-semibold tracking-tight text-ink-900",
            word,
          )}
        >
          ARTI
        </span>
      ) : null}
    </span>
  );
}
