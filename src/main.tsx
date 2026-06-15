import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import { I18nProvider } from './shared/i18n/I18nProvider'
import { Provider } from 'react-redux'
import './index.css'
import { store } from './lib/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </Provider>
  </StrictMode>,
)
