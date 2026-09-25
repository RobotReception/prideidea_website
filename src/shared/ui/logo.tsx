import { Link } from 'react-router'
import lockupLight from '@/assets/brand/logo-lockup-light.png'
import lockup from '@/assets/brand/logo-lockup.png'
import { ROUTES, SITE } from '@/shared/config'
import { cn } from '@/shared/lib'

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link to={ROUTES.home} className={cn('inline-block shrink-0', className)}>
      <img
        src={light ? lockupLight : lockup}
        alt={`${SITE.legalName} — الصفحة الرئيسية`}
        width={552}
        height={136}
        className="h-full w-auto"
      />
    </Link>
  )
}
