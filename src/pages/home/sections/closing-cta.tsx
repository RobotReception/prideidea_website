import { HOME } from '@/shared/content'
import { ButtonLink, Heading, Section } from '@/shared/ui'

export function ClosingCta() {
  const { cta } = HOME
  return (
    <Section containerClassName="grid gap-8 lg:grid-cols-12 lg:items-end">
      <Heading as="h2" size="h1" className="text-ink lg:col-span-7">
        {cta.title}
      </Heading>
      <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9">
        <p className="text-lead text-slate">{cta.body}</p>
        <ButtonLink to={cta.button.to}>{cta.button.label}</ButtonLink>
      </div>
    </Section>
  )
}
