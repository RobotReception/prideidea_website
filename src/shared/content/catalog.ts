import { ROUTES, type ProductSlug, type ServiceSlug } from '@/shared/config'

/** Glass colour assigned to each product — all four carry equal weight. */
export type Glass = 'amber' | 'ruby' | 'turquoise' | 'clear'

export type ServiceSummary = { slug: ServiceSlug; to: string; title: string; summary: string }
export type ProductSummary = {
  slug: ProductSlug
  to: string
  name: string
  summary: string
  glass: Glass
}

/** Source: الصفحة الرئيسية — 4. خدماتنا. */
export const SERVICES: readonly ServiceSummary[] = [
  {
    slug: 'enterprise-ai',
    to: ROUTES.service('enterprise-ai'),
    title: 'الذكاء الاصطناعي المؤسسي',
    summary: 'مساعدون رقميون يفهمون العربية ويجيبون من معرفة مؤسستك.',
  },
  {
    slug: 'process-automation',
    to: ROUTES.service('process-automation'),
    title: 'أتمتة العمليات',
    summary: 'نحوّل إجراءاتك اليدوية إلى مسارات عمل آلية وموثوقة.',
  },
  {
    slug: 'systems-integration',
    to: ROUTES.service('systems-integration'),
    title: 'تكامل الأنظمة والبيانات',
    summary: 'نربط أنظمتك ونحوّل بياناتك إلى مؤشرات تدعم القرار.',
  },
  {
    slug: 'custom-solutions',
    to: ROUTES.service('custom-solutions'),
    title: 'الحلول المخصصة',
    summary: 'أنظمة ذكاء اصطناعي تُبنى على مقاس احتياجك.',
  },
  {
    slug: 'training-consulting',
    to: ROUTES.service('training-consulting'),
    title: 'التدريب والاستشارات',
    summary: 'نجهّز فرقك ونرسم معك خارطة طريق واضحة.',
  },
]

/** Source: الصفحة الرئيسية — 5. منتجاتنا. */
export const PRODUCTS: readonly ProductSummary[] = [
  {
    slug: 'darai',
    to: ROUTES.product('darai'),
    name: 'DarAI | داري',
    summary: 'منصة ذكية لإدارة محادثات العملاء من جميع القنوات في مكان واحد.',
    glass: 'amber',
  },
  {
    slug: 'pridescreen',
    to: ROUTES.product('pridescreen'),
    name: 'PrideScreen',
    summary: 'فحص ذكي للعملاء مقابل القوائم السوداء وقوائم العقوبات.',
    glass: 'ruby',
  },
  {
    slug: 'pridepass',
    to: ROUTES.product('pridepass'),
    name: 'PridePass',
    summary: 'تحقق إلكتروني من هوية العملاء عن بُعد.',
    glass: 'turquoise',
  },
  {
    slug: 'smart-invitations',
    to: ROUTES.product('smart-invitations'),
    name: 'الدعوات الذكية',
    summary: 'إدارة الفعاليات والدعوات والتحقق من الحضور عبر رمز QR.',
    glass: 'clear',
  },
]
