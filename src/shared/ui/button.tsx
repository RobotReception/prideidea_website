import type { ComponentProps } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '@/shared/lib'
import { buttonVariants, type ButtonVariants } from './button-variants'

export type ButtonProps = ComponentProps<'button'> & ButtonVariants

export function Button({ className, variant, size, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}

export type ButtonLinkProps = LinkProps & ButtonVariants

/** A router link styled as a button. */
export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
