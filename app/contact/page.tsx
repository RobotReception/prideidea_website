import { getContent, pageMetadata, site } from "../content";
import ContactForm from "../site/ContactForm";
import { PageFrame, PageIntro } from "../site/shared";

export const generateMetadata = () => pageMetadata((t) => t.contactPage.meta);

export default async function ContactPage() {
  const { t } = await getContent();
  const page = t.contactPage;
  return <PageFrame><main id="main-content"><PageIntro eyebrow={page.eyebrow} title={page.title} description={page.description} />
    <section className="pi-page-body"><div className="pi-wrap pi-contact-layout"><aside className="pi-contact-info"><h2>{page.infoTitle}</h2><p>{page.infoText}</p><a href={site.phoneHref} dir="ltr">{site.phone}</a><a href={site.whatsappHref} target="_blank" rel="noreferrer">{page.whatsapp}</a><a href={`mailto:${site.email}`}>{site.email}</a><span>{t.footer.location}</span><span>{site.handle}</span></aside><ContactForm t={t.contactForm} email={site.email} /></div></section>
  </main></PageFrame>;
}
