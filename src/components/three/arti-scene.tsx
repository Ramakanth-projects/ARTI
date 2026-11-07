"use client";

import { Canvas } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

import { cn } from "@/lib/utils/cn";

/**
 * ARTI 3D foundation.
 *
 * A restrained, brand-coloured scene that proves the React Three Fiber pipeline
 * is wired up and ready for later phases. It renders a slowly rotating
 * wireframe icosahedron in Wine Red over a Light Sand ground, with no external
 * assets and no GPU-heavy effects.
 *
 * The canvas is decorative: it is marked `aria-hidden` and the parent supplies
 * an accessible description.
 */

function BrandPolyhedron() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.y += delta * 0.28;
    mesh.rotation.x += delta * 0.09;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.35, 1]} />
      <meshStandardMaterial
        color="#9e3450"
        roughness={0.35}
        metalness={0.15}
        flatShading
      />
    </mesh>
  );
}

export function ArtiScene({ className }: { className?: string }) {
  const dpr = useMemo<[number, number]>(() => [1, 2], []);

  return (
    <div className={cn("relative h-full w-full", className)} aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        frameloop="always"
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 6, 5]} intensity={1.15} />
        <directionalLight position={[-5, -3, -4]} intensity={0.35} color="#cdb587" />
        <BrandPolyhedron />
      </Canvas>
    </div>
  );
}
