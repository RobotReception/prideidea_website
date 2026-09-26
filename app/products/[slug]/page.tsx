import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "../../content";
import ar from "../../content/ar.json";
import { BulletList, CtaBand, PageFrame, PageIntro } from "../../site/shared";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return ar.products.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { t } = await getContent();
  const product = t.products.find((entry) => entry.slug === slug);
  return product ? { title: product.pageTitle, description: product.description, openGraph: { title: product.pageTitle, description: product.description, locale: t.meta.ogLocale, type: "website" } } : { title: t.productDetail.notFound };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const { t } = await getContent();
  const product = t.products.find((entry) => entry.slug === slug);
  if (!product) notFound();
  const labels = t.productDetail;
  return <PageFrame><main id="main-content"><PageIntro eyebrow={`${labels.eyebrowPrefix} / ${product.name}`} title={product.title} description={product.description} action={{ href: "/contact", label: product.cta }} />
    <section className="pi-page-body"><div className="pi-wrap">
      {product.problem.length > 0 && <section className="pi-content-section"><h2>{labels.challenge}</h2><BulletList items={product.problem} /></section>}
      {product.process.length > 0 && <section className="pi-content-section"><h2>{labels.howItWorks}</h2><BulletList items={product.process} ordered /></section>}
      {product.features.length > 0 && <section className="pi-content-section"><h2>{product.featuresTitle}</h2><BulletList items={product.features} /></section>}
      {product.channels && <section className="pi-content-section is-soft"><h2>{labels.channels}</h2><p>{product.channels}</p><h2>{labels.integrations}</h2><p>{product.integrations}</p><h2>{labels.security}</h2><p>{product.security}</p><h2>{labels.deployment}</h2><p>{product.deployment}</p><p>{labels.pricingLabel} <span className="pi-placeholder">{labels.pricingNote}</span></p></section>}
      <section className="pi-content-section"><h2>{labels.audience}</h2><div className="pi-tag-row">{product.audiences.map((audience) => <span key={audience}>{audience}</span>)}</div></section>
    </div></section><div className="pi-wrap"><CtaBand title={product.ctaTitle} button={product.cta} /></div>
  </main></PageFrame>;
}
