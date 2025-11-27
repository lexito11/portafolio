import React, { memo } from 'react'
import './Footer.css'

const Footer = memo(() => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 M.Dev. Diseñado y construido por ti.</p>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'

export default Footer 