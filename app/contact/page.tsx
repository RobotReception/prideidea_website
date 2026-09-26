import type { Metadata } from "next";
import ContactForm from "../site/ContactForm";
import { CtaBand, ContentText, PageFrame, PageIntro } from "../site/shared";

export const metadata: Metadata = { title: "تواصل معنا", description: "تواصل مع برايد آيديا للحديث عن احتياجات مؤسستك وحلول الذكاء الاصطناعي المناسبة.", openGraph: { title: "تواصل معنا", description: "لنتحدث عن مؤسستك واحتياجها.", locale: "ar_YE", type: "website" } };

export default function ContactPage() {
  return <PageFrame><main id="main-content"><PageIntro eyebrow="تواصل معنا" title="لنتحدث عن مؤسستك" description={<>أخبرنا عن التحدي الذي تواجهه، وسيتواصل معك أحد خبرائنا خلال <ContentText text="[يوم عمل واحد]" />.</>} />
    <section className="pi-page-body"><div className="pi-wrap pi-contact-layout"><aside className="pi-contact-info"><h2>بيانات التواصل</h2><p>يسعدنا أن نتعرف على احتياج مؤسستك.</p><a href="tel:+967775451608" dir="ltr">+967 775 451 608</a><a href="https://wa.me/967775451608" target="_blank" rel="noreferrer">واتساب</a><a href="mailto:info@prideidea.com">info@prideidea.com</a><span>صنعاء، الجمهورية اليمنية</span><span>pridea2025</span></aside><ContactForm /></div></section>
  </main></PageFrame>;
}
