import Link from "next/link";
import { PageFrame } from "./SiteChrome";
export { PageFrame };

export function AIFlowVisual() {
  return <div className="pi-flow-visual" role="img" aria-label="تصوّر تدفق البيانات عبر معالجة ذكية إلى مخرجات منظّمة">
    <div className="pi-flow-top"><span>من البيانات إلى القرار</span><span className="pi-live"><i /> نظام مترابط</span></div>
    <div className="pi-flow-body" dir="ltr">
      <div className="pi-flow-inputs"><span>رسائل العملاء</span><span>معرفة المؤسسة</span><span>إجراءات العمل</span></div>
      <svg className="pi-flow-lines" viewBox="0 0 520 210" preserveAspectRatio="none" aria-hidden="true">
        <path d="M35 52H155Q182 52 205 105"/><path d="M35 105H205"/><path d="M35 158H155Q182 158 205 105"/>
        <path d="M315 105Q338 52 365 52H485"/><path d="M315 105H485"/><path d="M315 105Q338 158 365 158H485"/>
        <path className="pi-flow-signal" d="M35 105H205Q260 105 315 105H485"/>
      </svg>
      <div className="pi-flow-core"><span className="pi-core-rails"/><span className="pi-core-mark">AI</span><span className="pi-core-caption">تحليل · فهم · تنفيذ</span></div>
      <div className="pi-flow-outputs"><span>إجابة دقيقة</span><span>إجراء آلي</span><span>مؤشر واضح</span></div>
    </div>
    <div className="pi-flow-bottom"><span>ذكاء اصطناعي يفهم سياق مؤسستك</span><b>PI / SYSTEMS</b></div>
  </div>;
}

export function PageIntro({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: React.ReactNode; action?: { href: string; label: string } }) {
  return <header className="pi-page-intro"><div className="pi-wrap">{eyebrow && <p className="pi-eyebrow">{eyebrow}</p>}<h1>{title}</h1>{description && <p className="pi-lead">{description}</p>}{action && <Link className="pi-button pi-intro-action" href={action.href}>{action.label}</Link>}</div></header>;
}

export function SectionHeading({ eyebrow, title, description, light = false }: { eyebrow?: string; title: string; description?: string; light?: boolean }) {
  return <div className={`pi-section-heading${light ? " is-light" : ""}`}>{eyebrow && <p className="pi-eyebrow">{eyebrow}</p>}<h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

export function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="pi-placeholder">{children}</span>;
}

export function ContentText({ text }: { text: string }) {
  return <>{text.split(/(\[[^\]]+\])/g).map((part, i) => part.startsWith("[") && part.endsWith("]") ? <Placeholder key={i}>{part}</Placeholder> : part)}</>;
}

export function CtaBand({ title, description, button = "تحدّث مع خبير" }: { title: string; description?: string; button?: string }) {
  return <section className="pi-cta-band"><div><h2>{title}</h2>{description && <p>{description}</p>}</div><Link href="/contact" className="pi-button pi-button-light">{button}</Link></section>;
}

export function BulletList({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return <Tag className={ordered ? "pi-steps" : "pi-list"}>{items.map((item, index) => <li key={`${index}-${item}`}>{ordered && <span className="pi-step-index">{String(index + 1).padStart(2, "0")}</span>}<span>{item}</span></li>)}</Tag>;
}

export function ContentSection({ title, children, tone = "plain" }: { title: string; children: React.ReactNode; tone?: "plain" | "soft" }) {
  return <section className={`pi-content-section ${tone === "soft" ? "is-soft" : ""}`}><div className="pi-wrap"><h2>{title}</h2>{children}</div></section>;
}
