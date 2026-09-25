import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

describe('Button', () => {
  it('renders with default type="button" and handles clicks', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click me</Button>)

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toHaveAttribute('type', 'button')

    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('applies variant classes', () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border')
  })
})
