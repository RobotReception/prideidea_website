import { Eye, Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePageMeta } from '@/shared/hooks'
import { Card, CardDescription, CardTitle, Section, SectionHeader } from '@/shared/ui'
import { CtaBanner } from '@/widgets/cta-banner'

export default function AboutPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('about.title'), description: t('about.subtitle') })

  const blocks = [
    { icon: Target, title: t('about.mission'), text: t('about.missionText') },
    { icon: Eye, title: t('about.vision'), text: t('about.visionText') },
  ]

  return (
    <>
      <Section spacing="lg">
        <SectionHeader title={t('about.title')} subtitle={t('about.subtitle')} />
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {blocks.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="flex flex-col gap-3">
              <Icon className="size-8 text-primary" aria-hidden />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{text}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>
      <CtaBanner />
    </>
  )
}
