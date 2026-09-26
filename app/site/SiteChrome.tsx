"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { RevealSections } from "./RevealSections";

const links = [
  ["/about", "من نحن"],
  ["/services", "الخدمات"],
  ["/products", "المنتجات"],
  ["/industries", "القطاعات"],
  ["/success-stories", "قصص النجاح"],
  ["/contact", "تواصل معنا"],
] as const;

export function SiteHeader() {
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
      <Link href="/" className="pi-brand" aria-label="برايد آيديا — الرئيسية">
        <img src="/brand/lockup.png" alt="برايد آيديا لأنظمة الذكاء الاصطناعي" width="310" height="110" />
      </Link>
      <button className="pi-menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="pi-navigation" aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}>
        <span /><span />
      </button>
      <nav id="pi-navigation" className={`pi-nav${open ? " is-open" : ""}`} aria-label="التنقل الرئيسي">
        {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname === href || pathname?.startsWith(`${href}/`) ? "page" : undefined}>{label}</Link>)}
        <Link className="pi-button pi-button-small" href="/contact" onClick={() => setOpen(false)}>تحدّث مع خبير</Link>
      </nav>
    </div>
    <span className="pi-reading-progress" ref={progressRef} aria-hidden="true" />
  </header>;
}

export function SiteFooter() {
  return <footer className="pi-footer">
    <div className="pi-footer-main">
      <div className="pi-footer-about">
        <Link href="/" className="pi-footer-wordmark">برايد آيديا</Link>
        <p>برايد آيديا لأنظمة الذكاء الاصطناعي — حلول ذكاء اصطناعي مؤسسية من صنعاء.</p>
        <span className="pi-footer-motto">الفكرة تُلهم الفخر <i>·</i> Idea Inspires Pride</span>
      </div>
      <div><h2>روابط</h2>{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/faq">الأسئلة الشائعة</Link></div>
      <div><h2>المنتجات</h2>{[["darai", "DarAI"], ["pridescreen", "PrideScreen"], ["pridepass", "PridePass"], ["smart-invitations", "الدعوات الذكية"]].map(([slug, label]) => <Link key={slug} href={`/products/${slug}`}>{label}</Link>)}</div>
      <div><h2>تواصل معنا</h2><a href="tel:+967775451608" dir="ltr">+967 775 451 608</a><a href="mailto:info@prideidea.com">info@prideidea.com</a><span>صنعاء، الجمهورية اليمنية</span><span>pridea2025</span></div>
    </div>
    <div className="pi-footer-bottom"><span>© 2026 برايد آيديا لأنظمة الذكاء الاصطناعي. جميع الحقوق محفوظة.</span><span><Link href="/privacy">سياسة الخصوصية</Link><Link href="/terms">شروط الاستخدام</Link></span></div>
  </footer>;
}

export function WhatsAppButton() {
  return <a className="pi-whatsapp" href="https://wa.me/967775451608" target="_blank" rel="noreferrer" aria-label="تواصل معنا عبر واتساب">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L4 20l1-4a8.4 8.4 0 1 1 15.5-4.3Z"/><path d="M9 8.5c.3-.5.6-.5.9-.5l.7 1.6c.1.3.1.5-.1.7l-.5.6c.6 1.1 1.5 2 2.7 2.6l.6-.6c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.3.6-.2.8-.8 1.4-1.7 1.5-1.4.2-3.4-.8-5-2.3-1.5-1.5-2.5-3.5-2.2-4.8.1-.5.5-.9 1-1.1Z"/></svg>
  </a>;
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <><a className="pi-skip" href="#main-content">انتقل إلى المحتوى</a><SiteHeader />{children}<RevealSections /><SiteFooter /><WhatsAppButton /></>;
}
