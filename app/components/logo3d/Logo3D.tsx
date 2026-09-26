"use client";

import { Suspense, useMemo, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  OrbitControls,
} from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { BRAIN_HOLES, BRAIN_NODES, BRAIN_OUTLINE } from "./brainShape";

const ORANGE = "#f39200";
const WHITE = "#f4f1ec";

// Outer silhouette of the bulb measured from the logo, in brain-height units
// (y = 0 is the brain's centre). [radius, y] pairs from the top down.
const BULB_PROFILE: [number, number][] = [
  [0.001, 0.63], [0.2, 0.6], [0.3, 0.55], [0.37, 0.5], [0.42, 0.44],
  [0.46, 0.38], [0.49, 0.3], [0.513, 0.2], [0.522, 0.1], [0.522, 0.02],
  [0.51, -0.07], [0.48, -0.16], [0.43, -0.25], [0.36, -0.32], [0.29, -0.38],
  [0.245, -0.44], [0.222, -0.5], [0.212, -0.56], [0.21, -0.62],
];

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
}

function toVectors(flat: number[]) {
  const points: THREE.Vector2[] = [];
  for (let i = 0; i < flat.length; i += 2) points.push(new THREE.Vector2(flat[i], flat[i + 1]));
  return points;
}

/** The orange brain: the traced logo mark, extruded and bevelled, with a signal pulse rising from the stem. */
function Brain({ animate }: { animate: boolean }) {
  const time = useRef({ value: 0 });

  const geometry = useMemo(() => {
    const shape = new THREE.Shape(toVectors(BRAIN_OUTLINE));
    shape.holes = BRAIN_HOLES.map((hole) => new THREE.Path(toVectors(hole)));
    const depth = 0.05;
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.008,
      bevelSegments: 5,
      curveSegments: 4,
    });
    geo.translate(0, 0, -depth / 2);
    geo.computeVertexNormals();
    return geo;
  }, []);

  const material = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: ORANGE,
      emissive: new THREE.Color(ORANGE),
      emissiveIntensity: 0.3,
      metalness: 0.35,
      roughness: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
    });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = time.current;
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vBrainPos;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvBrainPos = position;");
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vBrainPos;\nuniform float uTime;")
        .replace(
          "#include <emissivemap_fragment>",
          `#include <emissivemap_fragment>
          // distance travelled from the bottom of the stem up through the lobes
          float travel = length(vBrainPos.xy - vec2(0.0, -0.5));
          float band = fract(travel * 1.6 - uTime * 0.45);
          float pulse = smoothstep(0.0, 0.08, band) * (1.0 - smoothstep(0.08, 0.28, band));
          totalEmissiveRadiance *= 1.0 + pulse * 4.0;`,
        );
    };
    return mat;
  }, []);

  useFrame((_, delta) => {
    if (animate) time.current.value += delta;
  });

  return <mesh geometry={geometry} material={material} castShadow />;
}

/** Glowing synapse nodes sitting in the dark dots of the logo. */
function Nodes({ animate }: { animate: boolean }) {
  const refs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.current.forEach((mat, i) => {
      if (mat) mat.emissiveIntensity = animate ? 2.2 + Math.sin(t * 2.2 + i * 1.3) * 1.6 : 2.5;
    });
  });
  return (
    <group>
      {BRAIN_NODES.map(([x, y], i) => (
        <mesh key={`${x}:${y}`} position={[x, y, 0]}>
          <sphereGeometry args={[0.02, 24, 24]} />
          <meshStandardMaterial
            ref={(m) => { refs.current[i] = m; }}
            color="#fff6e5"
            emissive="#ffd9a0"
            emissiveIntensity={2.5}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Glass envelope, faint white rim like the logo's outline, and a screw cap. */
function Bulb() {
  const glass = useMemo(() => {
    const curve = new THREE.SplineCurve(BULB_PROFILE.map(([r, y]) => new THREE.Vector2(r - 0.02, y)));
    return new THREE.LatheGeometry(curve.getPoints(140), 128);
  }, []);

  const rim = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color(WHITE) } },
        vertexShader: `
          varying vec3 vNormal; varying vec3 vView;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position * 1.012, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: `
          uniform vec3 uColor; varying vec3 vNormal; varying vec3 vView;
          void main() {
            float f = pow(1.0 - abs(dot(normalize(vNormal), vView)), 4.0);
            gl_FragColor = vec4(uColor * f * 2.2, f);
          }`,
      }),
    [],
  );

  const threads = [-0.64, -0.68, -0.72, -0.76, -0.8];

  return (
    <group>
      <mesh geometry={glass}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.02}
          thickness={0.04}
          samples={6}
          resolution={512}
          transmission={1}
          roughness={0.04}
          ior={1.4}
          chromaticAberration={0.06}
          anisotropicBlur={0.1}
          distortion={0.08}
          distortionScale={0.4}
          temporalDistortion={0.05}
          clearcoat={1}
          attenuationDistance={2.5}
          attenuationColor="#fff4e6"
          color="#ffffff"
        />
      </mesh>
      <mesh geometry={glass} material={rim} />

      {/* screw cap */}
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.2, 0.19, 0.2, 64, 1, true]} />
        <meshPhysicalMaterial color={WHITE} metalness={0.9} roughness={0.25} clearcoat={0.6} side={THREE.DoubleSide} />
      </mesh>
      {threads.map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.016, 16, 96]} />
          <meshPhysicalMaterial color={WHITE} metalness={0.95} roughness={0.2} clearcoat={1} />
        </mesh>
      ))}
      <mesh position={[0, -0.84, 0]}>
        <cylinderGeometry args={[0.185, 0.1, 0.07, 64]} />
        <meshPhysicalMaterial color="#2a2522" metalness={0.2} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.885, 0]}>
        <sphereGeometry args={[0.06, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshPhysicalMaterial color={WHITE} metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Scene({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ pointer }, delta) => {
    const g = group.current;
    if (!g || !animate) return;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.45, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.18, 3, delta);
  });

  return (
    <>
      <color attach="background" args={["#1c1916"]} />
      <ambientLight intensity={0.25} />
      <spotLight position={[2.5, 3, 3]} angle={0.4} penumbra={1} intensity={22} castShadow />
      <pointLight position={[0, 0.1, 0.25]} color={ORANGE} intensity={1.6} distance={1.6} />

      <Float enabled={animate} speed={1.4} rotationIntensity={0.25} floatIntensity={0.5} floatingRange={[-0.04, 0.04]}>
        <group ref={group} position={[0, 0.12, 0]}>
          <Brain animate={animate} />
          <Nodes animate={animate} />
          <Bulb />
        </group>
      </Float>

      <ContactShadows position={[0, -0.95, 0]} opacity={0.55} scale={3} blur={2.6} far={1.2} color="#000000" />

      {/* Procedural studio lighting: no HDR download needed. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2} position={[0, 4, 1]} rotation-x={Math.PI / 2} scale={[3, 0.6, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[-3, 0.5, 1]} rotation-y={Math.PI / 2} scale={[0.25, 4, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[3, 0.5, 1]} rotation-y={-Math.PI / 2} scale={[0.25, 4, 1]} />
        <Lightformer form="rect" color={ORANGE} intensity={1.2} position={[0, -2, -3]} scale={[3, 0.4, 1]} />
      </Environment>

      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.25} intensity={0.8} radius={0.65} />
        <Vignette offset={0.25} darkness={0.75} />
      </EffectComposer>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={animate}
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
}

export default function Logo3D({ className, label = "شعار برايد آيديا ثلاثي الأبعاد" }: { className?: string; label?: string }) {
  const reducedMotion = usePrefersReducedMotion();
  return (
    <div className={className} role="img" aria-label={label} style={{ width: "100%", height: "100%", touchAction: "pan-y" }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.05, 2.9], fov: 38 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Suspense fallback={null}>
          <Scene animate={!reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
