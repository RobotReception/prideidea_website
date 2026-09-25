import { HOME } from '@/shared/content'
import { Heading, Section } from '@/shared/ui'

export function IndustriesAndWhy() {
  const { industries, why } = HOME
  return (
    <Section rule containerClassName="grid gap-16 lg:grid-cols-12 lg:gap-8">
      <div
        aria-labelledby="industries-title"
        role="region"
        className="flex flex-col gap-8 lg:col-span-5"
      >
        <Heading id="industries-title" as="h2" className="text-ink">
          {industries.title}
        </Heading>
        <ul className="border-b border-mullion">
          {industries.items.map((item) => (
            <li
              key={item}
              className="border-t border-mullion py-3 font-display text-[1.35rem] text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div
        aria-labelledby="why-title"
        role="region"
        className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7"
      >
        <Heading id="why-title" as="h2" className="text-ink">
          {why.title}
        </Heading>
        <dl className="flex flex-col gap-6">
          {why.items.map((item) => (
            <div key={item.lead} className="flex flex-col gap-1">
              <dt className="text-h3 font-semibold text-ink">{item.lead}</dt>
              <dd className="text-slate">{item.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
