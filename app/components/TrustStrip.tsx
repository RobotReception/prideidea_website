"use client";

import { useSite } from "../context/SiteContext";

const sectors = [
  { ar: "القطاع المالي", en: "Finance", icon: "🏦" },
  { ar: "التعليم العالي", en: "Higher Education", icon: "🎓" },
  { ar: "الاتصالات", en: "Telecom", icon: "📡" },
  { ar: "الخدمات الحكومية", en: "Government", icon: "🏛️" },
  { ar: "التجارة الإلكترونية", en: "E-Commerce", icon: "🛒" },
  { ar: "الرعاية الصحية", en: "Healthcare", icon: "🏥" },
];

export default function TrustStrip() {
  const { t } = useSite();

  return (
    <section className="trust" id="trust">
      <div className="shell">
        <div className="trust-inner">
          <p className="trust-label">{t("القطاعات التي نخدمها", "Sectors We Serve")}</p>
          <div className="trust-marquee">
            <div className="trust-track">
              {[...sectors, ...sectors].map((s, i) => (
                <span key={i} className="trust-chip">
                  <span className="trust-emoji">{s.icon}</span>
                  {t(s.ar, s.en)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
