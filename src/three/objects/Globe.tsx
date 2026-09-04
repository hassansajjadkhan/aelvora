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

  /*
   * WebP, not JPG/PNG. These two textures are the heaviest thing above the fold
   * on the homepage — they are loaded raw by three.js, so `next/image` never
   * touches them and none of the usual optimisation applies. Re-encoded at the
   * same 2048x1024 they went from 1.2 MB to 309 KB, which is ~909 KB off the
   * critical path for every first-time visitor.
   *
   * The originals are kept in /public so this is a one-line revert if the
   * globe ever looks wrong. Browser support is a non-issue: Next 16 already
   * targets Chrome/Edge/Firefox 111+ and Safari 16.4+, all of which decode WebP.
   */
  const [dayMap, nightMap] = useTexture([
    "/earth-day.webp",
    "/earth-night.webp",
  ]);

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
