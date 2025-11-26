import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Deshabilitar restauración automática del scroll ANTES de que React cargue
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// Forzar scroll al inicio inmediatamente
window.scrollTo(0, 0)
document.documentElement.scrollTop = 0
document.body.scrollTop = 0

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)