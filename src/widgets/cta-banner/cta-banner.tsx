import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/shared/config'
import { ButtonLink, Container, Heading, Text } from '@/shared/ui'

export function CtaBanner() {
  const { t, i18n } = useTranslation()
  const Arrow = i18n.dir() === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-xl bg-primary px-6 py-14 text-center text-primary-foreground md:px-16 md:py-20">
          <div
            aria-hidden
            className="absolute start-1/2 -top-24 size-72 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl rtl:translate-x-1/2"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <Heading as="h2" size="h2">
              {t('home.ctaTitle')}
            </Heading>
            <Text size="lg" className="opacity-85">
              {t('home.ctaSubtitle')}
            </Text>
            <ButtonLink
              to={ROUTES.contact}
              size="lg"
              className="mt-2 bg-background text-foreground hover:bg-background/90"
            >
              {t('nav.cta')}
              <Arrow />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
