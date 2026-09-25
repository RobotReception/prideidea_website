import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib'

const fieldBase =
  'border-border bg-background placeholder:text-muted-foreground w-full rounded-md border px-4 text-sm transition-colors outline-none focus-visible:border-primary disabled:opacity-50 aria-invalid:border-danger'

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(fieldBase, 'h-11', className)} {...props} />
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(fieldBase, 'min-h-32 py-3', className)} {...props} />
}

export function Label({ className, ...props }: ComponentProps<'label'>) {
  return <label className={cn('text-sm font-medium', className)} {...props} />
}
