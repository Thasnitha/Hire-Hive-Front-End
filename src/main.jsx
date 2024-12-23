import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min (2).css'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './context/ContextShare.jsx'
import TokenAuth from './context/TokenAuth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <TokenAuth>
     <ContextShare>
        <BrowserRouter>
        <App />
    
        </BrowserRouter>
     </ContextShare>
   </TokenAuth>
  </StrictMode>,
)
