import { PRODUCTS, SERVICES } from '.'

describe('catalog', () => {
  it('lists the five services and four products from the content document', () => {
    expect(SERVICES).toHaveLength(5)
    expect(PRODUCTS).toHaveLength(4)
  })

  it('gives every product a distinct glass colour', () => {
    expect(new Set(PRODUCTS.map((p) => p.glass)).size).toBe(PRODUCTS.length)
  })
})
