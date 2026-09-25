import { ROUTES } from '@/shared/config'

/** Source: «محتوى موقع برايد آيديا» — القائمة الرئيسية. */
export const MAIN_NAV = [
  { to: ROUTES.home, label: 'الرئيسية' },
  { to: ROUTES.about, label: 'من نحن' },
  { to: ROUTES.services, label: 'الخدمات' },
  { to: ROUTES.products, label: 'المنتجات' },
  { to: ROUTES.industries, label: 'القطاعات' },
  { to: ROUTES.successStories, label: 'قصص النجاح' },
  { to: ROUTES.contact, label: 'تواصل معنا' },
] as const

export const EXPERT_CTA = { to: ROUTES.contact, label: 'تحدّث مع خبير' } as const
