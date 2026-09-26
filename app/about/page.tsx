import { getContent, pageMetadata } from "../content";
import { BulletList, ContentText, CtaBand, PageFrame, PageIntro, PolicyNote } from "../site/shared";

export const generateMetadata = () => pageMetadata((t) => t.about.meta);

export default async function AboutPage() {
  const { t: { about } } = await getContent();
  return <PageFrame><main id="main-content"><PageIntro eyebrow={about.eyebrow} title={about.title} description={about.description} />
    <section className="pi-page-body"><div className="pi-wrap">
      <section className="pi-content-section"><h2>{about.story.title}</h2>{about.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<PolicyNote text={about.story.note} /></section>
      <section className="pi-content-section"><h2>{about.vision.title}</h2><p>{about.vision.text}</p></section>
      <section className="pi-content-section"><h2>{about.mission.title}</h2><p>{about.mission.text}</p></section>
      <section className="pi-content-section"><h2>{about.values.title}</h2><BulletList items={about.values.items} /></section>
      <section className="pi-content-section"><h2>{about.leadership.title}</h2><h3>{about.leadership.name}</h3><p>{about.leadership.bio}</p><PolicyNote text={about.leadership.note} /><p><ContentText text={about.leadership.team} /></p></section>
      <section className="pi-content-section"><h2>{about.capacity.title}</h2><p>{about.capacity.text}</p><BulletList items={about.capacity.items} /></section>
    </div></section><div className="pi-wrap"><CtaBand title={about.cta.title} button={about.cta.button} /></div>
  </main></PageFrame>;
}
