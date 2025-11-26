import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SobreMi from './components/Pages/SobreMi/SobreMi'
import Proyectos from './components/Pages/Proyectos/Proyectos'
import Contacto from './components/Pages/Contacto/Contacto'
import './App.css'
// Import About.css after App.css to ensure correct styles override
import './components/About.css'

function AppContent() {
  const [activeSection, setActiveSection] = useState('hero')
  const [showArrow, setShowArrow] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Reset activeSection when route changes
    if (location.pathname === '/') {
      setActiveSection('hero')
    } else if (location.pathname === '/sobre-mi') {
      setActiveSection('sobre-mi')
    } else if (location.pathname === '/proyectos') {
      setActiveSection('proyectos')
    } else if (location.pathname === '/contacto') {
      setActiveSection('contacto')
    }
  }, [location.pathname])

  useEffect(() => {
    // Only handle scroll for home page
    if (location.pathname !== '/') return

    let ticking = false // Throttle flag

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['hero', 'about', 'projects', 'contact']
          const scrollPosition = window.scrollY + 100

          // Hide arrow permanently when user scrolls down
          if (scrollPosition > 100) {
            setShowArrow(false)
          }

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i])
            if (section && scrollPosition >= section.offsetTop) {
              setActiveSection(sections[i])
              break
            }
          }
          
          ticking = false
        })
        
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  return (
      <div className="App">
        <Header activeSection={activeSection} />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero showArrow={showArrow} />
                <About />
                <Projects />
                <Contact />
              </>
            } />
            <Route path="/sobre-mi" element={<SobreMi />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
      </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App 