/**
 * Shaders for the Hero globe — day/night Earth + atmospheric glow.
 */

export const earthVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const earthFragmentShader = /* glsl */ `
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform vec3 sunDirection;
  uniform vec3 rimColor;

  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vec3 normal = normalize(vNormal);

    vec3 day = texture2D(dayTexture, vUv).rgb;
    vec3 night = texture2D(nightTexture, vUv).rgb;

    // How lit this point is by the sun
    float lightAmount = dot(normal, normalize(sunDirection));
    float dayMix = smoothstep(-0.12, 0.38, lightAmount);

    // Night side: very dark continents + warm glowing city lights
    vec3 darkContinents = day * 0.06;
    vec3 cityLights = night * vec3(1.75, 1.5, 1.05) * 2.4;
    vec3 nightColor = darkContinents + cityLights;

    // Day side stays gently lit
    vec3 dayColor = day * 1.05;

    vec3 color = mix(nightColor, dayColor, dayMix);

    // Purple atmospheric rim toward the silhouette edge
    float rim = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 3.0);
    color += rimColor * rim * 0.7;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const atmosphereVertexShader = /* glsl */ `
  varying vec3 vNormal;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const atmosphereFragmentShader = /* glsl */ `
  uniform vec3 glowColor;
  varying vec3 vNormal;

  void main() {
    float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
    intensity = clamp(intensity, 0.0, 1.0);
    gl_FragColor = vec4(glowColor, 1.0) * intensity;
  }
`;
