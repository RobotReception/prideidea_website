import { cva, type VariantProps } from 'class-variance-authority'
import { Link, type LinkProps } from 'react-router'
import { cn } from '@/shared/lib'

/**
 * Amber is reserved for the action we want most (talk to an expert / book).
 * Everything else is an ink outline.
 */
const buttonVariants = cva(
  'inline-flex min-h-12 items-center justify-center rounded-[3px] px-6 text-body font-semibold whitespace-nowrap transition-colors duration-150',
  {
    variants: {
      variant: {
        amber: 'bg-amber text-night hover:bg-[#ffa21f]',
        outline: 'border-[1.5px] border-ink text-ink hover:bg-ink hover:text-gypsum',
        'outline-light':
          'border-[1.5px] border-gypsum/70 text-gypsum hover:bg-gypsum hover:text-night',
      },
      size: {
        md: '',
        sm: 'min-h-10 px-4 text-small',
      },
    },
    defaultVariants: { variant: 'amber', size: 'md' },
  },
)

export type ButtonLinkProps = LinkProps & VariantProps<typeof buttonVariants>

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export function Button({
  className,
  variant,
  size,
  type = 'button',
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}
