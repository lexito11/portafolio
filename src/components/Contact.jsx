import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Contact.css'

const Contact = () => {
  const navigate = useNavigate()

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
      </div>
    </section>
  )
}

export default Contact 