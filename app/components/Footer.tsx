"use client";

import { useSite } from "../context/SiteContext";

export default function Footer() {
  const { t } = useSite();

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/brand/mark-square.png" alt="" width="36" height="36" className="footer-logo" />
            <div>
              <b>{t("برايد آيديا", "Pride Idea")}</b>
              <small>{t("أنظمة الذكاء الاصطناعي", "AI Systems")}</small>
            </div>
            <p className="footer-tagline">{t(
              "نبني حلول ذكاء اصطناعي مؤسسية بالعربية أولاً.",
              "Building enterprise AI solutions, Arabic-first."
            )}</p>
          </div>

          <div className="footer-col">
            <h4>{t("المنتجات", "Products")}</h4>
            <a href="#darai">DarAI</a>
            <a href="#solutions">PrideScreen</a>
            <a href="#solutions">PridePass</a>
          </div>

          <div className="footer-col">
            <h4>{t("الشركة", "Company")}</h4>
            <a href="#about">{t("من نحن", "About")}</a>
            <a href="#services">{t("الخدمات", "Services")}</a>
            <a href="#demo">{t("تواصل معنا", "Contact")}</a>
          </div>

          <div className="footer-col">
            <h4>{t("المزيد", "More")}</h4>
            <a href="#why">{t("لماذا نحن", "Why Us")}</a>
            <a href="#trust">{t("القطاعات", "Sectors")}</a>
          </div>
        </div>

        <div className="footer-bar">
          <p>© 2024 Pride Idea for AI Systems. {t("جميع الحقوق محفوظة.", "All rights reserved.")}</p>
          <p className="footer-loc">
            <span>📍</span>
            {t("اليمن", "Yemen")}
          </p>
        </div>
      </div>
    </footer>
  );
}
