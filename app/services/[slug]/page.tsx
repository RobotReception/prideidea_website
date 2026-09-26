import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "../../content";
import ar from "../../content/ar.json";
import { BulletList, CtaBand, PageFrame, PageIntro } from "../../site/shared";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return ar.services.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { t } = await getContent();
  const service = t.services.find((entry) => entry.slug === slug);
  return service ? { title: service.name, description: service.description, openGraph: { title: service.name, description: service.description, locale: t.meta.ogLocale, type: "website" } } : { title: t.serviceDetail.notFound };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const { t } = await getContent();
  const service = t.services.find((entry) => entry.slug === slug);
  if (!service) notFound();
  const labels = t.serviceDetail;
  return <PageFrame><main id="main-content"><PageIntro eyebrow={`${labels.eyebrowPrefix} / ${service.name}`} title={service.title} description={service.description} action={{ href: "/contact", label: service.cta }} />
    <section className="pi-page-body"><div className="pi-wrap">
      {service.points.length > 0 && <section className="pi-content-section"><h2>{labels.offers}</h2><BulletList items={service.points} /></section>}
      {service.process.length > 0 && <section className="pi-content-section"><h2>{labels.process}</h2><BulletList items={service.process} ordered /></section>}
      {service.groups.map((group) => <section className="pi-content-section" key={group.title}><h2>{group.title}</h2><BulletList items={group.points} /></section>)}
      {service.value && <section className="pi-content-section"><h2>{labels.value}</h2><p className="pi-value-note">{service.value}</p></section>}
    </div></section><div className="pi-wrap"><CtaBand title={service.cta} description={labels.ctaDescription} button={service.cta} /></div>
  </main></PageFrame>;
}
