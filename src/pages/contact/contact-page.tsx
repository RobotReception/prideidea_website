import { Mail, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ContactForm } from '@/features/contact-form'
import { siteConfig } from '@/shared/config'
import { usePageMeta } from '@/shared/hooks'
import { Card, Section, SectionHeader } from '@/shared/ui'

export default function ContactPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('contact.title'), description: t('contact.subtitle') })

  return (
    <Section spacing="lg">
      <SectionHeader title={t('contact.title')} subtitle={t('contact.subtitle')} />
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
          >
            <Mail className="size-5 text-primary" aria-hidden />
            <span dir="ltr">{siteConfig.email}</span>
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
          >
            <Phone className="size-5 text-primary" aria-hidden />
            <span dir="ltr">{siteConfig.phone}</span>
          </a>
        </div>
        <Card className="p-6 md:p-8">
          <ContactForm />
        </Card>
      </div>
    </Section>
  )
}
