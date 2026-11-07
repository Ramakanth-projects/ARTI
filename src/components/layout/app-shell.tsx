"use client";

import { usePathname } from "next/navigation";

import { AppProviders } from "@/components/providers/app-providers";
import { SidebarProvider, useSidebar } from "@/components/layout/sidebar-provider";
import { DesktopSidebar, MobileSidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { allNavItems } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";

function usePageTitle(): string {
  const pathname = usePathname();
  const match = allNavItems
    .filter((item) => item.href !== "/")
    .find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    );
  return match?.label ?? "Workspace";
}

function ShellFrame({ children }: { children: React.ReactNode }) {
  const { isOpen, isCollapsed, close } = useSidebar();
  const title = usePageTitle();

  return (
    <div className="flex min-h-dvh w-full bg-background">
      <a
        href="#main-content"
        className={cn(
          "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]",
          "focus:rounded-lg focus:bg-wine-600 focus:px-4 focus:py-2 focus:text-sm",
          "focus:font-medium focus:text-sand-50 focus:shadow-raised",
        )}
      >
        Skip to main content
      </a>

      <DesktopSidebar collapsed={isCollapsed} />
      <MobileSidebar open={isOpen} onClose={close} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} />
        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 flex-1 px-safe pb-safe"
        >
          {children}
        </main>
        <footer className="border-t border-border px-safe py-5">
          <div className="container-arti flex flex-col gap-1 text-xs text-foreground-subtle sm:flex-row sm:items-center sm:justify-between">
            <p>
              {siteConfig.name} — {siteConfig.tagline}
            </p>
            <p>v{siteConfig.version} · {siteConfig.stage}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

/**
 * Root application shell.
 *
 * Owns the responsive layout: a persistent sidebar on desktop, an off-canvas
 * drawer on smaller screens, and a shared content workspace.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <SidebarProvider>
        <ShellFrame>{children}</ShellFrame>
      </SidebarProvider>
    </AppProviders>
  );
}
