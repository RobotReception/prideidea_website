import { cn } from './cn'

describe('cn', () => {
  it('keeps custom type-scale sizes alongside text colours', () => {
    expect(cn('text-h2', 'text-ink')).toBe('text-h2 text-ink')
    expect(cn('text-display text-night', 'text-ink')).toBe('text-display text-ink')
  })
})
