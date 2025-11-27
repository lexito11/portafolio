import React, { memo, useMemo } from 'react'

const ProjectCard = memo(({ project }) => {
  // Memoizar tags para evitar recrear en cada render
  const tags = useMemo(() => {
    return project.tags.map((tag, index) => (
      <span key={index}>{tag}</span>
    ))
  }, [project.tags])

  return (
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
          <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
            Código Fuente
          </a>
        </div>
      </div>
    </div>
  )
})

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard

