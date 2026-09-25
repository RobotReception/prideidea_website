import { Link } from 'react-router'
import { HOME, PRODUCTS } from '@/shared/content'
import { GlassPane, Heading, Section, TextLink } from '@/shared/ui'

/**
 * The portfolio as one window: four equal panes sharing their mullions.
 * No product leads; each is marked only by its glass colour.
 */
export function ProductsPanes() {
  const { products } = HOME
  return (
    <Section
      tone="white"
      aria-labelledby="products-title"
      containerClassName="flex flex-col gap-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading id="products-title" as="h2" className="text-ink">
          {products.title}
        </Heading>
        <TextLink to={products.link.to}>{products.link.label}</TextLink>
      </div>

      <ul className="grid border-[1.5px] border-ink sm:grid-cols-2">
        {PRODUCTS.map((product, i) => (
          <li
            key={product.slug}
            className={[
              'border-ink',
              i > 0 ? 'border-t-[1.5px]' : '',
              i === 1 ? 'sm:border-s-[1.5px] sm:border-t-0' : '',
              i === 3 ? 'sm:border-s-[1.5px]' : '',
            ].join(' ')}
          >
            <Link
              to={product.to}
              className="group flex h-full min-h-60 flex-col gap-4 p-7 transition-colors hover:bg-gypsum sm:p-9"
            >
              <GlassPane glass={product.glass} className="h-6 w-4" />
              <h3 className="text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight font-bold text-ink">
                {product.name}
              </h3>
              <p className="max-w-[34ch] text-slate">{product.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
