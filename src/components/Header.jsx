import React, { useState, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = memo(({ activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo" onClick={(e) => { 
          if (location.pathname === '/') {
            e.preventDefault()
            scrollToSection('hero')
          }
        }}>
          INNOVACIÓN DIGITAL 
        </Link>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
        </button>
        <nav className={menuOpen ? 'open' : ''}>
          <ul>
            <li>
              <Link 
                to="/"
                className={location.pathname === '/' ? 'active' : ''}
                onClick={(e) => { 
                  if (location.pathname === '/') {
                    e.preventDefault()
                    scrollToSection('hero')
                  }
                  setMenuOpen(false)
                }}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link 
                to="/sobre-mi"
                className={location.pathname === '/sobre-mi' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Sobre mí
              </Link>
            </li>
            <li>
              <Link 
                to="/proyectos"
                className={location.pathname === '/proyectos' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Proyectos
              </Link>
            </li>
            <li>
              <Link 
                to="/contacto"
                className={location.pathname === '/contacto' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
})

Header.displayName = 'Header'

export default Header 