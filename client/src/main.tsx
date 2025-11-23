import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import "./sass/index.scss"
import App from './App.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
  </StrictMode>,
)
