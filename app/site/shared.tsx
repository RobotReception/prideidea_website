import Link from "next/link";
import { getContent, site } from "../content";
import { RevealSections } from "./RevealSections";
import { SiteHeader } from "./SiteChrome";

export async function PageFrame({ children }: { children: React.ReactNode }) {
  const { lang, t } = await getContent();
  return <>
    <a className="pi-skip" href="#main-content">{t.ui.skipToContent}</a>
    <SiteHeader t={{ ui: t.ui, nav: t.nav }} lang={lang} />
    {children}
    <RevealSections />
    <footer className="pi-footer">
      <div className="pi-footer-main">
        <div className="pi-footer-about">
          <Link href="/" className="pi-footer-wordmark">{t.footer.wordmark}</Link>
          <p>{t.footer.about}</p>
          <span className="pi-footer-motto">{t.footer.motto} <i>·</i> <bdi>{t.footer.mottoSecondary}</bdi></span>
        </div>
        <div><h2>{t.footer.linksTitle}</h2>{t.nav.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}<Link href="/faq">{t.footer.faqLink}</Link></div>
        <div><h2>{t.footer.productsTitle}</h2>{t.products.map((product) => <Link key={product.slug} href={`/products/${product.slug}`}>{product.name}</Link>)}</div>
        <div><h2>{t.footer.contactTitle}</h2><a href={site.phoneHref} dir="ltr">{site.phone}</a><a href={`mailto:${site.email}`}>{site.email}</a><span>{t.footer.location}</span><span>{site.handle}</span></div>
      </div>
      <div className="pi-footer-bottom"><span>{t.footer.copyright}</span><span><Link href="/privacy">{t.footer.privacy}</Link><Link href="/terms">{t.footer.terms}</Link></span></div>
    </footer>
    <a className="pi-whatsapp" href={site.whatsappHref} target="_blank" rel="noreferrer" aria-label={t.ui.whatsappAria}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L4 20l1-4a8.4 8.4 0 1 1 15.5-4.3Z"/><path d="M9 8.5c.3-.5.6-.5.9-.5l.7 1.6c.1.3.1.5-.1.7l-.5.6c.6 1.1 1.5 2 2.7 2.6l.6-.6c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.3.6-.2.8-.8 1.4-1.7 1.5-1.4.2-3.4-.8-5-2.3-1.5-1.5-2.5-3.5-2.2-4.8.1-.5.5-.9 1-1.1Z"/></svg>
    </a>
  </>;
}

export function PageIntro({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: { href: string; label: string } }) {
  return <header className="pi-page-intro"><div className="pi-wrap">{eyebrow && <p className="pi-eyebrow">{eyebrow}</p>}<h1>{title}</h1>{description && <p className="pi-lead"><ContentText text={description} /></p>}{action && <Link className="pi-button pi-intro-action" href={action.href}>{action.label}</Link>}</div></header>;
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return <div className="pi-section-heading">{eyebrow && <p className="pi-eyebrow">{eyebrow}</p>}<h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

// Text wrapped in [square brackets] in the content files renders as a highlighted "to be confirmed" placeholder.
export function ContentText({ text }: { text: string }) {
  return <>{text.split(/(\[[^\]]+\])/g).map((part, i) => part.startsWith("[") && part.endsWith("]") ? <span className="pi-placeholder" key={i}>{part}</span> : part)}</>;
}

export function CtaBand({ title, description, button }: { title: string; description?: string; button: string }) {
  return <section className="pi-cta-band"><div><h2>{title}</h2>{description && <p>{description}</p>}</div><Link href="/contact" className="pi-button pi-button-light">{button}</Link></section>;
}

export function BulletList({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return <Tag className={ordered ? "pi-steps" : "pi-list"}>{items.map((item, index) => <li key={`${index}-${item}`}>{ordered && <span className="pi-step-index">{String(index + 1).padStart(2, "0")}</span>}<span><ContentText text={item} /></span></li>)}</Tag>;
}

export function PolicyNote({ text }: { text: string }) {
  return <div className="pi-policy-note"><ContentText text={text} /></div>;
}

export function ArrowLink({ href, label, arrow }: { href: string; label: string; arrow: string }) {
  return <Link href={href} className="pi-text-link">{label} <span aria-hidden="true">{arrow}</span></Link>;
}
