import { Outlet, ScrollRestoration } from 'react-router'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { WhatsAppButton } from '@/widgets/whatsapp'

export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 bg-amber px-4 py-2 font-semibold text-night focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        تخطَّ إلى المحتوى
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollRestoration />
    </div>
  )
}
