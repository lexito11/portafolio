import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './Proyectos.css'
import tiendaImg from '../../../assets/imgTarjetas/tieda.jpg'
import piedraPapelTijeraImg from '../../../assets/imgTarjetas/piedraPapelTijera.jpg'
import listaMercadoImg from '../../../assets/imgTarjetas/listaMercado.jpg'
import softwareImg from '../../../assets/imgTarjetas/desarrolloDeSoftware.jpg'
import emailImg from '../../../assets/imgTarjetas/email.jpg'
import bandaMusicalImg from '../../../assets/imgTarjetas/bandaMusical.jpg'
import enfermeriaImg from '../../../assets/imgTarjetas/enfermera.jpg'
import senaUnityImg from '../../../assets/imgTarjetas/senaUnity.jpg'
import gestorTareasImg from '../../../assets/imgTarjetas/gestorTareas.jpg'

// Mover el array de proyectos fuera del componente para evitar recreación en cada render
const projects = [
    {
      id: 1,
      title: 'ExotiQ Market',
      description: 'Tienda online con filtro por categoría y ordenamiento dinámico construida con React y consumo de API.',
      tags: ['React', 'CSS', 'API'],
      demoLink: 'https://lexito11.github.io/apiTienda/',
      codeLink: 'https://github.com/lexito11/apiTienda',
      image: tiendaImg,
      category: 'react'
    },
    {
      id: 2,
      title: 'Juego Piedra Papel Tijera',
      description: 'Juego interactivo construido con HTML, CSS y JavaScript que permite competir contra la computadora.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://lexito11.github.io/JuegoPiedraPapelTijera/',
      codeLink: 'https://github.com/lexito11/JuegoPiedraPapelTijera',
      image: piedraPapelTijeraImg,
      category: 'javascript'
    },
    {
      id: 3,
      title: 'Mercado Manager',
      description: 'Panel administrativo para crear y gestionar tiendas con secciones de asistencia y pruebas de seguridad.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://lexito11.github.io/mercado/',
      codeLink: 'https://github.com/lexito11/Mercado',
      image: listaMercadoImg,
      category: 'javascript'
    },
    {
      id: 4,
      title: 'Software Solutions',
      description: 'Landing page corporativa para una empresa de desarrollo de software con secciones de servicios, portafolio y contacto.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://lexito11.github.io/paginaWed-1/',
      codeLink: 'https://github.com/lexito11/paginaWed-1',
      image: softwareImg,
      category: 'javascript'
    },
    {
      id: 5,
      title: 'Email Marketing',
      description: 'Plataforma orientada a captar clientes mediante formularios de contacto y bloques informativos sobre campañas de correo.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://lexito11.github.io/email/',
      codeLink: 'https://github.com/lexito11/email',
      image: emailImg,
      category: 'javascript'
    },
    {
      id: 6,
      title: 'Banda Musical',
      description: 'Sitio promocional para una banda musical con secciones de integrantes, próximos eventos y formulario de contacto para contrataciones.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://lexito11.github.io/recu/',
      codeLink: 'https://github.com/lexito11/recu',
      image: bandaMusicalImg,
      category: 'javascript'
    },
    {
      id: 7,
      title: 'Enfermera Rueda',
      description: 'Plataforma de servicios de enfermería y terapias integrales con atención a domicilio, sueroterapia y registros fotográficos para pacientes.',
      tags: ['Salud', 'WordPress', 'Marketing'],
      demoLink: 'https://enfermerarueda.com',
      codeLink: 'https://enfermerarueda.com',
      image: enfermeriaImg,
      category: 'fullstack'
    },
    {
      id: 8,
      title: 'Sena Unity',
      description: 'Aplicativo web que centraliza la información del centro de formación para facilitar su consulta a los usuarios.',
      tags: ['React', 'Tailwind CSS', 'Responsive', 'Node.js'],
      demoLink: 'https://front-talwind.vercel.app/',
      codeLink: 'https://front-talwind.vercel.app/',
      image: senaUnityImg,
      categories: ['react', 'nodejs']
    },
    {
      id: 9,
      title: 'Gestor de Tareas',
      description: 'Aplicación web para gestionar tareas con funcionalidades de crear, completar y filtrar tareas pendientes y completadas.',
      tags: ['React', 'JavaScript', 'CSS'],
      demoLink: 'https://bonita-black.vercel.app/',
      codeLink: 'https://bonita-black.vercel.app/',
      image: gestorTareasImg,
      category: 'react'
    }
  ]

// Mover filters fuera del componente para evitar recreación
const filters = [
  { id: 'todos', label: 'Todos' },
  { id: 'react', label: 'React' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'nodejs', label: 'Node.js' },
  { id: 'fullstack', label: 'Full Stack' }
]

const Proyectos = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('todos')
  const [showAllProjects, setShowAllProjects] = useState(false)

  // OPTIMIZACIÓN: Usar useMemo para evitar recalcular en cada render
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'todos') {
      return projects
    }
    return projects.filter(project => {
      // Soporte para múltiples categorías (array) o categoría única (string)
      if (project.categories && Array.isArray(project.categories)) {
        return project.categories.includes(activeFilter)
      }
      // Compatibilidad hacia atrás con projects que usan category (string)
      return project.category === activeFilter
    })
  }, [activeFilter])

  // OPTIMIZACIÓN: Usar useMemo para evitar recalcular en cada render
  const displayedProjects = useMemo(() => {
    if (showAllProjects || filteredProjects.length <= 6) {
      return filteredProjects
    }
    return filteredProjects.slice(0, 6)
  }, [showAllProjects, filteredProjects])

  // Scroll to top when component mounts or page reloads - OPTIMIZADO: sin smooth para mejor rendimiento
  useEffect(() => {
    // Deshabilitar restauración automática del scroll del navegador PRIMERO
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    
    // Scroll inmediato al inicio (arriba) - forzar múltiples métodos para asegurar que funcione
    const scrollToTop = () => {
      // Forzar scroll a 0 (arriba) de todas las formas posibles
      window.scrollTo(0, 0)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      if (document.documentElement) {
        document.documentElement.scrollTop = 0
      }
      if (document.body) {
        document.body.scrollTop = 0
      }
    }
    
    // Scroll inmediato al montar (ejecutar múltiples veces para asegurar)
    scrollToTop()
    
    // También ejecutar después de que el DOM esté listo
    setTimeout(() => {
      scrollToTop()
    }, 0)
    
    setTimeout(() => {
      scrollToTop()
    }, 10)
    
    // También hacer scroll cuando la página se carga completamente
    const handleLoad = () => {
      scrollToTop()
    }
    
    // Ejecutar inmediatamente si ya está cargado
    if (document.readyState === 'complete') {
      scrollToTop()
    } else {
      window.addEventListener('load', handleLoad)
      return () => {
        window.removeEventListener('load', handleLoad)
      }
    }
  }, [])

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
    setShowAllProjects(false) // Reset to show only 6 when changing filter
  }

  const toggleShowAll = () => {
    setShowAllProjects(!showAllProjects)
  }

  const handleContactClick = () => {
    navigate('/contacto')
    // Scroll to top after navigation - optimizado: usar requestAnimationFrame
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  return (
    <section id="proyectos" className="proyectos fade-in">
      <div className="container">
        <div className="proyectos-header">
          <h1>Mis Proyectos</h1>
          <p>Una colección de proyectos que demuestran mis habilidades y experiencia en desarrollo web</p>
        </div>

        {/* Filtros de categorías */}
        <div className="project-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {displayedProjects.map((project) => (
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
              <div className="project-content">
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
                  <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                    Código Fuente
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botón para mostrar todos los proyectos */}
        <div className="show-all-projects">
          <button className="show-all-btn" onClick={toggleShowAll}>
            {showAllProjects ? 'Ver Menos' : 'Todos los proyectos'}
          </button>
        </div>

        {/* Sección de Estadísticas */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{projects.length}+</div>
              <div className="stat-label">Proyectos Completados</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">14 y otras</div>
              <div className="stat-label">Tecnologías Dominadas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1+</div>
              <div className="stat-label">Años de Experiencia</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Satisfacción del Cliente</div>
            </div>
          </div>
        </div>

        {/* Sección de Llamada a la Acción */}
        <div className="cta-section">
          <div className="cta-content">
            <h2>¿Tienes una idea en mente?</h2>
            <p>Estoy siempre abierto a nuevos desafíos y proyectos interesantes.</p>
            <button className="cta-btn" onClick={handleContactClick}>Hablemos de tu proyecto</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Proyectos 