import type { Metadata } from "next";
import { cookies } from "next/headers";
import ar from "./ar.json";
import en from "./en.json";
import site from "./site.json";
import { LANG_COOKIE, type Lang } from "./lang";

export { fill } from "./lang";

export type Dictionary = typeof ar;
export type Product = Dictionary["products"][number];
export type Service = Dictionary["services"][number];

// Typing en as Dictionary makes the build fail if en.json drifts from ar.json's shape.
const dictionaries: Record<Lang, Dictionary> = { ar, en };

export { site };

export async function getLang(): Promise<Lang> {
  return (await cookies()).get(LANG_COOKIE)?.value === "en" ? "en" : "ar";
}

export async function getContent() {
  const lang = await getLang();
  return { lang, dir: lang === "ar" ? "rtl" : "ltr", t: dictionaries[lang] } as const;
}

type PageMeta = { title: string; description: string; ogDescription: string };

export async function pageMetadata(pick: (t: Dictionary) => PageMeta, options: { absoluteTitle?: boolean } = {}): Promise<Metadata> {
  const { t } = await getContent();
  const meta = pick(t);
  return {
    title: options.absoluteTitle ? { absolute: meta.title } : meta.title,
    description: meta.description,
    openGraph: { title: meta.title, description: meta.ogDescription, locale: t.meta.ogLocale, type: "website" },
  };
}
