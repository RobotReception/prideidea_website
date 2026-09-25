import { useLocation } from 'react-router'
import { SITE } from '@/shared/config'

/**
 * Per-page SEO. React 19 hoists <title>, <meta> and <link> into <head>,
 * so this works both in the browser and when pages are pre-rendered.
 */
export function Seo({ title, description }: { title: string; description: string }) {
  const { pathname } = useLocation()
  const url = new URL(pathname, SITE.url).href
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ar_YE" />
      <meta property="og:site_name" content={SITE.legalName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={new URL('/og-image.png', SITE.url).href} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  )
}
