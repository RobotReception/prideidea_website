"use client";

import { useEffect, useState } from "react";
import { useSite } from "../context/SiteContext";

const linksData = [
  { href: "#darai", ar: "DarAI", en: "DarAI" },
  { href: "#solutions", ar: "الحلول", en: "Solutions" },
  { href: "#products", ar: "المنتجات", en: "Products" },
  { href: "#services", ar: "الخدمات", en: "Services" },
  { href: "#cases", ar: "قصص النجاح", en: "Success Stories" },
  { href: "#about", ar: "من نحن", en: "About" },
];

export default function Navbar() {
  const { lang, theme, setLang, setTheme, t } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}>
        <div className="shell nav-inner">
          <a className="brand" href="#top" aria-label="Pride Idea — Home">
            <img
              className="brand-lockup"
              src="/brand/lockup.png"
              alt="Pride Idea — Artificial Intelligence Systems"
              width="156"
              height="64"
            />
          </a>

          <nav className="nav-links" aria-label={t("التنقل الرئيسي", "Main navigation")}>
            {linksData.map((l) => (
              <a key={l.href} href={l.href}>{lang === "ar" ? l.ar : l.en}</a>
            ))}
          </nav>

          <div className="nav-right">
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={t("تبديل السمة", "Toggle theme")}
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              className="lang"
              type="button"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              aria-label={t("التبديل إلى الإنجليزية", "Switch to Arabic")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="14" height="14">
                <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
              </svg>
              {t("EN", "عربي")}
            </button>

            <a className="btn btn-primary btn-sm" href="#demo">
              {t("اطلب عرضًا", "Request Demo")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 7 7 17M17 7H8M17 7v9" />
              </svg>
            </a>

            <button
              className="burger"
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t("إغلاق القائمة", "Close menu") : t("فتح القائمة", "Open menu")}
              aria-expanded={open}
            >
              <i /><i /><i />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer${open ? " open" : ""}`} onClick={() => setOpen(false)}>
        <nav aria-label={t("قائمة الجوال", "Mobile menu")}>
          {linksData.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              style={{ transitionDelay: open ? `${0.06 * i + 0.08}s` : "0s" }}
            >
              <em>{String(i + 1).padStart(2, "0")}</em>
              {lang === "ar" ? l.ar : l.en}
            </a>
          ))}
          <a
            className="btn btn-primary"
            href="#demo"
            style={{ marginTop: 10, transitionDelay: open ? "0.46s" : "0s" }}
          >
            {t("اطلب عرضًا توضيحيًا", "Request a Demo")}
          </a>
        </nav>
      </div>
    </>
  );
}
