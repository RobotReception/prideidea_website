import { Link } from 'react-router'
import { siteConfig, ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to={ROUTES.home}
      className={cn('inline-flex items-center gap-2 text-lg font-bold', className)}
      aria-label={siteConfig.name}
    >
      <span className="grid size-8 place-items-center rounded-md bg-primary text-sm text-primary-foreground">
        P
      </span>
      <span dir="ltr">{siteConfig.name}</span>
    </Link>
  )
}
