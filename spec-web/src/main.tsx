import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { initYandexMetrica } from './app/config/appMetrica'
import { BrowserRouter } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import reactQueryClient from './app/api/query-client'
import * as Sentry from '@sentry/react'

// Инициализация Sentry
Sentry.init({
  dsn: 'https://44bf540726922c31492d148c4840d26b@o4509124517429248.ingest.de.sentry.io/4509124520771664',
  tracesSampleRate: 1.0,
})

initYandexMetrica()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<p>Что-то пошло не так.</p>}>
      <BrowserRouter>
        <QueryClientProvider client={reactQueryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  </StrictMode>,
)