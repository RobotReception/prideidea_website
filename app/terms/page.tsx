import { getContent, pageMetadata } from "../content";
import { PageFrame, PageIntro, PolicyNote } from "../site/shared";

export const generateMetadata = () => pageMetadata((t) => t.termsPage.meta);

export default async function TermsPage() {
  const { t: { termsPage: page } } = await getContent();
  return <PageFrame><main id="main-content"><PageIntro eyebrow={page.eyebrow} title={page.title} /><section className="pi-page-body"><div className="pi-wrap"><PolicyNote text={page.note} /></div></section></main></PageFrame>;
}
