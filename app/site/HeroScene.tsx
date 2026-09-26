"use client";

import { useEffect, useRef } from "react";

const PETROL = 0x0e4157;
const ORANGE = 0xf39200;
const CYAN = 0x2bb3d1;

export function HeroScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 1, 1000);
      camera.position.z = 400;

      const rig = new THREE.Group();
      const circle = new THREE.Object3D();
      const skelet = new THREE.Object3D();
      rig.add(circle, skelet);
      scene.add(rig);

      const planetGeom = new THREE.IcosahedronGeometry(7, 1);
      const planetMat = new THREE.MeshPhongMaterial({ color: PETROL, flatShading: true, shininess: 60, specular: 0x335566 });
      const planet = new THREE.Mesh(planetGeom, planetMat);
      planet.scale.setScalar(16);
      circle.add(planet);

      const skeletGeom = new THREE.IcosahedronGeometry(15, 1);
      const skeletMat = new THREE.MeshBasicMaterial({ color: ORANGE, wireframe: true, transparent: true, opacity: 0.55 });
      const skeleton = new THREE.Mesh(skeletGeom, skeletMat);
      skeleton.scale.setScalar(10);
      skelet.add(skeleton);

      const nodeGeom = new THREE.SphereGeometry(0.32, 10, 10);
      const nodeMat = new THREE.MeshBasicMaterial({ color: ORANGE });
      const verts = skeletGeom.getAttribute("position");
      const seen = new Set<string>();
      const nodePos: [number, number, number][] = [];
      for (let i = 0; i < verts.count; i++) {
        const x = verts.getX(i), y = verts.getY(i), z = verts.getZ(i);
        const key = `${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        nodePos.push([x, y, z]);
      }
      const nodes = new THREE.InstancedMesh(nodeGeom, nodeMat, nodePos.length);
      const m = new THREE.Matrix4();
      nodePos.forEach(([x, y, z], i) => nodes.setMatrixAt(i, m.makeTranslation(x, y, z)));
      skeleton.add(nodes);

      const PARTICLES = window.innerWidth < 820 ? 260 : 520;
      const MIST = 0x9db7c3;
      const shardGeom = new THREE.TetrahedronGeometry(2, 0);
      const shardMat = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });
      const particles = new THREE.InstancedMesh(shardGeom, shardMat, PARTICLES);
      const dummy = new THREE.Object3D();
      const mist = new THREE.Color(MIST), petrol = new THREE.Color(PETROL), orange = new THREE.Color(ORANGE);
      for (let i = 0; i < PARTICLES; i++) {
        dummy.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(200 + Math.random() * 620);
        dummy.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        dummy.scale.setScalar(0.35 + Math.random() * 0.75);
        dummy.updateMatrix();
        particles.setMatrixAt(i, dummy.matrix);
        const r = Math.random();
        particles.setColorAt(i, r < 0.18 ? orange : r < 0.42 ? petrol : mist);
      }
      const particle = new THREE.Object3D();
      particle.add(particles);
      scene.add(particle);

      scene.add(new THREE.AmbientLight(0xffffff, 1.1));
      const key = new THREE.DirectionalLight(0xffffff, 1.9);
      key.position.set(1, 0, 0);
      const warm = new THREE.DirectionalLight(ORANGE, 1.7);
      warm.position.set(0.75, 1, 0.5);
      const cool = new THREE.DirectionalLight(CYAN, 2.6);
      cool.position.set(-0.75, -1, 0.5);
      scene.add(key, warm, cool);

      const layout = () => {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
        const halfW = halfH * camera.aspect;
        const rtl = getComputedStyle(el).direction === "rtl";
        const unit = (2 * halfH) / h;
        // perspective enlarges the 150-unit wireframe to ~240 units on screen
        const fit = (px: number) => (px * unit) / 240;
        if (w < 820) {
          const radiusPx = Math.min(w * 0.42, 170);
          rig.position.set(0, -halfH + (radiusPx + 30) * unit, 0);
          rig.scale.setScalar(fit(radiusPx));
        } else {
          const radiusPx = Math.min(h * 0.36, w * 0.17);
          rig.position.set((rtl ? -1 : 1) * halfW * 0.5, 0, 0);
          rig.scale.setScalar(fit(radiusPx));
        }
      };
      layout();
      const ro = new ResizeObserver(layout);
      ro.observe(el);

      const pointer = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let raf = 0;
      let visible = true;
      const frame = () => {
        particle.rotation.y -= 0.0012;
        circle.rotation.x -= 0.002;
        circle.rotation.y -= 0.003;
        skelet.rotation.x -= 0.001;
        skelet.rotation.y += 0.002;
        rig.rotation.y += (pointer.x * 0.25 - rig.rotation.y) * 0.04;
        rig.rotation.x += (pointer.y * 0.18 - rig.rotation.x) * 0.04;
        renderer.render(scene, camera);
        if (visible) raf = requestAnimationFrame(frame);
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible && !reduced) raf = requestAnimationFrame(frame);
      });
      if (reduced) renderer.render(scene, camera);
      else io.observe(el);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        [planetGeom, skeletGeom, nodeGeom, shardGeom].forEach((g) => g.dispose());
        [planetMat, skeletMat, nodeMat, shardMat].forEach((mat) => mat.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={host} className="pi-hero-scene" aria-hidden="true" />;
}
