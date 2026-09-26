"use client";

import { useSite } from "../context/SiteContext";

const stats = [
  { val: "2024", ar: "سنة التأسيس", en: "Founded" },
  { val: "B2B", ar: "نموذج العمل", en: "Business Model" },
  { val: "+6", ar: "قطاعات مخدومة", en: "Sectors Served" },
];

export default function About() {
  const { t } = useSite();

  return (
    <section className="sec-about" id="about">
      <div className="sec-about-bg" aria-hidden="true">
        <div className="orb orb-4" />
      </div>
      <div className="shell">
        <div className="about-layout">
          <div className="about-text">
            <span className="badge badge-amber">
              <span className="badge-dot" />
              {t("من نحن", "About Us")}
            </span>
            <h2>{t("شركة يمنية تبني مستقبل الذكاء الاصطناعي", "A Yemeni Company Building the Future of AI")}</h2>
            <p>{t(
              "برايد آيديا لأنظمة الذكاء الاصطناعي شركة تأسست عام 2024 في اليمن، متخصصة في تطوير حلول ذكاء اصطناعي مؤسسية مصممة خصيصاً للسوق العربي. نركز على تقديم أنظمة محادثات ذكية، والتحقق من الهوية الرقمية، وأتمتة العمليات.",
              "Pride Idea for AI Systems is a company founded in 2024 in Yemen, specializing in developing enterprise AI solutions designed specifically for the Arabic market."
            )}</p>
            <p>{t(
              "نؤمن أن التقنية الحقيقية هي التي تفهم لغة مستخدميها وسياقهم الثقافي. لذلك نبني حلولنا بالعربية أولاً.",
              "We believe real technology understands its users' language and cultural context. That's why we build Arabic-first."
            )}</p>
          </div>
          <div className="about-numbers">
            {stats.map((s, i) => (
              <div key={i} className="num-card">
                <span className="num-val">{s.val}</span>
                <span className="num-label">{t(s.ar, s.en)}</span>
              </div>
            ))}
            <div className="num-card num-card-cta">
              <span className="num-val">{t("🇾🇪", "🇾🇪")}</span>
              <span className="num-label">{t("صنع في اليمن", "Made in Yemen")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
