import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'
import { NAV_ITEMS, ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Button, ButtonLink, Container, Logo } from '@/shared/ui'
import { LanguageSwitcher } from './language-switcher'
import { ThemeToggle } from './theme-toggle'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
  )

export function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        scrolled || open
          ? 'border-border bg-background/80 backdrop-blur-lg'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-(--header-height) items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end className={navLinkClass}>
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <ButtonLink to={ROUTES.contact} size="sm" className="ms-2 hidden md:inline-flex">
            {t('nav.cta')}
          </ButtonLink>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border md:hidden">
          {/* Close the menu when any link inside it is activated. */}
          <Container className="flex flex-col gap-1 py-4" onClick={() => setOpen(false)}>
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end className={navLinkClass}>
                {t(item.labelKey)}
              </NavLink>
            ))}
            <ButtonLink to={ROUTES.contact} className="mt-2">
              {t('nav.cta')}
            </ButtonLink>
          </Container>
        </nav>
      )}
    </header>
  )
}
