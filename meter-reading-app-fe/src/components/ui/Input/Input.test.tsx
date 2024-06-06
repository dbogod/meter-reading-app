import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Input from '.'

describe('Input', () => {
  const mockOnChange = jest.fn()

  it('renders with a label', () => {
    render(<Input label="Test" value="" onChange={mockOnChange} />)
    expect(screen.getByLabelText('Test')).toBeInTheDocument()
  })

  it('renders with different types', () => {
    render(
      <Input
        label="Password"
        type="password"
        value=""
        onChange={mockOnChange}
      />,
    )
    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password',
    )
  })

  it('displays error message', () => {
    render(
      <Input
        label="Name"
        value=""
        onChange={mockOnChange}
        error="This field is required"
      />,
    )
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })
})
