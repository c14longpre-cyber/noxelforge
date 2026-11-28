import './translationGuard'; // avant React : voir le fichier
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import './noxel-shell.css'
import App from './App.tsx'
import { ConsentedAnalytics } from './components/consent/ConsentedAnalytics'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ConsentedAnalytics />
  </StrictMode>,
)
