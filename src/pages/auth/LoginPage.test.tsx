import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../store'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './LoginPage'

it('renders login form', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>
  )
  expect(screen.getByText(/Login/i)).toBeInTheDocument()
})
