import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "برايد آيديا | حلول ذكاء اصطناعي للمؤسسات",
  description: "برايد آيديا شركة يمنية تطور حلول الذكاء الاصطناعي المؤسسية والأتمتة الذكية باللغة العربية.",
  icons: { icon: "/prideidea-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
