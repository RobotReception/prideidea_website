import type { Metadata } from "next";
import "./globals.css";
import "./site.css";
import "./landing.css";
import "./editorial.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://prideidea.com"),
  title: { default: "برايد آيديا", template: "%s | برايد آيديا" },
  description:
    "حلول ذكاء اصطناعي مؤسسية باللغة العربية من صنعاء.",
  keywords: [
    "ذكاء اصطناعي", "حلول مؤسسية", "AI", "enterprise", "DarAI", "Pride Idea", "Yemen",
  ],
  openGraph: { type: "website", locale: "ar_YE", siteName: "برايد آيديا", title: "برايد آيديا", description: "حلول ذكاء اصطناعي مؤسسية باللغة العربية من صنعاء." },
  icons: { icon: "/brand/mark.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
