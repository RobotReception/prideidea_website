import type { Metadata } from "next";
import "./globals.css";
import "./site.css";
import { getContent, site } from "./content";
import { colorVariables } from "./content/colors";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getContent();
  return {
    metadataBase: new URL(site.siteUrl),
    title: { default: t.meta.siteName, template: `%s | ${t.meta.siteName}` },
    description: t.meta.description,
    keywords: t.meta.keywords,
    openGraph: { type: "website", locale: t.meta.ogLocale, siteName: t.meta.siteName, title: t.meta.siteName, description: t.meta.description },
    icons: { icon: "/brand/mark.png" },
  };
}

// Runs before first paint so the stored or system theme never flashes the wrong palette.
const themeScript = `try{var t=localStorage.getItem("pi-theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { lang, dir } = await getContent();
  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <style dangerouslySetInnerHTML={{ __html: colorVariables }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
