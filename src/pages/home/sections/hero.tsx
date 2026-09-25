import { HOME } from '@/shared/content'
import { ButtonLink, Heading, Section } from '@/shared/ui'
import { Qamariya } from '@/widgets/qamariya'

export function Hero() {
  const { hero } = HOME
  return (
    <Section containerClassName="grid items-center gap-x-12 gap-y-14 lg:grid-cols-12">
      <div className="flex flex-col gap-7 lg:col-span-7">
        <Heading as="h1" size="display" className="max-w-[15ch] text-ink">
          {hero.title}
        </Heading>
        <p className="max-w-[40ch] text-lead text-slate">{hero.subtitle}</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to={hero.primary.to}>{hero.primary.label}</ButtonLink>
          <ButtonLink to={hero.secondary.to} variant="outline">
            {hero.secondary.label}
          </ButtonLink>
        </div>
      </div>
      <div className="lg:col-span-5">
        <Qamariya className="mx-auto max-w-[15rem] sm:max-w-[18rem] lg:ms-0 lg:me-auto lg:max-w-[22rem]" />
      </div>
    </Section>
  )
}
