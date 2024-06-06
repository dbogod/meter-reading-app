import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Home from '.'
import { BrowserRouter } from 'react-router-dom'

const mockStore = configureStore([])
const initialStateWithUser = {
  user: {
    user: {
      firstName: 'Test',
    },
  },
}

const initialStateWithoutUser = {
  user: {
    user: null,
  },
}

describe('Home with authenticated user', () => {
  let container: HTMLElement
  beforeEach(() => {
    const store = mockStore(initialStateWithUser)
    const renderResult = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    )
    container = renderResult.container
  })

  it('renders', () => {
    expect(container).toBeInTheDocument()
  })

  it('has a welcome message', () => {
    expect(screen.getByText('Hi, Test!')).toBeInTheDocument()
  })

  it('renders the buttons for an authenticated user', () => {
    expect(screen.getByText('View Meter Readings')).toBeInTheDocument()
    expect(screen.getByText('Add New Meter Reading')).toBeInTheDocument()
  })
})

describe('Home with no authenticated user', () => {
  let container: HTMLElement
  beforeEach(() => {
    const store = mockStore(initialStateWithoutUser)
    const renderResult = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    )
    container = renderResult.container
  })

  it('renders', () => {
    expect(container).toBeInTheDocument()
  })

  it('has a welcome message for guests', () => {
    expect(screen.getByText('Welcome!')).toBeInTheDocument()
  })

  it('renders the log in button', () => {
    expect(screen.getByTestId('login-button')).toBeInTheDocument()
  })
})
