import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'
import { ReloadIcon } from '@radix-ui/react-icons'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster
      icons={{
        loading: <ReloadIcon className='h-4 w-4 animate-spin' />
      }}
    />
  </React.StrictMode>,
)
