/** Central route map — never hard-code paths in components. */
export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  service: (slug: ServiceSlug) => `/services/${slug}`,
  products: '/products',
  product: (slug: ProductSlug) => `/products/${slug}`,
  industries: '/industries',
  successStories: '/success-stories',
  contact: '/contact',
  faq: '/faq',
  privacy: '/privacy',
  terms: '/terms',
} as const

export type ServiceSlug =
  | 'enterprise-ai'
  | 'process-automation'
  | 'systems-integration'
  | 'custom-solutions'
  | 'training-consulting'

export type ProductSlug = 'darai' | 'pridescreen' | 'pridepass' | 'smart-invitations'
