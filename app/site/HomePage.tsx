import Link from "next/link";
import { products, services } from "./content";
import { CtaBand, PageFrame, SectionHeading } from "./shared";
import { HeroArtwork } from "./HeroArtwork";

const reasons = [
  ["العربية أولًا", "حلولنا مبنية لفهم العربية واللهجات المحلية."],
  ["فهم السوق المحلي", "نعرف تحديات المؤسسات في بيئتنا ونصمم لها."],
  ["بياناتك تحت سيطرتك", "نشر سحابي، أو داخل خوادمك، أو نشر سيادي كامل."],
  ["حلول تعمل فعلًا", "نبني أنظمة قابلة للتشغيل والتوسع، لا نماذج استعراضية."],
  ["تكامل مع ما لديك", "نربط حلولنا بأنظمتك بدل أن نطلب منك استبدالها."],
];

export default function HomePage() {
  return <PageFrame>
    <main id="main-content">
      <section className="pi-home-hero">
        <div className="pi-hero-inner">
          <div className="pi-hero-copy">
            <p className="pi-eyebrow pi-hero-badge"><i /> برايد آيديا لأنظمة الذكاء الاصطناعي</p>
            <h1>حلول ذكاء اصطناعي <span>مصممة للمؤسسات</span></h1>
            <p className="pi-hero-lead">نحوّل تحديات مؤسستك إلى أنظمة ذكية تعمل من أجلك. نبني مساعدين رقميين، ونؤتمت الإجراءات، ونربط أنظمتك ببعضها، لتعمل مؤسستك بسرعة أكبر ودقة أعلى.</p>
            <div className="pi-hero-actions"><Link className="pi-button" href="/contact">تحدّث مع خبير <span aria-hidden="true">↖</span></Link><Link className="pi-button pi-button-outline" href="/services">استكشف خدماتنا</Link></div>
            <div className="pi-hero-proof"><span>العربية أولًا</span><span>من صنعاء</span><span>حلول مؤسسية</span></div>
          </div>
          <HeroArtwork />
        </div>
      </section>

      <section className="pi-section pi-about-strip is-white"><div className="pi-wrap pi-intro-layout">
        <SectionHeading eyebrow="من نحن باختصار" title="شريكك في التحول نحو التشغيل الذكي" />
        <div className="pi-intro-copy"><p>برايد آيديا لأنظمة الذكاء الاصطناعي شركة تقنية يمنية مقرها صنعاء. نطوّر حلول ذكاء اصطناعي مؤسسية باللغة العربية، تساعد المؤسسات على الانتقال من العمل اليدوي المجزأ إلى تشغيل ذكي قائم على البيانات والأتمتة.</p><Link href="/about" className="pi-text-link">تعرّف علينا <span aria-hidden="true">←</span></Link></div>
      </div></section>

      <section className="pi-section pi-services-showcase"><div className="pi-wrap">
        <SectionHeading eyebrow="الخدمات" title="ماذا نقدّم لمؤسستك؟" />
        <div className="pi-service-grid">{services.map((service, index) => <article className="pi-service-item" key={service.slug}><span className="pi-service-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{service.name}</h3><p>{service.description}</p><Link href={`/services/${service.slug}`} className="pi-text-link">تفاصيل الخدمة <span aria-hidden="true">←</span></Link></article>)}</div>
      </div></section>

      <section className="pi-section pi-products-showcase is-dark"><div className="pi-wrap">
        <SectionHeading eyebrow="محفظة المنتجات" title="منتجات جاهزة للتشغيل" description="طوّرنا منتجات تحل تحديات متكررة لدى المؤسسات، ويمكن تخصيصها وربطها بأنظمتك ونشرها بالطريقة التي تناسبك." light />
        <div className="pi-products-grid">{products.map((product, index) => <article className="pi-product-item" key={product.slug}><span className="pi-product-symbol" aria-hidden="true">{index === 0 ? "D" : index === 1 ? "P" : index === 2 ? "P" : "QR"}</span><h3>{product.name}{product.arabic && <span> | {product.arabic}</span>}</h3><p>{product.description}</p><Link href={`/products/${product.slug}`} className="pi-text-link">اكتشف المنتج <span aria-hidden="true">←</span></Link></article>)}</div>
        <p className="pi-intro-copy"><Link href="/products" className="pi-text-link">جميع المنتجات <span aria-hidden="true">←</span></Link></p>
      </div></section>

      <section className="pi-section pi-why-showcase is-petrol"><div className="pi-wrap pi-why-layout">
        <SectionHeading eyebrow="لماذا برايد آيديا" title="لماذا تختارنا المؤسسات؟" light />
        <ul className="pi-why-list">{reasons.map(([title, description]) => <li key={title}><strong>{title}</strong><span>{description}</span></li>)}</ul>
      </div></section>

      <div className="pi-wrap pi-home-cta"><CtaBand title="لنحوّل فكرتك إلى حل يعمل." description="أخبرنا عن التحدي الذي تواجهه، وسنقترح عليك المسار المناسب." button="تواصل معنا" /></div>
      <div className="pi-home-motto" aria-label="شعار برايد آيديا"><span>الفكرة تُلهم الفخر</span><i>·</i><span lang="en" dir="ltr">Idea Inspires Pride</span></div>
    </main>
  </PageFrame>;
}
