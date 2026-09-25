import { useTranslation } from 'react-i18next'
import { usePageMeta } from '@/shared/hooks'
import { Section, SectionHeader } from '@/shared/ui'
import { CtaBanner } from '@/widgets/cta-banner'
import { ServicesGrid } from '@/widgets/services-grid'

export default function ServicesPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('services.title'), description: t('services.subtitle') })

  return (
    <>
      <Section spacing="lg">
        <SectionHeader title={t('services.title')} subtitle={t('services.subtitle')} />
        <ServicesGrid />
      </Section>
      <CtaBanner />
    </>
  )
}
