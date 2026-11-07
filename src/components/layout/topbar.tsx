"use client";

import { MenuIcon } from "@/components/ui/icons";
import { useSidebar } from "@/components/layout/sidebar-provider";
import { cn } from "@/lib/utils/cn";

/**
 * Sticky top bar for the workspace.
 *
 * On phones and tablets it exposes the navigation trigger. On desktop it offers
 * the sidebar collapse control. It respects the notch safe area in landscape.
 */
export function Topbar({ title }: { title?: string }) {
  const { open, isCollapsed, toggleCollapsed } = useSidebar();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-[var(--shell-topbar-height)] items-center gap-3",
        "border-b border-border bg-surface/85 px-4 backdrop-blur-md sm:px-6",
        "pt-safe pl-safe pr-safe",
      )}
    >
      <button
        type="button"
        onClick={open}
        className="grid size-11 shrink-0 place-items-center rounded-lg text-ink-700 transition-colors hover:bg-sand-200 hover:text-ink-900 lg:hidden"
        aria-label="Open navigation"
      >
        <MenuIcon />
      </button>

      <button
        type="button"
        onClick={toggleCollapsed}
        className="hidden size-11 shrink-0 place-items-center rounded-lg text-ink-700 transition-colors hover:bg-sand-200 hover:text-ink-900 lg:grid"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-pressed={isCollapsed}
      >
        <MenuIcon />
      </button>

      <p className="truncate font-display text-base font-semibold text-ink-900">
        {title ?? "Workspace"}
      </p>

      <span className="ml-auto hidden items-center gap-2 sm:flex">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-sand-100 px-3 py-1.5">
          <span
            className="size-2 rounded-full bg-wine-600"
            aria-hidden="true"
          />
          <span className="text-xs font-medium text-ink-700">
            Private workspace
          </span>
        </span>
      </span>
    </header>
  );
}
