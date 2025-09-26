import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Nav from './components/navbar/nav'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav />
  </StrictMode>
  
)
