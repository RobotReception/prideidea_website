import { getContent, pageMetadata } from "../content";
import { ContentText, CtaBand, PageFrame, PageIntro } from "../site/shared";

export const generateMetadata = () => pageMetadata((t) => t.faqPage.meta);

export default async function FAQPage() {
  const { t } = await getContent();
  const page = t.faqPage;
  return <PageFrame><main id="main-content"><PageIntro eyebrow={page.eyebrow} title={page.title} />
    <section className="pi-page-body"><div className="pi-wrap"><div className="pi-accordion">{t.faq.map((item) => <details key={item.q}><summary>{item.q}</summary><p><ContentText text={item.a} /></p></details>)}</div></div></section><div className="pi-wrap"><CtaBand title={page.cta.title} button={page.cta.button} /></div>
  </main></PageFrame>;
}
