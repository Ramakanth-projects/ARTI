"use client";

import { useEffect, useState } from "react";

/**
 * Track a CSS media query from React.
 *
 * Returns `false` during server rendering and the first client render so the
 * markup stays deterministic, then syncs to the real value after mount.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** True when the viewport is at least the desktop breakpoint (1024px). */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}
