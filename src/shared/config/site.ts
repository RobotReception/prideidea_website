export const siteConfig = {
  name: 'PrideIdea',
  url: import.meta.env.VITE_SITE_URL ?? 'https://prideidea.com',
  email: 'hello@prideidea.com',
  phone: '+000 000 000 000',
  social: {
    x: 'https://x.com/',
    linkedin: 'https://linkedin.com/',
    instagram: 'https://instagram.com/',
  },
} as const
