import { getContent, pageMetadata } from "../content";
import { CtaBand, PageFrame, PageIntro } from "../site/shared";

export const generateMetadata = () => pageMetadata((t) => t.industriesPage.meta);

export default async function IndustriesPage() {
  const { t } = await getContent();
  const page = t.industriesPage;
  return <PageFrame><main id="main-content"><PageIntro eyebrow={page.eyebrow} title={page.title} description={page.description} />
    <section className="pi-page-body"><div className="pi-wrap"><div className="pi-sector-table-wrap"><table className="pi-sector-table"><thead><tr>{page.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{t.sectors.map((sector) => <tr key={sector.name}><td>{sector.name}</td><td>{sector.challenge}</td><td>{sector.solution}</td><td>{sector.offers}</td></tr>)}</tbody></table></div></div></section>
    <div className="pi-wrap"><CtaBand title={page.cta.title} button={page.cta.button} /></div>
  </main></PageFrame>;
}
