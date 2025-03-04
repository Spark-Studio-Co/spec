import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import { initYandexMetrica } from './app/config/appMetrica'

// Initialize Yandex Metrica
initYandexMetrica()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
