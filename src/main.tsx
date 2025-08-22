import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routes/index.tsx'
import { ThemeProvider } from './components/Providers/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider defaultTheme="system">
    <RouterProvider router={router}/>
      
   
    </ThemeProvider>
  </StrictMode>,
)
