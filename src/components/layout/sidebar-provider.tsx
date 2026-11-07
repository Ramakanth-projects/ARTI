"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";

import { useIsDesktop } from "@/lib/hooks/use-media-query";

type SidebarContextValue = {
  /** Whether the off-canvas drawer is open (mobile and tablet). */
  isOpen: boolean;
  /** Whether the persistent desktop sidebar is collapsed to an icon rail. */
  isCollapsed: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  toggleCollapsed: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const isDesktop = useIsDesktop();

  // Drawer state is derived from the route and layout mode rather than synced in
  // an effect. Adjusting during render lets React discard the stale UI in the
  // same pass, which avoids a cascading render.
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [prevIsDesktop, setPrevIsDesktop] = useState(isDesktop);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (isOpen) setIsOpen(false);
  }

  // Once the persistent sidebar takes over, the drawer must not stay open and
  // reappear if the viewport shrinks again.
  if (isDesktop !== prevIsDesktop) {
    setPrevIsDesktop(isDesktop);
    if (isDesktop && isOpen) setIsOpen(false);
  }

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((value) => !value), []);
  const toggleCollapsed = useCallback(
    () => setIsCollapsed((value) => !value),
    [],
  );

  // Escape closes the drawer, matching the behaviour of the backdrop click.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Lock body scroll while the drawer covers the viewport.
  useEffect(() => {
    if (!isOpen || isDesktop) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen, isDesktop]);

  const value = useMemo(
    () => ({ isOpen, isCollapsed, open, close, toggle, toggleCollapsed }),
    [isOpen, isCollapsed, open, close, toggle, toggleCollapsed],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
