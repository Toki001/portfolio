import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './fonts.css'
import './index.css'
import './styles-tokens.css'
import './foundation.css'
import './hero.css'
import './work.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = <StrictMode><App /></StrictMode>
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
