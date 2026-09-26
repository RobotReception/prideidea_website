import type { Metadata } from "next";
import Link from "next/link";
import { services } from "../site/content";
import { CtaBand, PageFrame, PageIntro } from "../site/shared";

export const metadata: Metadata = { title: "خدماتنا", description: "خدمات برايد آيديا في الذكاء الاصطناعي المؤسسي، وأتمتة العمليات، والتكامل، والحلول المخصصة والتدريب.", openGraph: { title: "خدماتنا", description: "خدمات برايد آيديا في الذكاء الاصطناعي المؤسسي.", locale: "ar_YE", type: "website" } };

export default function ServicesPage() {
  return <PageFrame><main id="main-content"><PageIntro eyebrow="خدمات برايد آيديا" title="خدمات تنقل مؤسستك إلى التشغيل الذكي" description="سواء كنت تبدأ رحلتك مع الذكاء الاصطناعي أو تبحث عن حل لمشكلة محددة، نرافقك من التشخيص حتى التشغيل." />
    <section className="pi-page-body"><div className="pi-wrap"><div className="pi-service-links">{services.map((service) => <article className="pi-service-link" key={service.slug}><h3><Link href={`/services/${service.slug}`}>{service.name}</Link></h3><p>{service.description}</p><Link className="pi-text-link" href={`/services/${service.slug}`}>تفاصيل الخدمة <span aria-hidden="true">←</span></Link></article>)}</div>
      <div className="pi-content-section"><h2>من الفكرة إلى التشغيل</h2><ol className="pi-steps">{["نفهم احتياجك: نحلل إجراءاتك وتحدياتك وبياناتك.", "نصمم الحل: نحدد الحل الأنسب ونطاقه ومؤشرات نجاحه.", "نطوّر ونربط: نبني الحل ونربطه بأنظمتك القائمة.", "نشغّل وندعم: ندرّب فريقك ونتابع الأداء ونطوّر باستمرار."].map((s, i) => <li key={s}><span className="pi-step-index">0{i + 1}</span>{s}</li>)}</ol></div>
    </div></section><div className="pi-wrap"><CtaBand title="لنبنِ معًا مستقبل مؤسستك" /></div></main></PageFrame>;
}
