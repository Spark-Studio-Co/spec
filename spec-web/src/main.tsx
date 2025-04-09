import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { initYandexMetrica } from './app/config/appMetrica'
import { BrowserRouter } from 'react-router'
import { QueryClientProvider } from "@tanstack/react-query";
import reactQueryClient from './app/api/query-client'

initYandexMetrica()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={reactQueryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode >,
)
