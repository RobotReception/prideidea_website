"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "ar" | "en";
type Theme = "dark" | "light";

type SiteCtx = {
  lang: Lang;
  theme: Theme;
  setLang: (l: Lang) => void;
  setTheme: (t: Theme) => void;
  t: (ar: string, en: string) => string;
};

const Ctx = createContext<SiteCtx>({
  lang: "ar",
  theme: "dark",
  setLang: () => {},
  setTheme: () => {},
  t: (ar) => ar,
});

export const useSite = () => useContext(Ctx);

export default function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("pi-lang") as Lang | null;
    const savedTheme = localStorage.getItem("pi-theme") as Theme | null;
    if (savedLang) setLangState(savedLang);
    if (savedTheme) setThemeState(savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("pi-lang", lang);
  }, [lang, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pi-theme", theme);
  }, [theme, mounted]);

  const setLang = (l: Lang) => setLangState(l);
  const setTheme = (t: Theme) => setThemeState(t);
  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);

  return (
    <Ctx.Provider value={{ lang, theme, setLang, setTheme, t }}>
      {children}
    </Ctx.Provider>
  );
}
