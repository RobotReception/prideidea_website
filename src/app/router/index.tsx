import { createBrowserRouter } from 'react-router'
import { ErrorPage } from '@/pages/error/error-page'
import NotFoundPage from '@/pages/not-found/not-found-page'
import { ROUTES } from '@/shared/config'
import { RootLayout } from '@/widgets/layout'

/** Pages are lazy-loaded so each route ships as its own chunk. */
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await load()).default,
})

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    children: [
      { path: ROUTES.home, lazy: page(() => import('@/pages/home/home-page')) },
      { path: ROUTES.about, lazy: page(() => import('@/pages/about/about-page')) },
      { path: ROUTES.services, lazy: page(() => import('@/pages/services/services-page')) },
      { path: ROUTES.contact, lazy: page(() => import('@/pages/contact/contact-page')) },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
