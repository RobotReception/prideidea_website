import { useEffect } from 'react'
import { siteConfig } from '@/shared/config'

/** Sets the document title (and description) for the current page. */
export function usePageMeta({ title, description }: { title?: string; description?: string }) {
  useEffect(() => {
    document.title = title ? `${title} | ${siteConfig.name}` : siteConfig.name
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}
