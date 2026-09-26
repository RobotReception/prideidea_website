"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "../context/SiteContext";
import styles from "./Hero.module.css";

const capabilities = [
  { ar: "محادثات العملاء", en: "Customer conversations", titleAr: "كل محادثة، أقرب إلى عميلك.", titleEn: "Every conversation, closer to your customer.", descAr: "يجمع DarAI قنوات التواصل ومعرفة مؤسستك، ليجيب مساعدك بالعربية ويساعد فريقك على متابعة المحادثات.", descEn: "DarAI brings your channels and company knowledge together, helping your Arabic assistant and your team respond.", href: "#darai", icon: "chat" },
  { ar: "أتمتة الإجراءات", en: "Workflow automation", titleAr: "عمل أقل تكرارًا. وقت أكثر للإنجاز.", titleEn: "Less repetition. More room for progress.", descAr: "نربط خطوات العمل بين أنظمتك ونصمّم إجراءات آلية تناسب عمليات مؤسستك.", descEn: "We connect the steps across your systems and design automated workflows around your operations.", href: "#services", icon: "flow" },
  { ar: "معرفة مؤسستك", en: "Company knowledge", titleAr: "معرفتك، في متناول فريقك.", titleEn: "Your knowledge, within your team’s reach.", descAr: "نحوّل مصادر المعرفة إلى مرجع يستطيع مساعدك الذكي الاستناد إليه في الإجابة عن الأسئلة.", descEn: "Turn your knowledge sources into a reference your AI assistant can use to answer questions.", href: "#darai", icon: "book" },
  { ar: "تكامل الأنظمة", en: "System integration", titleAr: "أنظمتك تتحدث اللغة نفسها.", titleEn: "Your systems, speaking the same language.", descAr: "نربط حلول الذكاء الاصطناعي بأنظمة إدارة العملاء والموارد وقواعد البيانات التي تستخدمها بالفعل.", descEn: "Connect AI to the CRM, ERP and databases you already use.", href: "#services", icon: "grid" },
  { ar: "الهوية الرقمية", en: "Digital identity", titleAr: "تجارب رقمية تبدأ بالثقة.", titleEn: "Digital experiences built on trust.", descAr: "استكشف حلول الهوية والتحقق المصمّمة لدعم إجراءات مؤسستك الرقمية.", descEn: "Explore identity and verification solutions designed for your digital processes.", href: "#solutions", icon: "shield" },
  { ar: "حلول مخصّصة", en: "Custom solutions", titleAr: "تحدّيك مختلف. وحلّك كذلك.", titleEn: "Your challenge is unique. Your solution should be too.", descAr: "نبدأ بفهم احتياجك، ثم نصمّم ونطوّر النظام الذي يناسب فريقك وطريقة عمله.", descEn: "We start with your needs, then design and develop a system around your team and the way it works.", href: "#demo", icon: "code" },
];

function Icon({ name }: { name: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === "chat" ? <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 3v-3H3V6a2 2 0 0 1 2-2Zm2 5h10M7 13h7" /> : name === "flow" ? <><rect x="8" y="2" width="8" height="6" rx="2"/><path d="M12 8v5M5 17v-4h14v4"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/></> : name === "book" ? <path d="M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v15M5 8h4m6 0h4M5 12h4m6 0h4" /> : name === "shield" ? <path d="m12 2 8 3v6c0 5-5 9-8 11-3-2-8-6-8-11V5l8-3Zm-4 9 3 3 5-6" /> : name === "code" ? <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" /> : <><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h6M6 9v6m12-6v6m-9 3h6"/></>}
  </svg>;
}

const paths = ["M470 164H355L300 55H140", "M470 180H140", "M470 196H355L300 305H140", "M530 164H645L700 55H860", "M530 180H860", "M530 196H645L700 305H860"];

export default function Hero() {
  const { t, lang } = useSite();
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { el.dataset.visible = String(entry.isIntersecting); }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const selected = capabilities[active];
  return <section ref={root} className={styles.hero} id="top" dir={lang === "ar" ? "rtl" : "ltr"} data-visible="true">
    <div className={styles.atmosphere} aria-hidden="true"><div className={styles.beam}/><div className={styles.stars}/><img src="/prideidea-ai-orbit.png" alt="" width="1140" height="1400" className={styles.orbit}/></div>
    <div className={`shell ${styles.content}`}>
      <div className={styles.intro}>
        <p className={styles.kicker}><span/>{t("برايد آيديا · أنظمة الذكاء الاصطناعي", "PRIDE IDEA · AI SYSTEMS")}</p>
        <h1><span>{t("كل إمكانات الذكاء.", "All the power of AI.")}</span><span className={styles.accent}>{t("في صميم أعمالك.", "At the heart of your business.")}</span></h1>
        <p className={styles.description}>{t("اربط محادثاتك، ومعرفتك، وإجراءاتك بذكاء يفهم العربية. نبني الأنظمة التي تمنح فريقك مساحة أكبر للإنجاز.", "Connect your conversations, knowledge and workflows with AI that understands Arabic. We build systems that give your team more room to achieve.")}</p>
        <div className={styles.actions}><a className={styles.primary} href="#demo">{t("اكتشف ما يمكننا بناؤه لك", "Explore what we can build for you")}<span aria-hidden="true">↗</span></a><a className={styles.secondary} href="#darai">{t("اكتشف DarAI", "Meet DarAI")}<span aria-hidden="true">←</span></a></div>
      </div>
      <div className={styles.network} aria-label={t("استكشف حلول برايد آيديا", "Explore Pride Idea solutions")}>
        <svg className={styles.connections} viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">
          {paths.map((d, i) => <g key={d}><path className={styles.track} d={d}/><path className={styles.pulse} d={d} style={{ animationDelay: `${i * -.65}s` }}/></g>)}
        </svg>
        <div className={styles.core} aria-hidden="true"><div className={styles.corePins}/><div className={styles.coreFace}><img src="/brand/mark.png" alt="" width="40" height="40"/><strong>AI</strong></div><span>PRIDE IDEA</span></div>
        {capabilities.map((item, i) => <button key={item.icon} type="button" className={`${styles.node} ${styles[`node${i}`]} ${active === i ? styles.active : ""}`} onClick={() => setActive(i)} aria-pressed={active === i} aria-controls="hero-capability"><span className={styles.nodeIcon}><Icon name={item.icon}/></span><span>{t(item.ar, item.en)}</span></button>)}
      </div>
      <div className={styles.detail} id="hero-capability" aria-live="polite" aria-atomic="true"><span className={styles.detailIndex}>0{active + 1} / 06</span><div><h2>{t(selected.titleAr, selected.titleEn)}</h2><p>{t(selected.descAr, selected.descEn)}</p></div><a href={selected.href}>{t("استكشف الحل", "Explore solution")}<span aria-hidden="true">↗</span></a></div>
      <div className={styles.footer}><span>{t("مصمّم للعربية. متصل بأنظمتك. مبني لاحتياجك.", "Arabic-first. Connected to your systems. Built around you.")}</span><a href="#darai">{t("اكتشف المزيد", "Scroll to explore")}<span aria-hidden="true">↓</span></a></div>
    </div>
  </section>;
}
