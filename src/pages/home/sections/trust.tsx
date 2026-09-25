import { HOME } from '@/shared/content'
import { Heading, Pending, Section } from '@/shared/ui'

const unbracket = (s: string) => s.replace(/^\[|\]$/g, '')

export function Trust() {
  const { trust } = HOME
  return (
    <Section
      tone="white"
      spacing="compact"
      rule
      aria-labelledby="trust-title"
      containerClassName="grid items-center gap-6 md:grid-cols-12"
    >
      <Heading id="trust-title" as="h2" size="h3" className="md:col-span-3">
        {trust.title}
      </Heading>
      <div className="flex flex-col gap-3 md:col-span-9">
        <Pending block className="grid min-h-20 place-items-center text-center text-slate">
          {unbracket(trust.logos)}
        </Pending>
        <Pending block className="text-small">
          {unbracket(trust.badge)}
        </Pending>
      </div>
    </Section>
  )
}
