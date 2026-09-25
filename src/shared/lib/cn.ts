import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge must know our custom type scale; otherwise it mistakes
 * `text-h2` for a colour and drops it next to `text-ink`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: { text: ['display', 'h1', 'h2', 'h3', 'lead', 'body', 'small'] },
  },
})

/** Merge conditional class names and resolve conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
