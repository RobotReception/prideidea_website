import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib'
import { Container } from './container'

/**
 * The only place vertical spacing between sections is defined.
 * Components inside a section never set outer margins.
 */
const sectionVariants = cva('', {
  variants: {
    spacing: {
      default: 'py-(--section-y)',
      compact: 'py-[calc(var(--section-y)*0.5)]',
    },
    tone: {
      gypsum: 'bg-gypsum text-night',
      white: 'bg-white text-night',
      night: 'on-dark bg-night text-gypsum',
      ink: 'on-dark bg-ink text-gypsum',
    },
    rule: { true: 'border-t border-mullion', false: '' },
  },
  defaultVariants: { spacing: 'default', tone: 'gypsum', rule: false },
})

export type SectionProps = React.ComponentProps<'section'> &
  VariantProps<typeof sectionVariants> & { containerClassName?: string }

export function Section({
  className,
  containerClassName,
  spacing,
  tone,
  rule,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants({ spacing, tone, rule }), className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
