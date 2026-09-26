"use client";

import { lazy, Suspense, useSyncExternalStore } from "react";

// Three.js only runs in the browser, so the scene is loaded after mount.
const Logo3DScene = lazy(() => import("./Logo3D"));

const noop = () => () => {};

export default function Logo3D(props: { className?: string; label?: string }) {
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  // eslint-disable-next-line @next/next/no-img-element -- static placeholder while the 3D scene loads
  const fallback = <img src="/brand/mark.png" alt="" width={217} height={258} style={{ margin: "auto", opacity: 0.35 }} />;
  return (
    <div className={props.className} style={{ display: "grid", width: "100%", height: "100%" }}>
      {mounted ? <Suspense fallback={fallback}><Logo3DScene {...props} /></Suspense> : fallback}
    </div>
  );
}
