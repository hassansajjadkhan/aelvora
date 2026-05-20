/**
 * Vertex Shader
 * Handles 3D position transformations with wave animation
 */

export const vertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  
  uniform float uTime;
  uniform float uAmplitude;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    // Wave animation on vertices
    vec3 pos = position;
    pos.y += sin(pos.x * 3.0 + uTime * 0.001) * uAmplitude;
    pos.z += cos(pos.z * 3.0 + uTime * 0.001) * uAmplitude;
    
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

/**
 * Fragment Shader
 * Creates glow effect with purple/lilac colors
 */
export const fragmentShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  
  void main() {
    // Surface normal-based coloring
    vec3 normal = normalize(vNormal);
    float fresnel = 1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0)));
    
    // Animate between two colors
    vec3 color = mix(uColor1, uColor2, sin(uTime * 0.001) * 0.5 + 0.5);
    
    // Add glow based on fresnel effect
    float glow = fresnel * 0.8 + 0.2;
    
    gl_FragColor = vec4(color * glow, 0.9);
  }
`;
