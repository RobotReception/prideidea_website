import { useTranslation } from 'react-i18next'
import { Outlet, ScrollRestoration } from 'react-router'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

export function RootLayout() {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-100 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t('nav.skipToContent')}
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
