import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/shared/hooks'
import { Button } from '@/shared/ui'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={t('theme.toggle')}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}
