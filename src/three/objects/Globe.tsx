"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  earthVertexShader,
  earthFragmentShader,
  atmosphereVertexShader,
  atmosphereFragmentShader,
} from "@/three/shaders/globeShaders";

export const Globe = () => {
  const tiltGroup = useRef<THREE.Group>(null); // reacts to mouse
  const earthRef = useRef<THREE.Mesh>(null); // continuous spin

  const [dayMap, nightMap] = useTexture(["/earth-day.jpg", "/earth-night.png"]);

  // Texture tuning
  useMemo(() => {
    [dayMap, nightMap].forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      t.wrapS = THREE.RepeatWrapping;
    });
  }, [dayMap, nightMap]);

  const earthUniforms = useMemo(
    () => ({
      dayTexture: { value: dayMap },
      nightTexture: { value: nightMap },
      sunDirection: { value: new THREE.Vector3(0.75, 0.28, -0.7).normalize() },
      rimColor: { value: new THREE.Color("#8E5CFF") },
    }),
    [dayMap, nightMap]
  );

  const atmosphereUniforms = useMemo(
    () => ({ glowColor: { value: new THREE.Color("#8E5CFF") } }),
    []
  );

  useFrame((state, delta) => {
    // Earth spins on its axis
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.06;
    }

    // Whole globe gently tilts toward the cursor
    if (tiltGroup.current) {
      const targetY = state.pointer.x * 0.32;
      const targetX = -state.pointer.y * 0.22;
      tiltGroup.current.rotation.y = THREE.MathUtils.lerp(
        tiltGroup.current.rotation.y,
        targetY,
        0.045
      );
      tiltGroup.current.rotation.x = THREE.MathUtils.lerp(
        tiltGroup.current.rotation.x,
        targetX,
        0.045
      );
    }
  });

  return (
    <group ref={tiltGroup}>
      {/* Earth — axial tilt on Z, continuous spin on Y */}
      <mesh ref={earthRef} rotation={[0, 0, 0.41]}>
        <sphereGeometry args={[1, 96, 96]} />
        <shaderMaterial
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={earthUniforms}
        />
      </mesh>

      {/* Atmospheric glow */}
      <mesh scale={1.16}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          uniforms={atmosphereUniforms}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
