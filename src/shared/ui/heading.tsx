import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib'

/** Visual size is independent of the semantic tag, keeping the outline correct. */
const headingVariants = cva('text-balance', {
  variants: {
    size: {
      display: 'font-display text-display font-bold',
      h1: 'font-display text-h1 font-bold',
      h2: 'font-display text-h2 font-semibold',
      h3: 'text-h3 font-semibold',
    },
  },
  defaultVariants: { size: 'h2' },
})

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p'

export function Heading({
  as: Tag = 'h2',
  size,
  className,
  ...props
}: React.ComponentProps<'h2'> & VariantProps<typeof headingVariants> & { as?: Tag }) {
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />
}
