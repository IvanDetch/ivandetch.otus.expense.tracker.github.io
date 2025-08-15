import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import App from './App'
import { I18nProvider } from './app/providers/i18n/I18nProvider'
import './styles/global.scss'
import './styles/theme.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <I18nProvider><App /></I18nProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
