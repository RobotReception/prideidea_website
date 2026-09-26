import Link from "next/link";
import { getContent } from "../content";
import { ArrowLink, CtaBand, PageFrame, SectionHeading } from "./shared";
import { HeroScene } from "./HeroScene";

export default async function HomePage() {
  const { t } = await getContent();
  const { hero, about, services, products, why, cta } = t.home;
  return <PageFrame>
    <main id="main-content">
      <section className="pi-home-hero">
        <HeroScene />
        <div className="pi-hero-inner">
          <div className="pi-hero-copy">
            <p className="pi-hero-badge"><i /> {hero.badge}</p>
            <h1>{hero.title} <span>{hero.titleAccent}</span></h1>
            <p className="pi-hero-lead">{hero.lead}</p>
            <div className="pi-hero-actions"><Link className="pi-button" href="/contact">{hero.primaryCta} <span aria-hidden="true">{t.ui.heroArrow}</span></Link><Link className="pi-button pi-button-outline" href="/services">{hero.secondaryCta}</Link></div>
            <div className="pi-hero-proof">{hero.proof.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="pi-section pi-about-strip"><div className="pi-wrap pi-intro-layout">
        <SectionHeading eyebrow={about.eyebrow} title={about.title} />
        <div className="pi-intro-copy"><p>{about.text}</p><ArrowLink href="/about" label={about.link} arrow={t.ui.arrow} /></div>
      </div></section>

      <section className="pi-section pi-services-showcase"><div className="pi-wrap">
        <SectionHeading eyebrow={services.eyebrow} title={services.title} />
        <div className="pi-service-grid">{t.services.map((service, index) => <article className="pi-service-item" key={service.slug}><span className="pi-service-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{service.name}</h3><p>{service.description}</p><ArrowLink href={`/services/${service.slug}`} label={t.ui.serviceDetails} arrow={t.ui.arrow} /></article>)}</div>
      </div></section>

      <section className="pi-section pi-products-showcase"><div className="pi-wrap">
        <SectionHeading eyebrow={products.eyebrow} title={products.title} description={products.description} />
        <div className="pi-products-grid">{t.products.map((product) => <article className="pi-product-item" key={product.slug}><span className="pi-product-symbol" aria-hidden="true">{product.symbol}</span><h3>{product.name}{product.localName && <span> | {product.localName}</span>}</h3><p>{product.description}</p><ArrowLink href={`/products/${product.slug}`} label={t.ui.discoverProduct} arrow={t.ui.arrow} /></article>)}</div>
        <p className="pi-intro-copy"><ArrowLink href="/products" label={t.ui.allProducts} arrow={t.ui.arrow} /></p>
      </div></section>

      <section className="pi-section pi-why-showcase"><div className="pi-wrap pi-why-layout">
        <SectionHeading eyebrow={why.eyebrow} title={why.title} />
        <ul className="pi-why-list">{why.reasons.map((reason) => <li key={reason.title}><strong>{reason.title}</strong><span>{reason.text}</span></li>)}</ul>
      </div></section>

      <div className="pi-wrap pi-home-cta"><CtaBand title={cta.title} description={cta.description} button={cta.button} /></div>
      <div className="pi-home-motto" aria-label={t.home.mottoAria}><span>{t.footer.motto}</span><i>·</i><bdi>{t.footer.mottoSecondary}</bdi></div>
    </main>
  </PageFrame>;
}
