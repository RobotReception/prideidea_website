import { Link, type LinkProps } from 'react-router'
import { cn } from '@/shared/lib'

/** An inline text link. Deliberately arrow-free; the underline is the affordance. */
export function TextLink({ className, ...props }: LinkProps) {
  return (
    <Link
      className={cn(
        'inline-block font-semibold underline decoration-amber decoration-2 underline-offset-[0.4em] transition-[text-decoration-color] hover:decoration-current',
        className,
      )}
      {...props}
    />
  )
}
