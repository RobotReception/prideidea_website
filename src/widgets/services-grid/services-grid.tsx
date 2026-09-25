import { useTranslation } from 'react-i18next'
import { Card, CardDescription, CardTitle } from '@/shared/ui'
import { SERVICES } from './services-data'

export function ServicesGrid({ limit }: { limit?: number }) {
  const { t } = useTranslation()
  const items = limit ? SERVICES.slice(0, limit) : SERVICES

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ id, icon: Icon }) => (
        <Card key={id} className="flex flex-col gap-4">
          <span className="grid size-12 place-items-center rounded-md bg-secondary text-secondary-foreground">
            <Icon className="size-6" aria-hidden />
          </span>
          <CardTitle>{t(`services.items.${id}.title`)}</CardTitle>
          <CardDescription>{t(`services.items.${id}.description`)}</CardDescription>
        </Card>
      ))}
    </div>
  )
}
