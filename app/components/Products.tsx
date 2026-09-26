"use client";

import { useSite } from "../context/SiteContext";

export default function Products() {
  const { t } = useSite();

  return (
    <>
      {/* ===== DarAI ===== */}
      <section className="sec-darai" id="darai">
        <div className="sec-darai-bg" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>
        <div className="shell">
          <div className="darai-layout">
            <div className="darai-text">
              <span className="badge badge-amber">
                <span className="badge-dot" />
                {t("المنتج الرئيسي", "Flagship Product")}
              </span>
              <h2 className="darai-h">
                {t("منصة ", "The ")}<span className="grad-text">DarAI</span>{t(" | داري", " Platform")}
              </h2>
              <p className="darai-desc">
                {t(
                  "منصة ذكاء محادثات مؤسسية تجمع جميع قنوات التواصل في صندوق وارد موحّد، مع وكلاء ذكاء اصطناعي يتعلمون من قاعدة معرفة مؤسستك ويردون بدقة باللغة العربية.",
                  "An enterprise conversational AI platform that unifies all communication channels into a single inbox, with AI agents that learn from your knowledge base and respond accurately in Arabic."
                )}
              </p>
              <div className="feat-grid">
                {[
                  { ar: "صندوق وارد موحّد", en: "Unified Inbox", ic: "📥" },
                  { ar: "وكلاء ذكاء اصطناعي", en: "AI Agents", ic: "🤖" },
                  { ar: "قاعدة معرفة ذكية", en: "Smart Knowledge Base", ic: "🧠" },
                  { ar: "تحليلات المحادثات", en: "Conversation Analytics", ic: "📊" },
                  { ar: "تكامل مع أنظمتك", en: "System Integration", ic: "🔗" },
                  { ar: "دعم اللهجات العربية", en: "Arabic Dialects", ic: "🌍" },
                ].map((f, i) => (
                  <div key={i} className="feat-chip">
                    <span>{f.ic}</span>
                    <span>{t(f.ar, f.en)}</span>
                  </div>
                ))}
              </div>
              <div className="darai-cta">
                <a className="btn btn-primary" href="#demo">
                  {t("اطلب عرضًا توضيحيًا", "Request a Demo")}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 7 7 17M17 7H8M17 7v9" /></svg>
                </a>
              </div>
            </div>
            <div className="darai-visual">
              <div className="chat-window">
                <div className="chat-bar">
                  <span className="chat-dots"><i /><i /><i /></span>
                  <span className="chat-bar-title">DarAI Chat</span>
                  <span className="chat-bar-badge">{t("مباشر", "Live")}</span>
                </div>
                <div className="chat-flow">
                  <div className="bubble bubble-user">
                    <p>{t("أريد الاستفسار عن خدمات الحساب التجاري", "I'd like to inquire about business account services")}</p>
                    <span className="bubble-time">10:24</span>
                  </div>
                  <div className="bubble bubble-ai">
                    <span className="ai-label">DarAI</span>
                    <p>{t("أهلاً بك! يسعدني مساعدتك. لدينا ثلاث باقات للحسابات التجارية مصممة حسب حجم مؤسستك. هل تفضل أن أعرض لك التفاصيل؟", "Welcome! I'd be happy to help. We have three business account packages designed for your organization's size. Want me to show you the details?")}</p>
                    <span className="bubble-time">10:24</span>
                  </div>
                  <div className="bubble bubble-user">
                    <p>{t("نعم، أرسل لي التفاصيل", "Yes, send me the details")}</p>
                    <span className="bubble-time">10:25</span>
                  </div>
                  <div className="bubble-typing">
                    <span className="ai-label">DarAI</span>
                    <div className="typing-dots"><i /><i /><i /></div>
                  </div>
                </div>
              </div>
              <div className="float-card float-card-1">
                <span>📊</span>
                <div>
                  <b>{t("دقة الردود", "Response Accuracy")}</b>
                  <small>96.4%</small>
                </div>
              </div>
              <div className="float-card float-card-2">
                <span>⚡</span>
                <div>
                  <b>{t("متوسط الاستجابة", "Avg Response")}</b>
                  <small>&lt; 2s</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== حلول الهوية والامتثال ===== */}
      <section className="sec-solutions" id="solutions">
        <div className="shell">
          <div className="sec-head">
            <span className="badge badge-cyan">
              <span className="badge-dot" />
              {t("الحلول", "Solutions")}
            </span>
            <h2>{t("حلولنا الرقمية للهوية والامتثال", "Digital Identity & Compliance Solutions")}</h2>
            <p>{t(
              "أنظمة متكاملة للتحقق من الهوية وإدارة الامتثال، مصممة لتلبية متطلبات المؤسسات المالية والحكومية.",
              "Integrated systems for identity verification and compliance management, designed for financial and government institutions."
            )}</p>
          </div>
          <div className="sol-bento">
            <div className="sol-card sol-card-screen">
              <div className="sol-card-glow" />
              <div className="solution-visual solution-visual-screen" aria-hidden="true">
                <img src="/identity-visual.png" alt="" />
              </div>
              <div className="sol-card-inner">
                <div className="sol-icon-wrap" style={{ "--sol-c": "#3BBFA0" } as React.CSSProperties}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
                </div>
                <h3>PrideScreen</h3>
                <p>{t(
                  "نظام تحقق من الهوية الرقمية يدعم التعرف على الوجه، ومطابقة الوثائق، والتحقق الحيوي — متوافق مع المعايير المحلية والدولية.",
                  "A digital identity verification system supporting facial recognition, document matching, and liveness detection — compliant with local and international standards."
                )}</p>
                <div className="sol-pills">
                  <span>{t("التعرف على الوجه", "Face Recognition")}</span>
                  <span>{t("مطابقة الوثائق", "Doc Matching")}</span>
                  <span>{t("التحقق الحيوي", "Liveness Check")}</span>
                </div>
              </div>
            </div>
            <div className="sol-card sol-card-pass">
              <div className="sol-card-glow" />
              <div className="solution-visual solution-visual-pass" aria-hidden="true">
                <img src="/identity-visual.png" alt="" />
              </div>
              <div className="sol-card-inner">
                <div className="sol-icon-wrap" style={{ "--sol-c": "#5B8DEF" } as React.CSSProperties}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /><circle cx="12" cy="16.5" r="1.5" /></svg>
                </div>
                <h3>PridePass</h3>
                <p>{t(
                  "بوابة امتثال ذكية تؤتمت عمليات اعرف عميلك (KYC) ومكافحة غسل الأموال (AML)، مع سير عمل قابل للتخصيص حسب متطلبات كل مؤسسة.",
                  "An intelligent compliance gateway automating KYC and AML processes, with customizable workflows tailored to each organization."
                )}</p>
                <div className="sol-pills">
                  <span>KYC</span>
                  <span>AML</span>
                  <span>{t("سير عمل مخصص", "Custom Workflows")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
