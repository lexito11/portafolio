import React, { useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'
// Import About.css after App.css to ensure correct styles override
import './components/About.css'

// Lazy load de páginas para code splitting
const SobreMi = lazy(() => import('./components/Pages/SobreMi/SobreMi'))
const Proyectos = lazy(() => import('./components/Pages/Proyectos/Proyectos'))
const Contacto = lazy(() => import('./components/Pages/Contacto/Contacto'))

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

  // Componente de carga para Suspense
  const LoadingFallback = () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '50vh',
      color: 'var(--primary-color)'
    }}>
      <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem' }}></i>
    </div>
  )

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
            <Route path="/sobre-mi" element={
              <Suspense fallback={<LoadingFallback />}>
                <SobreMi />
              </Suspense>
            } />
            <Route path="/proyectos" element={
              <Suspense fallback={<LoadingFallback />}>
                <Proyectos />
              </Suspense>
            } />
            <Route path="/contacto" element={
              <Suspense fallback={<LoadingFallback />}>
                <Contacto />
              </Suspense>
            } />
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