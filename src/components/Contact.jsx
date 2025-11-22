import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Contact.css'

const Contact = () => {
  const navigate = useNavigate()

  const socialLinks = [
    { icon: 'fa-brands fa-linkedin', label: 'LinkedIn', url: '#' },
    { icon: 'fa-brands fa-github', label: 'GitHub', url: '#' },
    { icon: 'fa-brands fa-twitter', label: 'Twitter', url: '#' }
  ]

  const handleEmailClick = () => {
    navigate('/contacto')
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  return (
    <section id="contact" className="contact fade-in">
      <div className="container">
        <h2>Contacto</h2>
        <p>
          ¡Hablemos! Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades 
          para ser parte de tus visiones.
        </p>
        <button onClick={handleEmailClick} className="cta-button">
          Envíame un correo
        </button>
        <div className="social-links">
          {socialLinks.map((social, index) => (
            <a 
              key={index}
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={social.label}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact 