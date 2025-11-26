import React, { useEffect, useState } from 'react'
import './Contacto.css'

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  })
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [isError, setIsError] = useState(false)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Ocultar notificación después de 3.5 segundos
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [showNotification])

  const socialLinks = [
    { icon: 'fa-brands fa-github', label: 'GitHub', url: 'https://github.com/lexito11' }
  ]

  const contactInfo = [
    { icon: 'fa-solid fa-envelope', label: 'Email', value: 'alexinholozano10@gmail.com' },
    { icon: 'fa-solid fa-phone', label: 'Teléfono', value: '3234381513' },
    { icon: 'fa-solid fa-map-marker-alt', label: 'Ubicación', value: 'Quindio Colombia' }
  ]

  const handleEmailClick = () => {
    window.location.href = 'mailto:alexinholozano10@gmail.com'
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Enviar formulario usando FormSubmit
    fetch('https://formsubmit.co/ajax/alexinholozano10@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        email: formData.email,
        asunto: formData.asunto,
        mensaje: formData.mensaje
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor')
      }
      return response.json()
    })
    .then(data => {
      console.log('Mensaje enviado exitosamente:', data)
      setNotificationMessage('¡Mensaje enviado exitosamente! Te responderé pronto.')
      setIsError(false)
      setShowNotification(true)
      // Resetear el formulario
      setFormData({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
      })
    })
    .catch(error => {
      console.error('Error al enviar el mensaje:', error)
      setNotificationMessage('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctame directamente por correo.')
      setIsError(true)
      setShowNotification(true)
    })
  }

  return (
    <section id="contacto" className="contacto fade-in">
      {showNotification && (
        <div className={`notification ${isError ? 'notification-error' : 'notification-success'}`}>
          <div className="notification-content">
            <i className={isError ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-circle-check'}></i>
            <span>{notificationMessage}</span>
          </div>
        </div>
      )}
      <div className="container">
        <div className="contacto-header">
          <h1>Contacto</h1>
          <p>
            ¡Hablemos! Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades 
            para ser parte de tus visiones. No dudes en contactarme.
          </p>
        </div>

        <div className="contacto-content">
          <div className="contact-info">
            <h2>Información de Contacto</h2>
            <div className="info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-item">
                  <div className="info-icon">
                    <i className={info.icon}></i>
                  </div>
                  <div className="info-details">
                    <h3>{info.label}</h3>
                    <p>{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Envíame un mensaje</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu.email@ejemplo.com"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="asunto">Asunto</label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleInputChange}
                  placeholder="¿De qué quieres hablar?"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  placeholder="Cuéntame sobre tu proyecto o idea..."
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                <i className="fa-solid fa-paper-plane"></i>
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>

        <div className="social-sections-container">
          <div className="whatsapp-section">
            <h2>WhatsApp</h2>
            <div className="social-links">
              <a 
                href="https://wa.me/573234381513" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="social-link social-link-whatsapp"
              >
                <i className="fa-brands fa-whatsapp"></i>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="social-section">
            <h2>DB de Proyectos</h2>
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
        </div>
      </div>
    </section>
  )
}

export default Contacto 