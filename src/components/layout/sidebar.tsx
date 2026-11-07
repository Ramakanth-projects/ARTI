"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { Logo } from "@/components/ui/logo";
import { Badge } from "@/components/ui/badge";
import {
  ChatIcon,
  ClockIcon,
  CloseIcon,
  CodeIcon,
  CubeIcon,
  GameIcon,
  HomeIcon,
  ImageIcon,
  PinIcon,
  ProjectsIcon,
  SearchIcon,
  SparkleIcon,
  VideoIcon,
} from "@/components/ui/icons";
import { navigationSections } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";
import { useFocusTrap } from "@/lib/hooks/use-focus-trap";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/types";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  home: HomeIcon,
  chats: ChatIcon,
  pinned: PinIcon,
  images: ImageIcon,
  videos: VideoIcon,
  search: SearchIcon,
  projects: ProjectsIcon,
  apps: CodeIcon,
  games: GameIcon,
  magic: SparkleIcon,
};

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = isActivePath(pathname, item.href);
  const Icon = ICONS[item.id] ?? CubeIcon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
        "transition-colors duration-150",
        collapsed && "justify-center px-0",
        active
          ? "bg-wine-600 text-sand-50 shadow-soft"
          : "text-ink-700 hover:bg-sand-200 hover:text-ink-900",
      )}
    >
      <Icon className={cn("size-5", active ? "text-sand-50" : "text-ink-500 group-hover:text-wine-600")} />
      {!collapsed ? (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.planned ? (
            <span
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                active ? "bg-sand-50/70" : "bg-ink-300",
              )}
              aria-hidden="true"
            />
          ) : null}
        </>
      ) : null}
    </Link>
  );
}

function SidebarBody({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav
      aria-label="Primary"
      className="flex h-full flex-col gap-6 overflow-y-auto overscroll-contain px-3 py-4"
    >
      {navigationSections.map((section) => (
        <div key={section.id} className="flex flex-col gap-1.5">
          {!collapsed ? (
            <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              {section.label}
            </h2>
          ) : (
            <span className="sr-only">{section.label}</span>
          )}
          {section.items.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ))}

      {!collapsed ? (
        <div className="mt-auto rounded-xl border border-border bg-surface p-3.5">
          <div className="flex items-center gap-2 text-ink-800">
            <ClockIcon className="size-4 text-wine-600" />
            <p className="text-xs font-semibold">{siteConfig.stage}</p>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-foreground-subtle">
            Navigation modules marked with a dot are planned for later steps and
            are not implemented yet.
          </p>
        </div>
      ) : null}
    </nav>
  );
}

function SidebarHeader({
  collapsed,
  onClose,
}: {
  collapsed: boolean;
  onClose?: () => void;
}) {
  return (
    <div
      className={cn(
        "flex h-[var(--shell-topbar-height)] shrink-0 items-center gap-3 border-b border-border px-4",
        collapsed && "justify-center px-0",
      )}
    >
      <Link
        href="/"
        onClick={onClose}
        className="rounded-lg focus-visible:outline-2"
        aria-label={`${siteConfig.name} home`}
      >
        <Logo showWordmark={!collapsed} />
      </Link>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="ml-auto grid size-11 place-items-center rounded-lg text-ink-600 transition-colors hover:bg-sand-200 hover:text-ink-900 lg:hidden"
          aria-label="Close navigation"
        >
          <CloseIcon />
        </button>
      ) : null}
    </div>
  );
}

/** Persistent sidebar for desktop layouts, collapsible to an icon rail. */
export function DesktopSidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <aside
      aria-label="Sidebar"
      className={cn(
        "sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-border bg-surface lg:flex",
        "transition-[width] duration-200 ease-out",
        collapsed ? "w-[4.75rem]" : "w-[var(--shell-sidebar-width)]",
      )}
    >
      <SidebarHeader collapsed={collapsed} />
      <SidebarBody collapsed={collapsed} />
      <div className="shrink-0 border-t border-border px-4 py-3">
        {!collapsed ? (
          <p className="text-[0.6875rem] text-foreground-subtle">
            v{siteConfig.version} · Private workspace
          </p>
        ) : (
          <Badge tone="brand" className="mx-auto block w-fit">
            A
          </Badge>
        )}
      </div>
    </aside>
  );
}

/** Off-canvas drawer used on phones and tablets. */
export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(drawerRef, open);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close navigation"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink-950/45 backdrop-blur-[2px] transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={cn(
          "absolute inset-y-0 left-0 flex w-[min(19rem,86vw)] flex-col bg-surface shadow-overlay",
          "pt-safe pb-safe pl-safe transition-transform duration-250 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarHeader collapsed={false} onClose={onClose} />
        <SidebarBody collapsed={false} onNavigate={onClose} />
      </div>
    </div>
  );
}
