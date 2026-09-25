import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/shared/lib'
import { Container } from './container'
import { Heading, Text } from './typography'

const sectionVariants = cva('relative', {
  variants: {
    spacing: { sm: 'py-12 md:py-16', md: 'py-16 md:py-24', lg: 'py-24 md:py-32' },
    tone: { default: '', surface: 'bg-surface text-surface-foreground' },
  },
  defaultVariants: { spacing: 'md', tone: 'default' },
})

export type SectionProps = ComponentProps<'section'> & VariantProps<typeof sectionVariants>

export function Section({ className, spacing, tone, children, ...props }: SectionProps) {
  return (
    <section className={cn(sectionVariants({ spacing, tone }), className)} {...props}>
      <Container>{children}</Container>
    </section>
  )
}

type SectionHeaderProps = {
  title: ReactNode
  subtitle?: ReactNode
  eyebrow?: ReactNode
  align?: 'start' | 'center'
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 flex max-w-2xl flex-col gap-4 md:mb-16',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {eyebrow}
      <Heading as="h2" size="h2">
        {title}
      </Heading>
      {subtitle && (
        <Text size="lg" tone="muted">
          {subtitle}
        </Text>
      )}
    </div>
  )
}
