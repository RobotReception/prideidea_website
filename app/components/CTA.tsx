"use client";

import { useSite } from "../context/SiteContext";

export default function CTA() {
  const { t } = useSite();

  return (
    <section className="sec-cta" id="demo">
      <div className="sec-cta-bg" aria-hidden="true">
        <div className="cta-orb cta-orb-1" />
        <div className="cta-orb cta-orb-2" />
        <div className="cta-grid-bg" />
      </div>
      <div className="shell sec-cta-shell">
        <span className="badge badge-amber">
          <span className="badge-dot" />
          {t("ابدأ الآن", "Get Started")}
        </span>
        <h2>{t("جاهز لتحويل مؤسستك؟", "Ready to Transform Your Enterprise?")}</h2>
        <p>{t(
          "تواصل مع فريقنا لنفهم احتياجاتك ونصمم لك حلاً مخصصاً يتكامل مع أنظمتك القائمة.",
          "Connect with our team to understand your needs and design a tailored solution that integrates with your existing systems."
        )}</p>
        <div className="cta-btns">
          <a className="btn btn-primary btn-lg" href="mailto:info@prideidea.com">
            {t("تواصل معنا", "Contact Us")}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 7 7 17M17 7H8M17 7v9" /></svg>
          </a>
        </div>
        <div className="cta-trust-row">
          <div className="cta-trust-item">
            <span>🔒</span>
            {t("بياناتك محمية", "Data Protected")}
          </div>
          <div className="cta-trust-item">
            <span>🛡️</span>
            {t("سيادة كاملة", "Full Sovereignty")}
          </div>
          <div className="cta-trust-item">
            <span>⚡</span>
            {t("تكامل سريع", "Fast Integration")}
          </div>
        </div>
      </div>
    </section>
  );
}
