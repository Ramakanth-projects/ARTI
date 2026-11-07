import { cn } from "@/lib/utils/cn";

type BadgeTone = "neutral" | "brand" | "sand" | "outline";

const TONES: Record<BadgeTone, string> = {
  neutral: "bg-ink-100 text-ink-700",
  brand: "bg-wine-100 text-wine-800",
  sand: "bg-sand-200 text-sand-900",
  outline: "border border-border-strong text-foreground-muted",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        TONES[tone],
        className,
      )}
      {...props}
    />
  );
}
