import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Proyectos.css'
import { useIsMobile } from '../../../hooks/useIsMobile'
import ProjectCard from './ProjectCard'
import tiendaImg from '../../../assets/imgTarjetas/tienda.jpg'
import piedraPapelTijeraImg from '../../../assets/imgTarjetas/piedraPapelTijera.jpg'
import ingenioVivioImg from '../../../assets/imgTarjetas/ingenioVivio.jpg'
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
      title: 'Tienda de Accesorios',
      description: 'Tienda online con filtro por categoría y ordenamiento dinámico construida con React y consumo de API.',
      tags: ['React', 'CSS', 'API'],
      demoLink: 'https://lexito11.github.io/apiTienda/',
      codeLink: 'https://github.com/lexito11/apiTienda',
      image: tiendaImg,
      category: 'react'
    },
    {
      id: 2,
      title: 'Piedra Papel Tijera',
      description: 'Juego interactivo construido con HTML, CSS y JavaScript que permite competir contra la computadora.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://lexito11.github.io/JuegoPiedraPapelTijera/',
      codeLink: 'https://github.com/lexito11/JuegoPiedraPapelTijera',
      image: piedraPapelTijeraImg,
      category: 'javascript'
    },
    {
      id: 3,
      title: 'Ingenio Vivo',
      description: 'Plataforma web de IngenioVivo S:A:S con generación, transporte y distribución de energía. Incluye secciones de servicios y contacto.',
      tags: ['React', 'CSS', 'Responsive'],
      demoLink: 'https://ingenio-vivo.vercel.app/',
      codeLink: 'https://github.com/lexito11/IngenioVivo',
      image: ingenioVivioImg,
      category: 'react'
    },
    {
      id: 4,
      title: 'Mercado Manager',
      description: 'Panel administrativo para crear y gestionar tiendas con secciones de asistencia y pruebas de seguridad.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://lexito11.github.io/mercado/',
      codeLink: 'https://github.com/lexito11/Mercado',
      image: listaMercadoImg,
      category: 'javascript'
    },
    {
      id: 5,
      title: 'Software Solutions',
      description: 'Landing page corporativa para una empresa de desarrollo de software con secciones de servicios, portafolio y contacto.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://lexito11.github.io/paginaWed-1/',
      codeLink: 'https://github.com/lexito11/paginaWed-1',
      image: softwareImg,
      category: 'javascript'
    },
    {
      id: 6,
      title: 'Email Marketing',
      description: 'Plataforma orientada a captar clientes mediante formularios de contacto y bloques informativos sobre campañas de correo.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://lexito11.github.io/email/',
      codeLink: 'https://github.com/lexito11/email',
      image: emailImg,
      category: 'javascript'
    },
    {
      id: 7,
      title: 'Banda Musical',
      description: 'Sitio promocional para una banda musical con secciones de integrantes, próximos eventos y formulario de contacto para contrataciones.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://lexito11.github.io/recu/',
      codeLink: 'https://github.com/lexito11/recu',
      image: bandaMusicalImg,
      category: 'javascript'
    },
    {
      id: 8,
      title: 'Enfermera Rueda',
      description: 'Plataforma de servicios de enfermería y terapias integrales con atención a domicilio, sueroterapia y registros fotográficos para pacientes.',
      tags: ['Salud', 'WordPress', 'Marketing'],
      demoLink: 'https://enfermerarueda.com',
      codeLink: 'https://enfermerarueda.com',
      image: enfermeriaImg,
      category: 'fullstack'
    },
    {
      id: 9,
      title: 'Sena Unity',
      description: 'Aplicativo web que centraliza la información del centro de formación para facilitar su consulta a los usuarios.',
      tags: ['React', 'Tailwind CSS', 'Responsive', 'Node.js'],
      demoLink: 'https://front-talwind.vercel.app/',
      codeLink: 'https://front-talwind.vercel.app/',
      image: senaUnityImg,
      categories: ['react', 'nodejs']
    },
    {
      id: 10,
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
  const isMobile = useIsMobile()
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
  // Reducir cantidad inicial en móviles: 2 en lugar de 6 (reducción agresiva para 40% menos nodos)
  const displayedProjects = useMemo(() => {
    const initialLimit = isMobile ? 2 : 6
    if (showAllProjects || filteredProjects.length <= initialLimit) {
      return filteredProjects
    }
    return filteredProjects.slice(0, initialLimit)
  }, [showAllProjects, filteredProjects, isMobile])
  
  // Reducir filtros mostrados en móviles (de 5 a 3)
  const displayedFilters = useMemo(() => {
    if (isMobile) {
      return filters.filter(filter => ['todos', 'react', 'javascript'].includes(filter.id))
    }
    return filters
  }, [isMobile])
  
  // Reducir estadísticas en móviles (de 4 a 2)
  const displayedStats = useMemo(() => {
    if (isMobile) {
      return [
        { number: `${projects.length}+`, label: 'Proyectos Completados' },
        { number: '14 y otras', label: 'Tecnologías Dominadas' }
      ]
    }
    return [
      { number: `${projects.length}+`, label: 'Proyectos Completados' },
      { number: '14 y otras', label: 'Tecnologías Dominadas' },
      { number: '1+', label: 'Años de Experiencia' },
      { number: '99.9%', label: 'Satisfacción del Cliente' }
    ]
  }, [isMobile])

  // Scroll to top when component mounts or page reloads - OPTIMIZADO
  useEffect(() => {
    // Deshabilitar restauración automática del scroll del navegador
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    
    // Función optimizada de scroll al inicio
    const scrollToTop = () => {
      // Usar el método más eficiente primero
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      // Fallback para navegadores que no soportan behavior: 'instant'
      if (document.documentElement) {
        document.documentElement.scrollTop = 0
      }
      if (document.body) {
        document.body.scrollTop = 0
      }
    }
    
    // Scroll inmediato al montar
    scrollToTop()
    
    // Ejecutar después de que el DOM esté listo (solo una vez)
    const timeoutId = setTimeout(() => {
      scrollToTop()
    }, 0)
    
    // También hacer scroll cuando la página se carga completamente
    const handleLoad = () => {
      scrollToTop()
    }
    
    // Ejecutar inmediatamente si ya está cargado
    if (document.readyState === 'complete') {
      scrollToTop()
    } else {
      window.addEventListener('load', handleLoad, { once: true })
    }
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  const handleFilterChange = useCallback((filterId) => {
    setActiveFilter(filterId)
    setShowAllProjects(false) // Reset to show only 6 when changing filter
  }, [])

  const toggleShowAll = useCallback(() => {
    setShowAllProjects(prev => !prev)
  }, [])

  const handleContactClick = useCallback(() => {
    navigate('/contacto')
    // Scroll to top after navigation - optimizado: usar requestAnimationFrame
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }, [navigate])

  return (
    <section id="proyectos" className="proyectos fade-in">
      <div className="container">
        <div className="proyectos-header">
          <h1>Mis Proyectos</h1>
          <p>Una colección de proyectos que demuestran mis habilidades y experiencia en desarrollo web</p>
        </div>

        {/* Filtros de categorías */}
        <div className="project-filters">
          {displayedFilters.map((filter) => (
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
            <ProjectCard key={project.id} project={project} />
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
            {displayedStats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Llamada a la Acción - Ocultar en móviles para reducir nodos */}
        {!isMobile && (
          <div className="cta-section">
            <div className="cta-content">
              <h2>¿Tienes una idea en mente?</h2>
              <p>Estoy siempre abierto a nuevos desafíos y proyectos interesantes.</p>
              <button className="cta-btn" onClick={handleContactClick}>Hablemos de tu proyecto</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Proyectos 