import { forwardRef } from "react";

import { cn } from "@/lib/utils/cn";

const FIELD_BASE =
  "w-full rounded-lg border border-border-strong bg-surface px-3.5 text-ink-900 " +
  "placeholder:text-foreground-subtle transition-colors duration-150 " +
  "hover:border-ink-400 focus:border-wine-500 disabled:cursor-not-allowed disabled:opacity-60";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = "text", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(FIELD_BASE, "h-11 text-sm", className)}
      {...props}
    />
  );
});

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, rows = 4, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(FIELD_BASE, "resize-y py-2.5 text-sm", className)}
        {...props}
      />
    );
  },
);

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink-800">
        {label}
      </label>
      {children}
      {hint ? (
        <p id={`${htmlFor}-hint`} className="text-xs text-foreground-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
