import React, { useState, useEffect } from 'react'
import './SobreMi.css'
import profileImage from '../../../assets/images/logo.jpg'

const SobreMi = () => {
  const [showFullHistory, setShowFullHistory] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const skillsCategories = {
    interfaz: {
      title: 'Front-end',
      skills: [
        { icon: 'fa-brands fa-react', name: 'React' },
        { icon: 'fa-brands fa-js-square', name: 'JavaScript' },
    { icon: 'fa-brands fa-html5', name: 'HTML5' },
    { icon: 'fa-brands fa-css3-alt', name: 'CSS3' },
        { icon: 'fa-solid fa-wind', name: 'Tailwind' },
        { icon: 'fa-brands fa-bootstrap', name: 'Bootstrap' }
      ]
    },
    backend: {
      title: 'Backend',
      skills: [
    { icon: 'fa-brands fa-node-js', name: 'Node.js' },
        { icon: 'fa-solid fa-code', name: 'Express.js' },
        { icon: 'fa-solid fa-database', name: 'API REST' },
        { icon: 'fa-solid fa-fire', name: 'Firebase' }
      ]
    },
    basesDatos: {
      title: 'Bases de datos',
      skills: [
        { icon: 'fa-solid fa-database', name: 'SQL' },
        { icon: 'fa-solid fa-fire', name: 'Firebase' },
        { icon: 'fa-solid fa-database', name: 'MongoDB' }
      ]
    },
    herramientas: {
      title: 'Herramientas',
      skills: [
    { icon: 'fa-brands fa-github', name: 'GitHub' },
    { icon: 'fa-brands fa-git-alt', name: 'Git' },
    { icon: 'fa-brands fa-figma', name: 'Figma' },
    { icon: 'fa-solid fa-code', name: 'VS Code' },
    { icon: 'fa-solid fa-users', name: 'Scrum' },
        { icon: 'fa-brands fa-trello', name: 'Trello' }
      ]
    }
  }

  const toggleHistory = () => {
    setShowFullHistory(!showFullHistory)
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription)
  }

  return (
    <section id="sobre-mi" className="sobre-mi fade-in">
      <div className="container">
        <h2 className="sobre-mi-title">Sobre Mí</h2>
        <div className="sobre-mi-content">
          {/* Sección de Perfil */}
          <div className="profile-section">
            <div className="profile-image">
              <div className="profile-placeholder">
                <img 
                  src={profileImage} 
                  alt="Alexander Perea" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                />
              </div>
            </div>
            <div className="profile-info">
              <h3>Alexander Perea</h3>
              <p className="role">Desarrollador Full Stack</p>
              <p className="description">
                {showFullDescription ? (
                  <>
                    Soy un desarrollador apasionado con experiencia en tecnologías modernas de desarrollo web. 
                    Me enfoco en crear aplicaciones eficientes, escalables y con excelente experiencia de usuario.
                    Mi pasión por la programación me ha llevado a especializarme en el desarrollo full-stack, 
                    combinando creatividad y lógica para resolver problemas complejos. Siempre busco aprender 
                    nuevas tecnologías y mantenerme actualizado con las últimas tendencias del desarrollo web.
                    <button className="description-button" onClick={toggleDescription}>
                      ver menos
                    </button>
                  </>
                ) : (
                  <>
                    Soy un desarrollador apasionado con experiencia en tecnologías modernas de desarrollo web. 
                    Me enfoco en crear aplicaciones eficientes, escalables y con excelente experiencia de usuario.
                    <button className="description-button" onClick={toggleDescription}>
                      ver más
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
          
          {/* Sección Mi Historia */}
          <div className="history-section">
            <h3 className="section-title">
              Mi Historia
            </h3>
            <p className="history-text">
              Comencé mi viaje en el desarrollo web hace varios años, motivado por la curiosidad de entender 
              cómo funcionan las aplicaciones que usamos diariamente. Desde entonces, he trabajado en proyectos 
              diversos, desde aplicaciones web simples hasta sistemas complejos de comercio electrónico.
              <button className="history-button" onClick={toggleHistory}>
                {showFullHistory ? 'ver menos' : 'historia completa'}
              </button>
            </p>
            {showFullHistory && (
              <div className="history-additional">
                <p>
                  Mi pasión por la tecnología comenzó desde muy joven, cuando me fascinaba desarmar y entender 
                  cómo funcionaban los dispositivos electrónicos. Esta curiosidad natural me llevó a estudiar 
                  ingeniería de sistemas, donde descubrí mi verdadera vocación: el desarrollo de software.
                </p>
                <p>
                  Durante mi formación académica, me especialicé en tecnologías web modernas, participando 
                  en proyectos de investigación y colaborando con equipos multidisciplinarios. Esta experiencia 
                  me enseñó la importancia del trabajo en equipo y la comunicación efectiva en el desarrollo 
                  de software.
                </p>
                <p>
                  Hoy en día, me considero un desarrollador full-stack con una visión integral del desarrollo 
                  web. Mi objetivo es seguir creciendo profesionalmente, contribuyendo a proyectos innovadores 
                  que generen un impacto positivo en la sociedad a través de la tecnología.
                </p>
              </div>
            )}
          </div>
          
          {/* Sección de Habilidades por Categorías */}
          <div className="skills-section">
            <h3>Mis Habilidades</h3>
            <div className="skills-categories">
              {Object.entries(skillsCategories).map(([key, category]) => (
                <div key={key} className="skill-category">
                  <h4 className="category-title">{category.title}</h4>
                  <div className="category-skills">
                    {category.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <i className={skill.icon}></i>
                  <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sección Lo que me motiva */}
          <div className="motivation-section">
            <h3>Lo que me motiva</h3>
            <div className="motivation-grid">
              <div className="motivation-item">
                <div className="motivation-icon">
                  <i className="fa-solid fa-lightbulb"></i>
                </div>
                <div className="motivation-content">
                  <h4>Innovación</h4>
                  <p>Crear soluciones creativas y tecnológicas que impacten positivamente en la vida de las personas</p>
                </div>
              </div>
              <div className="motivation-item">
                <div className="motivation-icon">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className="motivation-content">
                  <h4>Aprendizaje Continuo</h4>
                  <p>Mantenerme actualizado con las últimas tecnologías y tendencias del desarrollo web</p>
                </div>
              </div>
              <div className="motivation-item">
                <div className="motivation-icon">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div className="motivation-content">
                  <h4>Colaboración</h4>
                  <p>Trabajar en equipo para crear productos digitales excepcionales y experiencias memorables</p>
                </div>
              </div>
              <div className="motivation-item">
                <div className="motivation-icon">
                  <i className="fa-solid fa-rocket"></i>
                </div>
                <div className="motivation-content">
                  <h4>Desafíos</h4>
                  <p>Resolver problemas complejos y superar obstáculos técnicos para lograr objetivos ambiciosos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección Experiencia */}
          <div className="experience-section">
            <h3>Experiencia</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-date">2023 - Presente</div>
                <div className="timeline-content">
                  <h4>Desarrollador Full Stack</h4>
                  <p>Desarrollo de aplicaciones web modernas con React, Node.js y bases de datos NoSQL.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date">2022 - 2023</div>
                <div className="timeline-content">
                  <h4>Desarrollador Frontend</h4>
                  <p>Especialización en React y desarrollo de interfaces de usuario responsivas.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date">2021 - 2022</div>
                <div className="timeline-content">
                  <h4>Estudiante/Autodidacta</h4>
                  <p>Aprendizaje intensivo de tecnologías web modernas y fundamentos de programación.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección Redes Sociales */}
          <div className="social-section">
            <h3>Redes Personales</h3>
            <div className="social-links">
              <a 
                href="https://www.facebook.com/share/16Cs6H6v4m/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-link social-link-facebook"
              >
                <i className="fa-brands fa-facebook"></i>
                <span>Facebook</span>
              </a>
              <a 
                href="https://www.instagram.com/alex.perea11?igsh=bmk4Z2NjNGU5N21h" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-link social-link-instagram"
              >
                <i className="fa-brands fa-instagram"></i>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SobreMi
