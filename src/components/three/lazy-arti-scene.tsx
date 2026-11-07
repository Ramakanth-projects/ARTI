"use client";

import dynamic from "next/dynamic";

/**
 * Client-only loader for the ARTI 3D scene.
 *
 * WebGL is browser-only and the scene is purely decorative, so it is loaded
 * lazily with a stable skeleton fallback. This keeps the 3D bundle out of the
 * initial payload and out of the server render.
 */
const ArtiScene = dynamic(
  () => import("@/components/three/arti-scene").then((mod) => mod.ArtiScene),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full w-full place-items-center">
        <div className="size-24 animate-soft-pulse rounded-2xl bg-sand-300" />
      </div>
    ),
  },
);

export function LazyArtiScene({ className }: { className?: string }) {
  return <ArtiScene className={className} />;
}
