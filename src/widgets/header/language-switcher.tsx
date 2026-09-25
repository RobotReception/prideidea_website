import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const next = i18n.resolvedLanguage === 'ar' ? 'en' : 'ar'
  return (
    <Button variant="ghost" size="sm" onClick={() => void i18n.changeLanguage(next)} lang={next}>
      <Languages />
      {t('language.switch')}
    </Button>
  )
}
