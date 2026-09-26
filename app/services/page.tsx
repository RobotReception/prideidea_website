import Link from "next/link";
import { getContent, pageMetadata } from "../content";
import { ArrowLink, CtaBand, PageFrame, PageIntro } from "../site/shared";

export const generateMetadata = () => pageMetadata((t) => t.servicesPage.meta);

export default async function ServicesPage() {
  const { t } = await getContent();
  const page = t.servicesPage;
  return <PageFrame><main id="main-content"><PageIntro eyebrow={page.eyebrow} title={page.title} description={page.description} />
    <section className="pi-page-body"><div className="pi-wrap"><div className="pi-service-links">{t.services.map((service) => <article className="pi-service-link" key={service.slug}><h3><Link href={`/services/${service.slug}`}>{service.name}</Link></h3><p>{service.description}</p><ArrowLink href={`/services/${service.slug}`} label={t.ui.serviceDetails} arrow={t.ui.arrow} /></article>)}</div>
      <div className="pi-content-section"><h2>{page.processTitle}</h2><ol className="pi-steps">{page.process.map((step, i) => <li key={step}><span className="pi-step-index">0{i + 1}</span>{step}</li>)}</ol></div>
    </div></section><div className="pi-wrap"><CtaBand title={page.cta.title} button={page.cta.button} /></div></main></PageFrame>;
}
