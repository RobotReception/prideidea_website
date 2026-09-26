import type { Metadata } from "next";
import { sectors } from "../site/content";
import { CtaBand, PageFrame, PageIntro } from "../site/shared";

export const metadata: Metadata = { title: "القطاعات التي نخدمها", description: "حلول برايد آيديا للقطاعات التي تتعامل مع عملاء كُثر.", openGraph: { title: "القطاعات التي نخدمها", description: "حلول تفهم طبيعة قطاعك.", locale: "ar_YE", type: "website" } };

export default function IndustriesPage() {
  return <PageFrame><main id="main-content"><PageIntro eyebrow="القطاعات" title="حلول تفهم طبيعة قطاعك" description="لكل قطاع تحدياته. لذلك نربط خدماتنا ومنتجاتنا بما يحتاجه قطاعك فعلًا." />
    <section className="pi-page-body"><div className="pi-wrap"><div className="pi-sector-table-wrap"><table className="pi-sector-table"><thead><tr><th>القطاع</th><th>التحدي</th><th>كيف نساعد</th><th>الحلول المناسبة</th></tr></thead><tbody>{sectors.map((sector) => <tr key={sector.name}><td>{sector.name}</td><td>{sector.challenge}</td><td>{sector.solution}</td><td>{sector.offers}</td></tr>)}</tbody></table></div></div></section>
    <div className="pi-wrap"><CtaBand title="لم تجد قطاعك؟" button="أخبرنا عن احتياجك" /></div>
  </main></PageFrame>;
}
