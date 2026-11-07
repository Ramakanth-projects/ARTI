"use client";

import { useEffect } from "react";

/**
 * Register the ARTI service worker.
 *
 * Registration is deferred until the window `load` event so it never competes
 * with first paint, and it is skipped outside production because a cached
 * worker makes local development confusing.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .catch((error) => {
          console.warn("[ARTI] service worker registration failed:", error);
        });
    };

    if (document.readyState === "complete") {
      register();
      return;
    }

    window.addEventListener("load", register, { once: true });
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
