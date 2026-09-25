import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib'

const headingVariants = cva('font-bold tracking-tight text-balance', {
  variants: {
    size: {
      display: 'text-4xl leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl',
      h1: 'text-4xl leading-tight md:text-5xl',
      h2: 'text-3xl leading-tight md:text-4xl',
      h3: 'text-xl leading-snug md:text-2xl',
      h4: 'text-lg leading-snug',
    },
  },
  defaultVariants: { size: 'h2' },
})

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p'

export type HeadingProps = ComponentProps<'h2'> &
  VariantProps<typeof headingVariants> & { as?: HeadingTag }

/** Visual size is decoupled from the semantic tag to keep the outline correct. */
export function Heading({ as: Tag = 'h2', size, className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />
}

const textVariants = cva('text-pretty', {
  variants: {
    size: { sm: 'text-sm', md: 'text-base leading-relaxed', lg: 'text-lg leading-relaxed' },
    tone: { default: '', muted: 'text-muted-foreground' },
  },
  defaultVariants: { size: 'md', tone: 'default' },
})

export type TextProps = ComponentProps<'p'> & VariantProps<typeof textVariants>

export function Text({ size, tone, className, ...props }: TextProps) {
  return <p className={cn(textVariants({ size, tone }), className)} {...props} />
}
