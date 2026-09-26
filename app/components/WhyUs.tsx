"use client";

import { useSite } from "../context/SiteContext";

const items = [
  {
    ar: "عربية أولاً",
    en: "Arabic-first",
    descAr: "مبنية من الأساس للغة العربية — فهم عميق للهجات والسياق الثقافي، وليست مجرد ترجمة.",
    descEn: "Built from the ground up for Arabic — deep dialect and cultural context understanding, not just translation.",
    icon: "🌍",
    accent: "#F39200",
  },
  {
    ar: "سيادة البيانات",
    en: "Data Sovereignty",
    descAr: "بياناتك تحت سيطرتك الكاملة. نشر داخل خوادمك أو سحابة خاصة بدون تسرب.",
    descEn: "Your data under full control. On-prem or private cloud deployment with zero leakage.",
    icon: "🛡️",
    accent: "#3BBFA0",
  },
  {
    ar: "تكامل سلس",
    en: "Seamless Integration",
    descAr: "واجهات برمجية مفتوحة تتكامل مع ERP وCRM وقواعد البيانات بأقل جهد.",
    descEn: "Open APIs that integrate with ERP, CRM, and databases with minimal effort.",
    icon: "🔗",
    accent: "#5B8DEF",
  },
  {
    ar: "نشر مرن",
    en: "Flexible Deploy",
    descAr: "سحابي، خاص، أو محلي بالكامل — اختر ما يناسب مؤسستك.",
    descEn: "Cloud, private, or fully on-premise — choose what fits your organization.",
    icon: "☁️",
    accent: "#C084FC",
  },
];

export default function WhyUs() {
  const { t } = useSite();

  return (
    <section className="sec-why" id="why">
      <div className="sec-why-bg" aria-hidden="true">
        <div className="orb orb-3" />
      </div>
      <div className="shell">
        <div className="sec-head">
          <span className="badge badge-amber">
            <span className="badge-dot" />
            {t("لماذا نحن", "Why Us")}
          </span>
          <h2>{t("ما يميّز حلولنا", "What Sets Our Solutions Apart")}</h2>
        </div>
        <div className="why-bento">
          {items.map((item, i) => (
            <div
              key={i}
              className="why-tile"
              style={{ "--tile-accent": item.accent } as React.CSSProperties}
            >
              <div className="why-tile-icon">{item.icon}</div>
              <h3>{t(item.ar, item.en)}</h3>
              <p>{t(item.descAr, item.descEn)}</p>
              <div className="why-tile-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
