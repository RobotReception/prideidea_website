import type { Metadata } from "next";
import Logo3D from "../components/logo3d";

export const metadata: Metadata = {
  title: "الشعار ثلاثي الأبعاد",
  description: "شعار برايد آيديا: مصباح زجاجي بداخله دماغ متصل، بتقنية ثلاثية الأبعاد.",
};

export default function Logo3DPage() {
  return (
    <main id="main-content" style={{ height: "100svh", background: "#1c1916", position: "relative", overflow: "hidden" }}>
      <Logo3D />
      <p style={{ position: "absolute", insetInline: 0, bottom: 24, margin: 0, textAlign: "center", color: "#a8a097", fontSize: 14, pointerEvents: "none" }}>
        اسحب لتدوير الشعار
      </p>
    </main>
  );
}
