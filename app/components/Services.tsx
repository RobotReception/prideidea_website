"use client";

import { useSite } from "../context/SiteContext";

const services = [
  {
    num: "01",
    ar: "استشارات الذكاء الاصطناعي",
    en: "AI Consulting",
    descAr: "نحلل احتياجات مؤسستك ونصمم خارطة طريق واضحة لدمج الذكاء الاصطناعي في عملياتك.",
    descEn: "We analyze your needs and design a clear roadmap for integrating AI into your operations.",
    icon: "💡",
  },
  {
    num: "02",
    ar: "التكامل والتطوير",
    en: "Integration & Dev",
    descAr: "نربط حلولنا بأنظمتك القائمة — ERP، CRM، قواعد البيانات — عبر واجهات برمجية آمنة.",
    descEn: "We connect our solutions to your existing systems — ERP, CRM, databases — via secure APIs.",
    icon: "⚙️",
  },
  {
    num: "03",
    ar: "التدريب والتمكين",
    en: "Training & Enablement",
    descAr: "برامج تدريبية متخصصة لفريقك على استخدام أنظمتنا والاستفادة القصوى من التقنية.",
    descEn: "Specialized training programs for your team on using our systems and maximizing technology benefits.",
    icon: "🎯",
  },
  {
    num: "04",
    ar: "الدعم والصيانة",
    en: "Support & Maintenance",
    descAr: "دعم فني على مدار الساعة مع اتفاقيات مستوى خدمة واضحة وتحديثات دورية.",
    descEn: "24/7 technical support with clear SLAs and regular updates for optimal performance.",
    icon: "🔧",
  },
];

export default function Services() {
  const { t } = useSite();

  return (
    <section className="sec-services" id="services">
      <div className="shell">
        <div className="sec-head">
          <span className="badge badge-amber">
            <span className="badge-dot" />
            {t("خدماتنا", "Our Services")}
          </span>
          <h2>{t("خدمات شاملة من الفكرة إلى التشغيل", "End-to-End Services from Concept to Operation")}</h2>
          <p>{t(
            "نرافقك في كل خطوة — من الاستشارة الأولى وحتى التشغيل الكامل والدعم المستمر.",
            "We accompany you every step — from initial consultation to full deployment and ongoing support."
          )}</p>
        </div>
        <div className="svc-timeline">
          {services.map((s, i) => (
            <div key={i} className="svc-step">
              <div className="svc-connector" aria-hidden="true">
                <span className="svc-num">{s.num}</span>
                {i < services.length - 1 && <span className="svc-line" />}
              </div>
              <div className="svc-content">
                <div className="svc-emoji">{s.icon}</div>
                <h3>{t(s.ar, s.en)}</h3>
                <p>{t(s.descAr, s.descEn)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
