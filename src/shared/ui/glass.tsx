import type { Glass } from '@/shared/content'
import { cn } from '@/shared/lib'

const GLASS: Record<Glass, string> = {
  amber: 'bg-amber',
  ruby: 'bg-ruby',
  turquoise: 'bg-turquoise',
  clear: 'bg-gypsum ring-ink ring-[1.5px] ring-inset',
}

/** A single qamariya pane — the colour marker of a product. */
export function GlassPane({ glass, className }: { glass: Glass; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('inline-block size-4 rounded-t-full', GLASS[glass], className)}
    />
  )
}
