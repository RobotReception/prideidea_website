import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "../../site/content";
import { BulletList, CtaBand, PageFrame, PageIntro } from "../../site/shared";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);
  return service ? { title: service.name, description: service.description, openGraph: { title: service.name, description: service.description, locale: "ar_YE", type: "website" } } : { title: "الخدمة غير موجودة" };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);
  if (!service) notFound();
  return <PageFrame><main id="main-content"><PageIntro eyebrow={`خدماتنا / ${service.name}`} title={service.title} description={service.description} action={{ href: "/contact", label: service.cta }} />
    <section className="pi-page-body"><div className="pi-wrap">
      {service.points && <section className="pi-content-section"><h2>ما نقدّمه</h2><BulletList items={service.points} /></section>}
      {service.process && <section className="pi-content-section"><h2>كيف نعمل</h2><BulletList items={service.process} ordered /></section>}
      {service.groups?.map((group) => <section className="pi-content-section" key={group.title}><h2>{group.title}</h2><BulletList items={group.points} /></section>)}
      {service.value && <section className="pi-content-section"><h2>القيمة لمؤسستك</h2><p className="pi-value-note">{service.value}</p></section>}
    </div></section><div className="pi-wrap"><CtaBand title={service.cta} description="أخبرنا عن التحدي الذي تواجهه، وسنقترح عليك الحل المناسب." button={service.cta} /></div>
  </main></PageFrame>;
}
