/**
 * GlowOrb Component
 * 3D animated orb with custom shader material
 */

"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, ShaderMaterial } from "three";
import { vertexShader, fragmentShader } from "@/three/shaders/glowMaterial";

interface GlowOrbProps {
  scale?: number;
  color1?: string;
  color2?: string;
}

export const GlowOrb = ({
  scale = 1,
  color1 = "#8E5CFF",
  color2 = "#D8C8FF",
}: GlowOrbProps) => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!materialRef.current) return;

    // Convert hex colors to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (result) {
        return [
          parseInt(result[1], 16) / 255,
          parseInt(result[2], 16) / 255,
          parseInt(result[3], 16) / 255,
        ];
      }
      return [1, 0, 1];
    };

    materialRef.current.uniforms.uColor1.value = hexToRgb(color1);
    materialRef.current.uniforms.uColor2.value = hexToRgb(color2);
  }, [color1, color2]);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;

    timeRef.current += 0.016;

    // Rotate the orb
    meshRef.current.rotation.x += 0.0001;
    meshRef.current.rotation.y += 0.0002;
    meshRef.current.rotation.z += 0.00015;

    // Update shader time uniform
    materialRef.current.uniforms.uTime.value = timeRef.current;
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[1, 16]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uAmplitude: { value: 0.1 },
          uColor1: { value: [0.55, 0.36, 1.0] },
          uColor2: { value: [0.84, 0.78, 1.0] },
        }}
        wireframe={false}
        transparent
      />
    </mesh>
  );
};
