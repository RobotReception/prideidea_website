import { HOME } from '@/shared/content'
import { Heading, RichText, Section, TextLink } from '@/shared/ui'

export function SuccessStory() {
  const { story } = HOME
  return (
    <Section
      tone="night"
      aria-labelledby="story-title"
      containerClassName="grid gap-10 lg:grid-cols-12"
    >
      <Heading id="story-title" as="h2" className="lg:col-span-4">
        {story.title}
      </Heading>
      <div className="flex flex-col items-start gap-6 lg:col-span-7 lg:col-start-6">
        <h3 className="font-display text-h1 font-bold text-amber">{story.name}</h3>
        <p className="text-lead">
          <RichText text={story.body} />
        </p>
        <p className="text-lead">
          <RichText text={story.results} />
        </p>
        <TextLink to={story.link.to} className="text-gypsum">
          {story.link.label}
        </TextLink>
      </div>
    </Section>
  )
}
