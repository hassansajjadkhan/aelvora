"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Globe } from "@/three/objects/Globe";

interface GlobeSceneProps {
  className?: string;
}

export const GlobeScene = ({ className = "" }: GlobeSceneProps) => {
  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 4.55], fov: 45 }}
    >
      <Suspense fallback={null}>
        <Globe />
      </Suspense>
    </Canvas>
  );
};
