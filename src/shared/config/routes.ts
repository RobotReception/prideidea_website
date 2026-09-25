/** Central route map — never hard-code paths in components. */
export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  contact: '/contact',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

/** Items shown in the main navigation. `labelKey` is an i18n key. */
export const NAV_ITEMS = [
  { to: ROUTES.home, labelKey: 'nav.home' },
  { to: ROUTES.about, labelKey: 'nav.about' },
  { to: ROUTES.services, labelKey: 'nav.services' },
  { to: ROUTES.contact, labelKey: 'nav.contact' },
] as const
