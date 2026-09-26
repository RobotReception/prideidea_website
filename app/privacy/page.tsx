import { getContent, pageMetadata } from "../content";
import { PageFrame, PageIntro, PolicyNote } from "../site/shared";

export const generateMetadata = () => pageMetadata((t) => t.privacyPage.meta);

export default async function PrivacyPage() {
  const { t: { privacyPage: page } } = await getContent();
  return <PageFrame><main id="main-content"><PageIntro eyebrow={page.eyebrow} title={page.title} /><section className="pi-page-body"><div className="pi-wrap"><PolicyNote text={page.note} /></div></section></main></PageFrame>;
}
