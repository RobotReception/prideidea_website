import { getContent, pageMetadata } from "../content";
import { BulletList, ContentText, CtaBand, PageFrame, PageIntro, PolicyNote } from "../site/shared";

export const generateMetadata = () => pageMetadata((t) => t.storiesPage.meta);

export default async function SuccessStoriesPage() {
  const { t: { storiesPage: page } } = await getContent();
  const { labels } = page;
  return <PageFrame><main id="main-content"><PageIntro eyebrow={page.eyebrow} title={page.title} description={page.description} />
    <section className="pi-page-body"><div className="pi-wrap">
      {page.stories.map((story, index) => <article className={`pi-content-section${index % 2 ? " is-soft" : ""}`} key={story.title}>
        {story.sector && <p className="pi-eyebrow">{story.sector}</p>}
        <h2>{story.title}</h2>
        {story.note && <PolicyNote text={story.note} />}
        <p><strong>{labels.client}</strong> <ContentText text={story.client} /></p>
        <p><strong>{labels.challenge}</strong> <ContentText text={story.challenge} /></p>
        <p><strong>{labels.solution}</strong> <ContentText text={story.solution} /></p>
        {story.results.length > 0 && <><h3>{labels.resultsHeading}</h3><BulletList items={story.results} /></>}
        {story.resultsText && <p><strong>{labels.results}</strong> <ContentText text={story.resultsText} /></p>}
        {story.quote && <PolicyNote text={story.quote} />}
      </article>)}
    </div></section><div className="pi-wrap"><CtaBand title={page.cta.title} button={page.cta.button} /></div>
  </main></PageFrame>;
}
