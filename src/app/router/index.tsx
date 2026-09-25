import { createBrowserRouter } from 'react-router'
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
    children: [
      { path: ROUTES.home, lazy: page(() => import('@/pages/home/home-page')) },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
