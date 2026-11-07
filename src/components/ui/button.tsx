import Link from "next/link";
import { forwardRef } from "react";

import { cn } from "@/lib/utils/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-wine-600 text-sand-50 shadow-soft hover:bg-wine-700 active:bg-wine-800",
  secondary: "bg-sand-200 text-ink-900 hover:bg-sand-300 active:bg-sand-400",
  outline:
    "border border-border-strong bg-surface text-ink-800 hover:bg-sand-100 hover:border-wine-300 active:bg-sand-200",
  ghost: "text-ink-700 hover:bg-sand-200 active:bg-sand-300",
  danger: "bg-wine-800 text-sand-50 hover:bg-wine-900 active:bg-wine-950",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
  icon: "h-11 w-11 justify-center",
};

/**
 * Shared button styling. Exported so `<Link>` elements can render as buttons
 * without duplicating the variant classes.
 *
 * The default size is 44px tall so every control stays comfortably tappable on
 * touch devices.
 */
export function buttonStyles({
  variant = "primary",
  size = "md",
  block = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
} = {}): string {
  return cn(
    "inline-flex select-none items-center rounded-lg font-medium tracking-tight",
    "transition-[background-color,border-color,color,box-shadow] duration-150",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    block && "w-full",
    className,
  );
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders a full-width control, useful in stacked mobile layouts. */
  block?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    block = false,
    type = "button",
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonStyles({ variant, size, block, className })}
      {...props}
    />
  );
});

export type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
};

/** A navigation control styled as an ARTI button. */
export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  block = false,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonStyles({ variant, size, block, className })}
      {...props}
    />
  );
}
