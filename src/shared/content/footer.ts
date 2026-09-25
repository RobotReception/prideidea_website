import { ROUTES } from '@/shared/config'
import { PRODUCTS } from './catalog'

/** Source: التذييل (Footer). */
export const FOOTER = {
  about: 'برايد آيديا لأنظمة الذكاء الاصطناعي — حلول ذكاء اصطناعي مؤسسية من صنعاء.',
  sloganAr: 'الفكرة تُلهم الفخر',
  sloganEn: 'Idea Inspires Pride',
  groups: [
    {
      title: 'روابط',
      links: [
        { to: ROUTES.about, label: 'من نحن' },
        { to: ROUTES.services, label: 'الخدمات' },
        { to: ROUTES.products, label: 'المنتجات' },
        { to: ROUTES.industries, label: 'القطاعات' },
        { to: ROUTES.successStories, label: 'قصص النجاح' },
        { to: ROUTES.contact, label: 'تواصل معنا' },
      ],
    },
    {
      title: 'المنتجات',
      links: PRODUCTS.map((p) => ({ to: p.to, label: p.name.split(' | ')[0] ?? p.name })),
    },
    {
      title: 'قانوني',
      links: [
        { to: ROUTES.privacy, label: 'سياسة الخصوصية' },
        { to: ROUTES.terms, label: 'شروط الاستخدام' },
      ],
    },
  ],
  rights: '© 2026 برايد آيديا لأنظمة الذكاء الاصطناعي. جميع الحقوق محفوظة.',
} as const
