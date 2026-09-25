import { Link } from 'react-router'
import { SITE } from '@/shared/config'
import { FOOTER } from '@/shared/content'
import { Container, Logo } from '@/shared/ui'

export function Footer() {
  return (
    <footer className="on-dark bg-night text-gypsum">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="flex flex-col gap-5 md:col-span-4">
          <Logo light className="h-10 self-start" />
          <p className="max-w-xs text-small text-mist">{FOOTER.about}</p>
          <p className="font-display text-h3">
            {FOOTER.sloganAr}
            <span className="mt-1 block font-sans text-small text-mist" lang="en" dir="ltr">
              {FOOTER.sloganEn}
            </span>
          </p>
        </div>

        {FOOTER.groups.map((group) => (
          <nav key={group.title} aria-label={group.title} className="md:col-span-2">
            <h2 className="mb-4 text-small font-semibold text-mist">{group.title}</h2>
            <ul className="flex flex-col gap-3">
              {group.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-amber">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <address className="flex flex-col gap-3 not-italic md:col-span-2">
          <h2 className="mb-1 text-small font-semibold text-mist">تواصل معنا</h2>
          <a
            href={`tel:${SITE.phone.replace(/\s/g, '')}`}
            className="self-start hover:text-amber"
            dir="ltr"
          >
            {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="self-start hover:text-amber" dir="ltr">
            {SITE.email}
          </a>
          <span>{SITE.address}</span>
          <span className="text-mist" dir="ltr">
            {SITE.socialHandle}
          </span>
        </address>
      </Container>
      <Container className="border-t border-mullion-dark py-6 text-small text-mist">
        {FOOTER.rights}
      </Container>
    </footer>
  )
}
