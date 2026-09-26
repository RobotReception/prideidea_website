import type { Metadata } from "next";
import "./globals.css";
import "./site.css";
import "./landing.css";
import "./editorial.css";
import "./theme.css";

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

// Runs before first paint so the stored or system theme never flashes the wrong palette.
const themeScript = `try{var t=localStorage.getItem("pi-theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
