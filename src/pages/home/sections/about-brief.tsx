import { HOME } from '@/shared/content'
import { Heading, Section, TextLink } from '@/shared/ui'

export function AboutBrief() {
  const { about } = HOME
  return (
    <Section rule containerClassName="grid gap-8 lg:grid-cols-12">
      <Heading as="h2" className="text-ink lg:col-span-5">
        {about.title}
      </Heading>
      <div className="flex flex-col items-start gap-6 lg:col-span-6 lg:col-start-7">
        <p className="text-lead">{about.body}</p>
        <TextLink to={about.link.to}>{about.link.label}</TextLink>
      </div>
    </Section>
  )
}
