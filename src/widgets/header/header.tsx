import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { EXPERT_CTA, MAIN_NAV } from '@/shared/content'
import { cn } from '@/shared/lib'
import { ButtonLink, Container, Logo } from '@/shared/ui'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative py-2 text-small font-medium transition-colors',
    isActive
      ? 'text-night after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-amber'
      : 'text-slate hover:text-night',
  )

export function Header() {
  const [open, setOpen] = useState(false)

  // Lock page scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-mullion bg-gypsum">
      <Container className="flex h-(--header-h) items-center gap-6">
        <Logo className="h-8 sm:h-10" />

        <nav aria-label="القائمة الرئيسية" className="ms-auto hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {MAIN_NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink to={EXPERT_CTA.to} size="sm" className="ms-auto lg:ms-0">
          {EXPERT_CTA.label}
        </ButtonLink>

        <button
          type="button"
          className="-me-2 grid size-11 place-items-center text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="القائمة الرئيسية"
          className="fixed inset-x-0 top-(--header-h) bottom-0 overflow-y-auto border-t border-mullion bg-gypsum lg:hidden"
        >
          <Container>
            {/* Clicking any link closes the menu. */}
            <ul onClick={() => setOpen(false)} className="divide-y divide-mullion py-2">
              {MAIN_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      cn('block py-4 font-display text-h3', isActive ? 'text-night' : 'text-ink')
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  )
}
