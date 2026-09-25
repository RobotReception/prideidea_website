import { HOME } from '@/shared/content'
import { Seo } from '@/shared/ui'
import { AboutBrief } from './sections/about-brief'
import { ClosingCta } from './sections/closing-cta'
import { Hero } from './sections/hero'
import { IndustriesAndWhy } from './sections/industries-why'
import { Process } from './sections/process'
import { ProductsPanes } from './sections/products-panes'
import { ServicesIndex } from './sections/services-index'
import { SuccessStory } from './sections/success-story'
import { Trust } from './sections/trust'

export default function HomePage() {
  return (
    <>
      <Seo title={HOME.seo.title} description={HOME.seo.description} />
      <Hero />
      <Trust />
      <AboutBrief />
      <ServicesIndex />
      <ProductsPanes />
      <Process />
      <IndustriesAndWhy />
      <SuccessStory />
      <ClosingCta />
    </>
  )
}
