import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./sass/index.scss"
import App from './App.tsx'
import { AuthContextProvider } from './contexts/AuthContext.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
     <App/>
    </AuthContextProvider>
  </StrictMode>,
)
