import Link from "next/link";
import { getContent, pageMetadata } from "../content";
import { ArrowLink, CtaBand, PageFrame, PageIntro } from "../site/shared";

export const generateMetadata = () => pageMetadata((t) => t.productsPage.meta);

export default async function ProductsPage() {
  const { t } = await getContent();
  const page = t.productsPage;
  return <PageFrame><main id="main-content"><PageIntro eyebrow={page.eyebrow} title={page.title} description={page.description} />
    <section className="pi-page-body"><div className="pi-wrap"><div className="pi-service-links">{t.products.map((product) => <article className="pi-service-link" key={product.slug}><h2><Link href={`/products/${product.slug}`}>{product.name}{product.localName && ` | ${product.localName}`}</Link></h2><p>{product.description}</p><ArrowLink href={`/products/${product.slug}`} label={t.ui.productDetails} arrow={t.ui.arrow} /></article>)}</div><div className="pi-content-section"><h2>{page.placementTitle}</h2>{page.placement.map((line) => <p key={line}>{line}</p>)}</div></div></section><div className="pi-wrap"><CtaBand title={page.cta.title} button={page.cta.button} /></div>
  </main></PageFrame>;
}
