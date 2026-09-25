import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { NAV_ITEMS, siteConfig } from '@/shared/config'
import { Container, Logo, Text } from '@/shared/ui'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-xs flex-col gap-3">
          <Logo />
          <Text size="sm" tone="muted">
            {t('footer.tagline')}
          </Text>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <a
          href={`mailto:${siteConfig.email}`}
          className="text-sm text-muted-foreground hover:text-foreground"
          dir="ltr"
        >
          {siteConfig.email}
        </a>
      </Container>
      <Container className="border-t border-border py-6 text-xs text-muted-foreground">
        © {year} {siteConfig.name}. {t('footer.rights')}
      </Container>
    </footer>
  )
}
