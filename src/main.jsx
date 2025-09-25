import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Nav from './navbar/nav'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav />

  </StrictMode>,
)
