import { cn } from '@/shared/lib'

export function Container({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('mx-auto w-full max-w-(--container) px-(--gutter)', className)} {...props} />
  )
}
