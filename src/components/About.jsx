import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'
// About.css is now imported in App.jsx to ensure correct loading order

const About = () => {
  const isMobile = useIsMobile()
  
  const allSkills = [
    { icon: 'fa-brands fa-html5', name: 'HTML5' },
    { icon: 'fa-brands fa-css3-alt', name: 'CSS3' },
    { icon: 'fa-brands fa-js-square', name: 'JavaScript' },
    { icon: 'fa-brands fa-react', name: 'React' },
    { icon: 'fa-brands fa-node-js', name: 'Node.js' },
    { icon: 'fa-brands fa-bootstrap', name: 'Bootstrap' },
    { icon: 'fa-solid fa-wind', name: 'Tailwind' },
    { icon: 'fa-brands fa-github', name: 'GitHub' },
    { icon: 'fa-brands fa-git-alt', name: 'Git' },
    { icon: 'fa-solid fa-database', name: 'SQL' },
    { icon: 'fa-brands fa-figma', name: 'Figma' },
    { icon: 'fa-solid fa-code', name: 'VS Code' },
    { icon: 'fa-solid fa-users', name: 'Scrum' },
    { icon: 'fa-brands fa-trello', name: 'Trello' },
    { icon: 'fa-solid fa-robot', name: 'ChatGPT' },
    { icon: 'fa-solid fa-palette', name: 'Mockplus' },
    { icon: 'fa-solid fa-project-diagram', name: 'Draw.io' },
    { icon: 'fa-solid fa-fire', name: 'Firebase' },
    { icon: 'fa-solid fa-arrows-to-right', name: 'Miro' }
  ]

  // Reducir cantidad de habilidades en móviles: 2 en lugar de 5 (reducción agresiva)
  const displayedSkills = useMemo(() => {
    const limit = isMobile ? 2 : 5
    return allSkills.slice(0, limit)
  }, [isMobile])

  return (
    <section id="about" className="about fade-in">
      <div className="container">
        <h2>Tecnologías que manejo</h2>
        <div className="skills-grid">
          {displayedSkills.map((skill, index) => (
            <div key={index} className="skill-item">
              <i className={skill.icon}></i>
              <span>{skill.name}</span>
            </div>
          ))}
            </div>
        <div className="more-techs">
          <Link to="/sobre-mi" className="more-techs-btn">
            Ver Más Tecnologías
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About