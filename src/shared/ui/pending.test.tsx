import { render } from '@testing-library/react'
import { RichText } from './pending'

describe('RichText', () => {
  it('turns bracketed segments into pending placeholders without brackets', () => {
    const { container } = render(
      <p>
        <RichText text="يخدم الطلاب عبر [خمس] قنوات رقمية." />
      </p>,
    )
    const pending = container.querySelectorAll('[data-pending]')
    expect(pending).toHaveLength(1)
    expect(pending[0]).toHaveTextContent('خمس')
    expect(container).toHaveTextContent('يخدم الطلاب عبر خمس قنوات رقمية.')
    expect(container.textContent).not.toMatch(/[[\]]/)
  })

  it('renders plain text untouched', () => {
    const { container } = render(<RichText text="نص نهائي" />)
    expect(container.querySelector('[data-pending]')).toBeNull()
  })
})
