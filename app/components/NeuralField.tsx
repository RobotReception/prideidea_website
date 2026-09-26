"use client";

import { useEffect, useRef } from "react";

/**
 * حقل عصبي حيّ — عقد وروابط ونبضات إشارة تنتشر من النواة إلى الأطراف.
 * يرسم على Canvas بدقة الشاشة، ويتوقف خارج نطاق الرؤية أو عند تفضيل تقليل الحركة.
 */

type Node = {
  bx: number; by: number;   // القاعدة (نسبي من -1 إلى 1)
  x: number; y: number;     // الموضع المرسوم بالبكسل
  r: number;
  hub: boolean;
  phase: number;
  drift: number;
  energy: number;           // توهج مؤقت عند مرور نبضة
};

type Edge = { a: number; b: number; len: number };
type Pulse = { e: number; t: number; speed: number; dir: 1 | -1 };

const AMBER = "243, 146, 0";
const CYAN_DARK = "127, 212, 232";
const CYAN_LIGHT = "14, 65, 87";

export default function NeuralField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getTheme = () => document.documentElement.getAttribute("data-theme") || "dark";
    let lightTheme = getTheme() === "light";
    let CYAN = lightTheme ? CYAN_LIGHT : CYAN_DARK;
    let edgeColor = lightTheme ? "27, 91, 111" : "190, 220, 235";
    let nodeColor = lightTheme ? "16, 77, 95" : "214, 236, 246";

    const themeObs = new MutationObserver(() => {
      lightTheme = getTheme() === "light";
      CYAN = lightTheme ? CYAN_LIGHT : CYAN_DARK;
      edgeColor = lightTheme ? "27, 91, 111" : "190, 220, 235";
      nodeColor = lightTheme ? "16, 77, 95" : "214, 236, 246";
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    let w = 0, h = 0, cx = 0, cy = 0, scale = 0;
    let raf = 0;
    let running = true;
    let t0 = performance.now();

    const pointer = { x: 0, y: 0, active: false };

    /* ---------- بناء الطوبولوجيا ---------- */
    const nodes: Node[] = [];
    const rings = [
      { count: 7, rad: 0.12, r: 3.0, hub: true },
      { count: 12, rad: 0.24, r: 2.3, hub: true },
      { count: 18, rad: 0.38, r: 1.9, hub: false },
      { count: 22, rad: 0.54, r: 1.7, hub: false },
      { count: 28, rad: 0.72, r: 1.5, hub: false },
      { count: 32, rad: 0.92, r: 1.3, hub: false },
      { count: 36, rad: 1.15, r: 1.2, hub: false },
      { count: 30, rad: 1.40, r: 1.1, hub: false },
    ];

    rings.forEach((ring, ri) => {
      for (let i = 0; i < ring.count; i++) {
        const a = (i / ring.count) * Math.PI * 2 + ri * 0.42;
        const jitter = 0.86 + Math.random() * 0.3;
        nodes.push({
          bx: Math.cos(a) * ring.rad * jitter,
          by: Math.sin(a) * ring.rad * jitter * 0.9,
          x: 0, y: 0,
          r: ring.r,
          hub: ring.hub,
          phase: Math.random() * Math.PI * 2,
          drift: 0.16 + Math.random() * 0.3,
          energy: 0,
        });
      }
    });

    const edges: Edge[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].bx - nodes[j].bx;
        const dy = nodes[i].by - nodes[j].by;
        const d = Math.hypot(dx, dy);
        if (d < 0.28) edges.push({ a: i, b: j, len: d });
      }
    }
    // خيوط شعاعية من النواة إلى العقد المحورية
    const hubIdx = nodes.map((n, i) => (n.hub ? i : -1)).filter((i) => i >= 0);

    const pulses: Pulse[] = [];
    const spawnPulse = () => {
      if (pulses.length > 40 || edges.length === 0) return;
      pulses.push({
        e: (Math.random() * edges.length) | 0,
        t: 0,
        speed: 0.35 + Math.random() * 0.65,
        dir: Math.random() > 0.5 ? 1 : -1,
      });
    };
    for (let i = 0; i < 22; i++) { spawnPulse(); pulses[pulses.length - 1].t = Math.random(); }

    /* ---------- القياس ---------- */
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h / 2;
      scale = Math.max(w, h) * 0.52;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ---------- التفاعل ---------- */
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x > -80 && pointer.x < rect.width + 80 &&
        pointer.y > -80 && pointer.y < rect.height + 80;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !reduced) { t0 = performance.now(); raf = requestAnimationFrame(frame); }
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    /* ---------- الرسم ---------- */
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const px = pointer.active ? (pointer.x - cx) / (w / 2) : 0;
      const py = pointer.active ? (pointer.y - cy) / (h / 2) : 0;

      // مواضع العقد
      for (const n of nodes) {
        const wobble = Math.sin(time * n.drift + n.phase) * 0.022;
        const par = n.hub ? 10 : 20; // العقد الخارجية تتحرك أكثر → عمق
        n.x = cx + (n.bx + wobble) * scale + px * par;
        n.y = cy + (n.by + wobble * 0.8) * scale + py * par;
        n.energy *= 0.94;
      }

      // الروابط
      ctx.lineWidth = 1;
      for (const e of edges) {
        const A = nodes[e.a], B = nodes[e.b];
        const base = 0.18 * (1 - e.len / 0.28) + (lightTheme ? 0.06 : 0.045);
        const heat = Math.max(A.energy, B.energy);
        if (heat > 0.02) {
          ctx.strokeStyle = `rgba(${AMBER}, ${Math.min(0.62, base + heat * 0.7)})`;
        } else {
          ctx.strokeStyle = `rgba(${edgeColor}, ${base})`;
        }
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }

      // خيوط النواة → العقد المحورية
      ctx.strokeStyle = `rgba(${AMBER}, 0.13)`;
      ctx.setLineDash([3, 6]);
      for (const i of hubIdx) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nodes[i].x, nodes[i].y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // النبضات
      ctx.globalCompositeOperation = "lighter";
      for (const p of pulses) {
        const e = edges[p.e];
        if (!e) continue;
        const A = nodes[e.a], B = nodes[e.b];
        const t = p.dir === 1 ? p.t : 1 - p.t;
        const x = A.x + (B.x - A.x) * t;
        const y = A.y + (B.y - A.y) * t;

        const g = ctx.createRadialGradient(x, y, 0, x, y, 13);
        g.addColorStop(0, `rgba(${AMBER}, 0.95)`);
        g.addColorStop(0.35, `rgba(${AMBER}, 0.35)`);
        g.addColorStop(1, `rgba(${AMBER}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(255, 236, 205, 0.95)";
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // العقد
      for (const n of nodes) {
        const near = pointer.active
          ? Math.max(0, 1 - Math.hypot(n.x - pointer.x, n.y - pointer.y) / 130)
          : 0;
        const lift = n.energy + near * 0.85;
        const rr = n.r + lift * 2.4;

        if (lift > 0.05 || n.hub) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rr * 6);
          const col = n.hub ? AMBER : CYAN;
          g.addColorStop(0, `rgba(${col}, ${0.28 + lift * 0.45})`);
          g.addColorStop(1, `rgba(${col}, 0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.x, n.y, rr * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = n.hub
          ? `rgba(255, 205, 130, ${0.85 + lift * 0.15})`
          : `rgba(${nodeColor}, ${0.5 + lift * 0.5})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, rr, 0, Math.PI * 2);
        ctx.fill();

        if (n.hub) {
          ctx.strokeStyle = `rgba(${AMBER}, ${0.3 + lift * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, rr + 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - t0) / 1000, 0.05);
      t0 = now;
      time += dt;

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += dt * p.speed;
        if (p.t >= 1) {
          const e = edges[p.e];
          if (e) {
            nodes[p.dir === 1 ? e.b : e.a].energy = 1;
            // انتشار: النبضة تُولّد نبضة على رابط مجاور
            if (Math.random() < 0.72) {
              const endNode = p.dir === 1 ? e.b : e.a;
              const next = edges.findIndex(
                (q, qi) => qi !== p.e && (q.a === endNode || q.b === endNode) && Math.random() < 0.35
              );
              if (next >= 0) {
                pulses.push({
                  e: next,
                  t: 0,
                  speed: 0.35 + Math.random() * 0.6,
                  dir: edges[next].a === endNode ? 1 : -1,
                });
              }
            }
          }
          pulses.splice(i, 1);
        }
      }
      if (pulses.length < 20) spawnPulse();

      draw();
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      time = 3;
      draw();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObs.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="neural-canvas" aria-hidden="true" />;
}
