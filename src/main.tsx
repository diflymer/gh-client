import { createRoot } from 'react-dom/client'
import './styles/styles.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './config/configureMobX'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </StrictMode>
)
