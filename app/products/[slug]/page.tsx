import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "../../site/content";
import { BulletList, CtaBand, PageFrame, PageIntro } from "../../site/shared";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  const titles: Record<string, string> = { darai: "DarAI | داري", pridescreen: "PrideScreen", pridepass: "PridePass", "smart-invitations": "الدعوات الذكية" };
  return product ? { title: titles[slug] ?? product.name, description: product.description, openGraph: { title: titles[slug] ?? product.name, description: product.description, locale: "ar_YE", type: "website" } } : { title: "المنتج غير موجود" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) notFound();
  return <PageFrame><main id="main-content"><PageIntro eyebrow={`منتجات برايد آيديا / ${product.name}`} title={product.title} description={product.description} action={{ href: "/contact", label: product.cta }} />
    <section className="pi-page-body"><div className="pi-wrap">
      {product.problem && <section className="pi-content-section"><h2>التحدي</h2><BulletList items={product.problem} /></section>}
      {product.process && <section className="pi-content-section"><h2>كيف يعمل</h2><BulletList items={product.process} ordered /></section>}
      {product.features && <section className="pi-content-section"><h2>{product.slug === "darai" ? "الميزات" : product.slug === "pridepass" ? "الفوائد" : "ما يقدّمه"}</h2><BulletList items={product.features} /></section>}
      {product.channels && <section className="pi-content-section is-soft"><h2>القنوات</h2><p>{product.channels}</p><h2>التكاملات</h2><p>{product.integrations}</p><h2>الأمان</h2><p>{product.security}</p><h2>خيارات النشر</h2><p>{product.deployment}</p><p>الباقات: <span className="pi-placeholder">تُعرض بعد اعتماد الأسعار النهائية، أو زر «اطلب عرض سعر».</span></p></section>}
      <section className="pi-content-section"><h2>لمن</h2><div className="pi-tag-row">{product.audiences.map((audience) => <span key={audience}>{audience}</span>)}</div></section>
    </div></section><div className="pi-wrap"><CtaBand title={product.slug === "darai" ? "لا تخسر عميلًا بعد اليوم." : product.title} button={product.cta} /></div>
  </main></PageFrame>;
}
