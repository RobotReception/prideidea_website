"use client";

import { useEffect, useRef } from "react";

const BG = 0x03080c;
const ORANGE = 0xf39200;
const ICE = 0x7fd4e8;
const PETROL = 0x0e4157;
const MAX_RIPPLES = 6;
const RIPPLE_LIFE = 8;

const RippleShader = {
  uniforms: {
    tDiffuse: { value: null },
    centers: { value: [] as unknown[] },
    times: { value: Array(MAX_RIPPLES).fill(0) },
    rippleOn: { value: Array(MAX_RIPPLES).fill(0) },
    aspect: { value: 1 },
  },
  vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `
    #define PI 3.14159265359
    #define MAX_RIPPLES ${MAX_RIPPLES}
    uniform sampler2D tDiffuse;
    uniform vec2 centers[MAX_RIPPLES];
    uniform float times[MAX_RIPPLES];
    uniform float rippleOn[MAX_RIPPLES];
    uniform float aspect;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      vec2 wave = vec2(0.0);
      for (int i = 0; i < MAX_RIPPLES; i++) {
        if (rippleOn[i] > 0.0) {
          vec2 d = vec2((uv.x - centers[i].x) * aspect, uv.y - centers[i].y);
          float dist = length(d);
          float t = times[i] * 0.3;
          if (dist < t && dist > 0.0001) {
            float decay = 1.0 / (1.0 + 0.6 * dist * dist);
            float fade = pow(smoothstep(6.0, 4.0, times[i]), 2.0);
            float edge = 1.0 - smoothstep(0.05, 1.0, dist);
            float amp = 0.03 * sin(10.0 * (t - dist)) + 0.01 * sin(5.0 * (t - dist) + PI);
            wave += normalize(d) * amp * decay * edge * fade;
          }
        }
      }
      gl_FragColor = texture2D(tDiffuse, clamp(uv + wave, 0.0, 1.0));
    }
  `,
};

export function HeroScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    const section = el?.parentElement;
    if (!el || !section) return;
    let disposed = false;
    let cleanup = () => {};

    Promise.all([
      import("three"),
      import("three/addons/postprocessing/EffectComposer.js"),
      import("three/addons/postprocessing/RenderPass.js"),
      import("three/addons/postprocessing/UnrealBloomPass.js"),
      import("three/addons/postprocessing/ShaderPass.js"),
    ]).then(([THREE, { EffectComposer }, { RenderPass }, { UnrealBloomPass }, { ShaderPass }]) => {
      if (disposed) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
      camera.position.z = 5;

      const ambient = new THREE.AmbientLight(0xffffff, 0.25);
      scene.add(ambient);
      const key = new THREE.PointLight(0xffffff, 60, 0, 2);
      key.position.set(5, 5, 5);
      const warm = new THREE.PointLight(ORANGE, 30, 0, 2);
      warm.position.set(-4, -3, 3);
      scene.add(key, warm);

      const sphere = new THREE.Group();
      scene.add(sphere);

      const innerGeo = new THREE.IcosahedronGeometry(1, 3);
      const innerMat = new THREE.MeshStandardMaterial({ color: 0x1b2a33, roughness: 0.45, metalness: 1, flatShading: true, transparent: true, opacity: 0.82 });
      sphere.add(new THREE.Mesh(innerGeo, innerMat));

      const outerGeo = new THREE.IcosahedronGeometry(1.15, 3);
      const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1 });
      sphere.add(new THREE.Mesh(outerGeo, wireMat));

      const dotsGeo = new THREE.BufferGeometry();
      dotsGeo.setAttribute("position", outerGeo.getAttribute("position").clone());
      const dotsMat = new THREE.PointsMaterial({ color: ORANGE, size: 0.028 });
      sphere.add(new THREE.Points(dotsGeo, dotsMat));

      const STARS = 1400;
      const starPos = new Float32Array(STARS * 3);
      const darkStars = new Float32Array(STARS * 3);
      const lightStars = new Float32Array(STARS * 3);
      const ice = new THREE.Color(ICE), orange = new THREE.Color(ORANGE), white = new THREE.Color(0xdfe9ee);
      const petrol = new THREE.Color(PETROL), steel = new THREE.Color(0x7d98a6);
      for (let i = 0; i < STARS; i++) {
        starPos.set([(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200], i * 3);
        const r = Math.random();
        const d = r < 0.2 ? orange : r < 0.65 ? ice : white;
        const l = r < 0.2 ? orange : r < 0.65 ? petrol : steel;
        darkStars.set([d.r, d.g, d.b], i * 3);
        lightStars.set([l.r, l.g, l.b], i * 3);
      }
      const starCol = darkStars.slice();
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      starGeo.setAttribute("color", new THREE.BufferAttribute(starCol, 3));
      const starMat = new THREE.PointsMaterial({ size: 0.1, vertexColors: true, sizeAttenuation: true });
      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.25, 0.4, 0.05);
      composer.addPass(bloom);
      RippleShader.uniforms.centers.value = Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector2(0.5, 0.5));
      const ripple = new ShaderPass(RippleShader);
      composer.addPass(ripple);

      const applyTheme = () => {
        const dark = document.documentElement.getAttribute("data-theme") === "dark";
        renderer.setClearColor(dark ? BG : 0xffffff, dark ? 1 : 0);
        bloom.enabled = dark;
        ambient.intensity = dark ? 0.25 : 1.5;
        key.intensity = dark ? 60 : 38;
        warm.intensity = dark ? 30 : 6;
        innerMat.color.setHex(dark ? 0x1b2a33 : 0xeef4f7);
        innerMat.metalness = dark ? 1 : 0.08;
        innerMat.roughness = dark ? 0.45 : 0.6;
        innerMat.opacity = dark ? 0.82 : 0.78;
        wireMat.color.setHex(dark ? 0xffffff : PETROL);
        wireMat.opacity = dark ? 0.1 : 0.3;
        dotsMat.size = dark ? 0.028 : 0.036;
        starMat.size = dark ? 0.1 : 0.14;
        const colors = starGeo.getAttribute("color") as InstanceType<typeof THREE.BufferAttribute>;
        colors.copyArray(dark ? darkStars : lightStars);
        colors.needsUpdate = true;
      };
      applyTheme();

      const ripples: { x: number; y: number; start: number }[] = [];
      const addRipple = (x: number, y: number) => {
        ripples.push({ x, y, start: performance.now() / 1000 });
        if (ripples.length > MAX_RIPPLES) ripples.shift();
      };
      const syncRipples = () => {
        const now = performance.now() / 1000;
        for (let i = ripples.length - 1; i >= 0; i--) if (now - ripples[i].start > RIPPLE_LIFE) ripples.splice(i, 1);
        const { centers, times, rippleOn } = ripple.uniforms;
        for (let i = 0; i < MAX_RIPPLES; i++) {
          const r = ripples[i];
          rippleOn.value[i] = r ? 1 : 0;
          if (r) { centers.value[i].set(r.x, r.y); times.value[i] = now - r.start; }
        }
      };

      const center = { x: 0.5, y: 0.5 };
      const layout = () => {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        composer.setSize(w, h);
        camera.aspect = w / h;
        const mobile = w < 820;
        const radiusPx = mobile ? Math.min(w * 0.34, 150) : Math.min(h * 0.3, w * 0.16);
        camera.position.z = (1.15 * h) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * radiusPx);
        const rtl = getComputedStyle(section).direction === "rtl";
        center.x = mobile ? 0.5 : rtl ? 0.25 : 0.75;
        center.y = mobile ? 1 - (radiusPx + 50) / h : 0.5;
        // shift the view window instead of the mesh so the sphere stays undistorted off-center
        camera.setViewOffset(w, h, (0.5 - center.x) * w, (0.5 - center.y) * h, w, h);
        camera.updateProjectionMatrix();
        ripple.uniforms.aspect.value = w / h;
      };
      layout();
      const ro = new ResizeObserver(layout);
      ro.observe(el);

      const pointer = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      const onDbl = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest("a, button, h1, p")) return;
        const rect = el.getBoundingClientRect();
        addRipple((e.clientX - rect.left) / rect.width, 1 - (e.clientY - rect.top) / rect.height);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      const themeObserver = new MutationObserver(() => {
        applyTheme();
        if (reduced) composer.render();
      });
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      section.addEventListener("dblclick", onDbl);

      let raf = 0;
      let visible = true;
      const tilt = new THREE.Euler();
      const frame = () => {
        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.003;
        stars.rotation.y += 0.0003;
        tilt.set(pointer.y * 0.12, pointer.x * 0.18, 0);
        scene.rotation.x += (tilt.x - scene.rotation.x) * 0.04;
        scene.rotation.y += (tilt.y - scene.rotation.y) * 0.04;
        syncRipples();
        composer.render();
        if (visible) raf = requestAnimationFrame(frame);
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible && !reduced) raf = requestAnimationFrame(frame);
      });
      if (reduced) composer.render();
      else {
        addRipple(center.x, 1 - center.y);
        io.observe(el);
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        themeObserver.disconnect();
        window.removeEventListener("pointermove", onMove);
        section.removeEventListener("dblclick", onDbl);
        [innerGeo, outerGeo, dotsGeo, starGeo].forEach((g) => g.dispose());
        [innerMat, wireMat, dotsMat, starMat].forEach((m) => m.dispose());
        composer.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={host} className="pi-hero-scene" aria-hidden="true" />;
}
