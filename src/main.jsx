import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from '@/navigation/navigation'
import fundo from '@/assets/fundo.png'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `
          linear-gradient(
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0.25)
          ),
          url(${fundo})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <AppRouter />
    </div>
  </StrictMode>,
)