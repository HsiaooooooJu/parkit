import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home component', () => {
  test('if renders the landing page', () => {
    render(<Home />)
    expect(screen.getByRole('img')).toBeInTheDocument
  })
})
