import { HOME } from '@/shared/content'
import { Heading, Section } from '@/shared/ui'

/** A real sequence, so numbering is meaningful here. */
export function Process() {
  const { process } = HOME
  return (
    <Section aria-labelledby="process-title" containerClassName="flex flex-col gap-12">
      <Heading id="process-title" as="h2" className="text-ink">
        {process.title}
      </Heading>
      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {process.steps.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-3 border-t-2 border-ink pt-6">
            <span className="font-display text-[2.5rem] leading-none text-slate" aria-hidden>
              {i + 1}
            </span>
            <h3 className="text-h3 font-semibold text-ink">{step.title}</h3>
            <p className="text-slate">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
