/**
 * Hero3DScene Component
 * React Three Fiber scene with lighting and animated objects
 */

"use client";

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Preload } from "@react-three/drei";
import { GlowOrb } from "@/three/objects/GlowOrb";

interface Hero3DSceneProps {
  className?: string;
}

const SceneContent = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#8E5CFF" />
      
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 2.5]} fov={75} />

      {/* 3D Objects */}
      <GlowOrb scale={1.2} color1="#8E5CFF" color2="#D8C8FF" />

      {/* Performance optimization */}
      <Preload all />
    </>
  );
};

export const Hero3DScene = ({ className = "" }: Hero3DSceneProps) => {
  return (
    <Canvas className={className}>
      <SceneContent />
    </Canvas>
  );
};
