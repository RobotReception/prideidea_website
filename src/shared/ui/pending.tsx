import { Fragment } from 'react'
import { cn } from '@/shared/lib'

const PENDING_TITLE = 'محتوى معلّق — يُستبدل ببيانات موثقة قبل النشر'

/** A striped placeholder for content that awaits verification. */
export function Pending({
  className,
  block = false,
  children,
}: {
  className?: string
  block?: boolean
  children: React.ReactNode
}) {
  const Tag = block ? 'div' : 'span'
  return (
    <Tag
      data-pending=""
      title={PENDING_TITLE}
      className={cn('pending', block ? 'block px-4 py-3' : 'px-1', className)}
    >
      {children}
    </Tag>
  )
}

/**
 * Renders copy from the content document, turning every `[…]` segment
 * into a <Pending> placeholder. The brackets themselves are dropped.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[') && part.endsWith(']') ? (
          <Pending key={i}>{part.slice(1, -1)}</Pending>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
