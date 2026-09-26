"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Dictionary } from "../content";
import { LANG_COOKIE, type Lang } from "../content/lang";

type HeaderText = Pick<Dictionary, "ui" | "nav">;

function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("pi-theme", next); } catch {}
  };
  return <button className="pi-icon-toggle" type="button" onClick={toggle} aria-label={label} title={label}>
    <svg className="pi-theme-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"/></svg>
    <svg className="pi-theme-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg>
  </button>;
}

function LanguageToggle({ lang, ui }: { lang: Lang; ui: Dictionary["ui"] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const toggle = () => {
    const next: Lang = lang === "ar" ? "en" : "ar";
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  };
  return <button className="pi-icon-toggle pi-lang-toggle" type="button" onClick={toggle} disabled={pending} aria-label={ui.languageSwitchAria} title={ui.languageSwitch} lang={lang === "ar" ? "en" : "ar"}>
    {ui.languageSwitchShort}
  </button>;
}

export function SiteHeader({ t, lang }: { t: HeaderText; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      headerRef.current?.classList.toggle("is-scrolled", window.scrollY > 24);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${height > 0 ? Math.min(1, window.scrollY / height) : 0})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [pathname]);
  return <header className="pi-header" ref={headerRef}>
    <div className="pi-header-inner">
      <Link href="/" className="pi-brand" aria-label={t.ui.homeAria}>
        <img className="pi-brand-light" src="/brand/lockup.png" alt={t.ui.logoAlt} width="310" height="110" />
        <img className="pi-brand-dark" src="/brand/lockup-light.png" alt="" width="310" height="110" />
      </Link>
      <div className="pi-header-tools">
        <button className="pi-menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="pi-navigation" aria-label={open ? t.ui.closeMenu : t.ui.openMenu}>
          <span /><span />
        </button>
        <nav id="pi-navigation" className={`pi-nav${open ? " is-open" : ""}`} aria-label={t.ui.mainNav}>
          {t.nav.map(({ href, label }) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname === href || pathname?.startsWith(`${href}/`) ? "page" : undefined}>{label}</Link>)}
          <Link className="pi-button pi-button-small" href="/contact" onClick={() => setOpen(false)}>{t.ui.talkToExpert}</Link>
        </nav>
        <LanguageToggle lang={lang} ui={t.ui} />
        <ThemeToggle label={t.ui.themeToggle} />
      </div>
    </div>
    <span className="pi-reading-progress" ref={progressRef} aria-hidden="true" />
  </header>;
}
