import { useTranslation } from 'react-i18next'
import { isRouteErrorResponse, useRouteError } from 'react-router'
import { ROUTES } from '@/shared/config'
import { ButtonLink, Container, Heading, Text } from '@/shared/ui'
import NotFoundPage from '../not-found/not-found-page'

/** Route-level error boundary. */
export function ErrorPage() {
  const error = useRouteError()
  const { t } = useTranslation()

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />
  if (import.meta.env.DEV) console.error(error)

  return (
    <Container className="flex min-h-dvh flex-col items-center justify-center gap-5 text-center">
      <Heading as="h1" size="h2">
        {t('error.title')}
      </Heading>
      <Text tone="muted">{t('error.subtitle')}</Text>
      <ButtonLink to={ROUTES.home} reloadDocument>
        {t('error.back')}
      </ButtonLink>
    </Container>
  )
}
