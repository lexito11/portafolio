import React, { useEffect, useMemo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Projects.css'
import tiendaImg from '../assets/imgTarjetas/tienda.jpg'
import piedraPapelTijeraImg from '../assets/imgTarjetas/piedraPapelTijera.jpg'
import ingenioVivioImg from '../assets/imgTarjetas/ingenioVivio.jpg'

const Projects = () => {
  const navigate = useNavigate()
  const [showNotification, setShowNotification] = useState(false)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Ocultar notificación después de 6 segundos
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [showNotification])

  const allProjects = [
    {
      id: 1,
      title: 'Tienda de Accesorios',
      description: 'Tienda online con filtro por categoría y ordenamiento dinámico construida con React y consumo de API.',
      tags: ['React', 'CSS', 'API'],
      demoLink: 'https://lexito11.github.io/apiTienda/',
      codeLink: 'https://github.com/lexito11/apiTienda',
      image: tiendaImg
    },
    {
      id: 2,
      title: 'Piedra Papel Tijera',
      description: 'Juego interactivo construido con HTML, CSS y JavaScript que permite competir contra la computadora.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://lexito11.github.io/JuegoPiedraPapelTijera/',
      codeLink: 'https://github.com/lexito11/JuegoPiedraPapelTijera',
      image: piedraPapelTijeraImg
    },
    {
      id: 3,
      title: 'Ingenio Vivo',
      description: 'Plataforma web de IngenioVivo S:A:S con generación, transporte y distribución de energía. Incluye secciones de servicios y contacto.',
      tags: ['React', 'CSS', 'Responsive'],
      demoLink: 'https://ingenio-vivo.vercel.app/',
      codeLink: 'https://github.com/lexito11/IngenioVivo',
      image: ingenioVivioImg,
      isPrivate: true
    }
  ]

  // Mostrar todas las tarjetas en inicio (3 proyectos) para todas las pantallas
  const projects = useMemo(() => {
    return allProjects
  }, [])

  const handleMoreProjects = useCallback(() => {
    navigate('/proyectos')
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }, [navigate])

  return (
    <section id="projects" className="projects fade-in">
      {showNotification && (
        <div className="notification notification-info">
          <div className="notification-content">
            <div className="notification-icon-wrapper">
              <i className="fa-solid fa-xmark"></i>
            </div>
            <span>El código fuente de este proyecto es privado y no está disponible públicamente.</span>
          </div>
        </div>
      )}
      <div className="container">
        <h2>Mis Proyectos</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={`Captura de ${project.title}`}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="project-placeholder">
                    <i className="fa-solid fa-code"></i>
                  </div>
                )}
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  Ver Demo
                </a>
                <a 
                  href={project.codeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (project.isPrivate) {
                      e.preventDefault()
                      setShowNotification(true)
                      return false
                    }
                  }}
                >
                  Código Fuente
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="more-projects">
          <button className="more-projects-btn" onClick={handleMoreProjects}>
            Ver Más Proyectos
          </button>
        </div>
      </div>
    </section>
  )
}

export default Projects 