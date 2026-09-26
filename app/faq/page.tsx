import type { Metadata } from "next";
import { faq } from "../site/content";
import { ContentText, CtaBand, PageFrame, PageIntro } from "../site/shared";

export const metadata: Metadata = { title: "الأسئلة الشائعة", description: "إجابات عن أسئلة المؤسسات حول حلول برايد آيديا للذكاء الاصطناعي.", openGraph: { title: "الأسئلة الشائعة", description: "إجابات عن أسئلتك حول خدمات ومنتجات برايد آيديا.", locale: "ar_YE", type: "website" } };

export default function FAQPage() {
  return <PageFrame><main id="main-content"><PageIntro eyebrow="الأسئلة الشائعة" title="إجابات تساعدك على اتخاذ القرار" />
    <section className="pi-page-body"><div className="pi-wrap"><div className="pi-accordion">{faq.map((item) => <details key={item.q}><summary>{item.q}</summary><p><ContentText text={item.a} /></p></details>)}</div></div></section><div className="pi-wrap"><CtaBand title="هل لديك سؤال آخر؟" button="تواصل معنا" /></div>
  </main></PageFrame>;
}
