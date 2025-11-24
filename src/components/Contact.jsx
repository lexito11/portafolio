import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Contact.css'

const Contact = () => {
  const navigate = useNavigate()

  const socialLinks = [
    { icon: 'fa-brands fa-facebook', label: 'Facebook', url: 'https://www.facebook.com/share/16Cs6H6v4m/' },
    { icon: 'fa-brands fa-instagram', label: 'Instagram', url: 'https://www.instagram.com/alex.perea11?igsh=bmk4Z2NjNGU5N21h' },
    { icon: 'fa-brands fa-tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@alex_perea11?_r=1&_t=ZS-91eUxRLtBnG' }
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
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Redes</h3>
        <div className="social-links">
          {socialLinks.map((social, index) => (
            <a 
              key={index}
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`social-link social-link-${social.label.toLowerCase()}`}
            >
              <i className={social.icon}></i>
              <span>{social.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact 