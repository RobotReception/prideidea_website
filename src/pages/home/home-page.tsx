import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/shared/config'
import { usePageMeta } from '@/shared/hooks'
import { Badge, ButtonLink, Container, Heading, Section, SectionHeader, Text } from '@/shared/ui'
import { CtaBanner } from '@/widgets/cta-banner'
import { ServicesGrid } from '@/widgets/services-grid'

const STATS = [
  { value: '120+', key: 'projects' },
  { value: '80+', key: 'clients' },
  { value: '8', key: 'years' },
] as const

export default function HomePage() {
  const { t, i18n } = useTranslation()
  const Arrow = i18n.dir() === 'rtl' ? ArrowLeft : ArrowRight
  usePageMeta({ title: t('meta.title'), description: t('meta.description') })

  return (
    <>
      {/* Hero */}
      <section className="relative -mt-(--header-height) overflow-hidden pt-(--header-height)">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute start-1/2 -top-40 size-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl rtl:translate-x-1/2" />
          <div className="absolute end-0 top-40 size-80 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <Container className="flex flex-col items-center gap-8 py-24 text-center md:py-36">
          <Badge className="animate-fade-up">
            <Sparkles className="size-3.5" aria-hidden />
            {t('home.badge')}
          </Badge>
          <Heading
            as="h1"
            size="display"
            className="max-w-4xl animate-fade-up [animation-delay:80ms]"
          >
            {t('home.title')}
          </Heading>
          <Text
            size="lg"
            tone="muted"
            className="max-w-2xl animate-fade-up [animation-delay:160ms]"
          >
            {t('home.subtitle')}
          </Text>
          <div className="flex animate-fade-up flex-wrap justify-center gap-3 [animation-delay:240ms]">
            <ButtonLink to={ROUTES.contact} size="lg">
              {t('home.primaryCta')}
              <Arrow />
            </ButtonLink>
            <ButtonLink to={ROUTES.services} size="lg" variant="outline">
              {t('home.secondaryCta')}
            </ButtonLink>
          </div>

          <dl className="mt-10 grid w-full max-w-3xl grid-cols-3 gap-6 border-t border-border pt-10">
            {STATS.map((stat) => (
              <div key={stat.key} className="flex flex-col-reverse gap-1">
                <dt className="text-sm text-muted-foreground">{t(`home.stats.${stat.key}`)}</dt>
                <dd className="text-3xl font-bold md:text-4xl" dir="ltr">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section tone="surface">
        <SectionHeader title={t('home.servicesTitle')} subtitle={t('home.servicesSubtitle')} />
        <ServicesGrid />
      </Section>

      <CtaBanner />
    </>
  )
}
