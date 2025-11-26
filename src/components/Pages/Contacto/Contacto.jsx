import React, { useEffect, useState } from 'react'
import './Contacto.css'

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  })

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const socialLinks = [
    { icon: 'fa-brands fa-whatsapp', label: 'WhatsApp', url: 'https://wa.me/573234381513' },
    { icon: 'fa-brands fa-github', label: 'GitHub', url: 'https://github.com/lexito11' }
  ]

  const contactInfo = [
    { icon: 'fa-solid fa-envelope', label: 'Email', value: 'alexander@ejemplo.com' },
    { icon: 'fa-solid fa-phone', label: 'Teléfono', value: '+57 300 123 4567' },
    { icon: 'fa-solid fa-map-marker-alt', label: 'Ubicación', value: 'Bogotá, Colombia' }
  ]

  const handleEmailClick = () => {
    window.location.href = 'mailto:alexander@ejemplo.com'
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
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Formulario enviado:', formData)
    // Resetear el formulario
    setFormData({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    })
  }

  return (
    <section id="contacto" className="contacto fade-in">
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
    </section>
  )
}

export default Contacto 