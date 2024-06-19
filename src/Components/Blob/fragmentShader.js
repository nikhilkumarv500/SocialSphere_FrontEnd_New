const fragmentShader = `
uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    float distort = 1.0 - (3.0 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time)); 

    vec3 color = vec3(0.2); // Base color set to light grey

    // Add light green particles
    vec3 neonGreen = vec3(0.3, 1.3, 0.5); // Light neon green
    float particleDist = fract(sin(dot(vUv.xy ,vec2(12.9898,78.233))) * 43758.5453);
    color += mix(vec3(0.2), neonGreen, step(0.995, particleDist) * step(distort, 0.5));

    // Add light grey shading instead of white
    vec3 lightGrey = vec3(0.9); 
    color += mix(vec3(0.1), lightGrey, distort * 0.5); 

    // Adjust color to ensure it's not too bright
    color = clamp(color, 0.3, 1.0);

    // Add extra light green particle effect
    float particleEffect = fract(sin(dot(vUv.xy ,vec2(12.9898,78.233))) * 43758.5453);
    color += mix(vec3(0.0, 1.0, 0.5), vec3(0.0), step(0.99, particleEffect));

    gl_FragColor = vec4(color, 1.0); 
}

`;

export default fragmentShader;