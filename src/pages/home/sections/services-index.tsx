import { Link } from 'react-router'
import { HOME, SERVICES } from '@/shared/content'
import { Heading, Section } from '@/shared/ui'

/** Services as a ruled index — a table of contents, not a grid of cards. */
export function ServicesIndex() {
  return (
    <Section rule aria-labelledby="services-title" containerClassName="flex flex-col gap-10">
      <Heading id="services-title" as="h2" className="text-ink">
        {HOME.services.title}
      </Heading>
      <ul className="border-b border-mullion">
        {SERVICES.map((service) => (
          <li key={service.slug} className="border-t border-mullion">
            <Link
              to={service.to}
              className="grid gap-2 py-7 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <h3 className="font-display text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold text-ink md:col-span-5">
                {service.title}
              </h3>
              <p className="text-slate md:col-span-7">{service.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
