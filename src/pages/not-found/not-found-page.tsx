import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/shared/config'
import { usePageMeta } from '@/shared/hooks'
import { ButtonLink, Container, Heading, Text } from '@/shared/ui'

export default function NotFoundPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('notFound.title') })

  return (
    <Container className="flex flex-col items-center gap-5 py-32 text-center">
      <p className="text-7xl font-bold text-primary" dir="ltr">
        404
      </p>
      <Heading as="h1" size="h2">
        {t('notFound.title')}
      </Heading>
      <Text tone="muted">{t('notFound.subtitle')}</Text>
      <ButtonLink to={ROUTES.home}>{t('notFound.back')}</ButtonLink>
    </Container>
  )
}
