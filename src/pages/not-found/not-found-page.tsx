import { ROUTES } from '@/shared/config'
import { ButtonLink, Heading, Section, Seo } from '@/shared/ui'

export default function NotFoundPage() {
  return (
    <Section containerClassName="flex flex-col items-start gap-6">
      <Seo title="الصفحة غير موجودة | برايد آيديا" description="الصفحة المطلوبة غير موجودة." />
      <p className="font-display text-h2 text-slate" dir="ltr">
        404
      </p>
      <Heading as="h1" size="h1" className="text-ink">
        الصفحة غير موجودة
      </Heading>
      <p className="text-lead text-slate">ربما نُقلت الصفحة أو تغيّر رابطها.</p>
      <ButtonLink to={ROUTES.home} variant="outline">
        العودة إلى الرئيسية
      </ButtonLink>
    </Section>
  )
}
