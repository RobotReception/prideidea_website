import type { Metadata } from "next";
import Link from "next/link";
import { products } from "../site/content";
import { CtaBand, PageFrame, PageIntro } from "../site/shared";

export const metadata: Metadata = { title: "منتجاتنا", description: "منتجات ذكاء اصطناعي جاهزة للتشغيل من برايد آيديا للمؤسسات العربية.", openGraph: { title: "منتجاتنا", description: "محفظة منتجات برايد آيديا للمؤسسات العربية.", locale: "ar_YE", type: "website" } };

export default function ProductsPage() {
  return <PageFrame><main id="main-content"><PageIntro eyebrow="محفظة برايد آيديا" title="منتجات ذكية جاهزة للتشغيل" description="طوّرنا منتجات تحل تحديات متكررة لدى المؤسسات، ويمكن تخصيصها وربطها بأنظمتك ونشرها بالطريقة التي تناسبك." />
    <section className="pi-page-body"><div className="pi-wrap"><div className="pi-service-links">{products.map((product) => <article className="pi-service-link" key={product.slug}><h2><Link href={`/products/${product.slug}`}>{product.name}{product.arabic && ` | ${product.arabic}`}</Link></h2><p>{product.description}</p><Link className="pi-text-link" href={`/products/${product.slug}`}>تفاصيل المنتج <span aria-hidden="true">←</span></Link></article>)}</div><div className="pi-content-section"><h2>حلولنا في مكانها المناسب</h2><p>خدمة العملاء والمحادثات: DarAI | داري</p><p>حلولنا الرقمية للهوية والامتثال: PrideScreen · PridePass</p><p>الفعاليات: الدعوات الذكية</p></div></div></section><div className="pi-wrap"><CtaBand title="لنتحدث عن احتياج مؤسستك" button="تحدّث مع خبير" /></div>
  </main></PageFrame>;
}
