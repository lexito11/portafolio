import React, { memo, useMemo, useState, useEffect } from 'react'

const ProjectCard = memo(({ project }) => {
  const [showNotification, setShowNotification] = useState(false)

  // Memoizar tags para evitar recrear en cada render
  const tags = useMemo(() => {
    return project.tags.map((tag, index) => (
      <span key={index}>{tag}</span>
    ))
  }, [project.tags])

  // Ocultar notificación después de 6 segundos
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [showNotification])

  // Manejar clic en botón de código fuente
  const handleCodeSourceClick = (e) => {
    if (project.isPrivate) {
      e.preventDefault()
      setShowNotification(true)
      return false
    }
  }

  return (
    <>
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
      <div className="project-card">
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
            {tags}
          </div>
          <div className="project-links">
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
              Ver Demo
            </a>
            <a 
              href={project.codeLink} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleCodeSourceClick}
            >
              Código Fuente
            </a>
          </div>
        </div>
      </div>
    </>
  )
})

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard

