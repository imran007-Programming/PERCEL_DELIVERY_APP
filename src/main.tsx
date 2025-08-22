import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routes/index.tsx'
import { ThemeProvider } from './components/Providers/ThemeProvider.tsx'
import { Provider } from 'react-redux'
import { store } from './components/Redux/store.ts'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
     <ThemeProvider defaultTheme="system">
       <Toaster theme="system" richColors />
    <RouterProvider router={router}/>
      
   
    </ThemeProvider>
    </Provider>
  </StrictMode>,
)
