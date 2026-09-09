import { useState } from 'react'
import './App.css'

function App() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="nebula-app">
      {/* HEADER / NAVBAR */}
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <span className="logo-icon">✨</span>
            <span className="logo-text">NEBULA</span>
          </div>
          <nav className="nav">
            <a href="#inicio">Inicio</a>
            <a href="#pilares">Pilares</a>
            <a href="#nosotros">Sobre Nebula</a>
            <a href="#servicios">Servicios</a>
            <a href="#proceso">Cómo Actuar</a>
            <a href="#contacto">Ayuda</a>
          </nav>
          <div className="header-emergency">
            <a href="tel:911" className="emergency-btn">🚨 Emergencias: 911</a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="hero-section">
        <div className="container hero-content">
          <h1>NEBULA: Prevención y Red de Apoyo</h1>
          <p>Un espacio seguro e informativo dedicado a la prevención de la violencia contra la mujer, la concientización comunitaria y el acceso directo a centros de ayuda especializada.</p>
          <div className="hero-buttons">
            <a href="#contacto" className="btn-primary">Buscar Ayuda Inmediata</a>
            <a href="#servicios" className="btn-secondary">Conocer Recursos</a>
          </div>
        </div>
      </section>

      {/* OUR ADVANTAGES / PILARES */}
      <section id="pilares" className="advantages-section">
        <div className="container">
          <h2>Nuestros Pilares</h2>
          <p className="section-subtitle">Principios fundamentales para garantizar un entorno seguro, informado y accesible.</p>
          <div className="advantages-grid">
            <div className="advantage-card">
              <div className="card-icon">🛡️</div>
              <h3>Confidencialidad</h3>
              <p>Espacios seguros y canales protegidos para salvaguardar tu privacidad en todo momento.</p>
            </div>
            <div className="advantage-card">
              <div className="card-icon">🤝</div>
              <h3>Red de Apoyo</h3>
              <p>Conexión directa con organizaciones, colectivos y profesionales especializados.</p>
            </div>
            <div className="advantage-card">
              <div className="card-icon">📚</div>
              <h3>Educación y Guías</h3>
              <p>Recursos claros para identificar señales de alerta y comprender los tipos de violencia.</p>
            </div>
            <div className="advantage-card">
              <div className="card-icon">⚖️</div>
              <h3>Orientación Legal</h3>
              <p>Información clara sobre tus derechos y los pasos legales disponibles a tu alcance.</p>
            </div>
            <div className="advantage-card">
              <div className="card-icon">💡</div>
              <h3>Concientización</h3>
              <p>Campañas activas para transformar la cultura y prevenir la violencia desde la raíz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="nosotros" className="about-section">
        <div className="container about-grid">
          <div className="about-text">
            <h2>Sobre el Proyecto Nebula</h2>
            <p>Nebula nace como una plataforma integral de tecnología social orientada a visibilizar, prevenir y erradicar la violencia hacia la mujer. Creemos firmemente que la información accesible y oportuna salva vidas.</p>
            <p>Nuestra misión es conectar a quienes necesitan orientación con herramientas claras, centros de atención psicológica y jurídica, y una comunidad informada que promueve el respeto y la equidad.</p>
            <a href="#servicios" className="btn-primary">Explorar Servicios</a>
          </div>
          <div className="about-stats-graphic">
            <div className="stat-bar-container">
              <span>Orientación Preventiva (85%)</span>
              <div className="progress-bar"><div className="progress-fill" style={{ width: '85%' }}></div></div>
            </div>
            <div className="stat-bar-container">
              <span>Atención Psicológica (70%)</span>
              <div className="progress-bar"><div className="progress-fill" style={{ width: '70%' }}></div></div>
            </div>
            <div className="stat-bar-container">
              <span>Asesoría Jurídica (60%)</span>
              <div className="progress-bar"><div className="progress-fill" style={{ width: '60%' }}></div></div>
            </div>
            <div className="stat-bar-container">
              <span>Canalización Efectiva (90%)</span>
              <div className="progress-bar"><div className="progress-fill" style={{ width: '90%' }}></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section id="servicios" className="services-section">
        <div className="container">
          <h2>Nuestros Servicios y Recursos</h2>
          <p className="section-subtitle">Herramientas diseñadas para ofrecer soporte integral y oportuno.</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-badge">Orientación</div>
              <h3>Línea de Escucha</h3>
              <p>Espacio de contención y orientación inicial confidencial disponible para ti.</p>
              <a href="#contacto" className="service-link">Saber más &rarr;</a>
            </div>
            <div className="service-card">
              <div className="service-badge">Directorio</div>
              <h3>Centros de Ayuda</h3>
              <p>Mapa y listado de refugios, instituciones gubernamentales y centros especializados.</p>
              <a href="#contacto" className="service-link">Saber más &rarr;</a>
            </div>
            <div className="service-card">
              <div className="service-badge">Educación</div>
              <h3>Módulos Preventivos</h3>
              <p>Talleres, lecturas y herramientas para identificar ciclos de violencia a tiempo.</p>
              <a href="#contacto" className="service-link">Saber más &rarr;</a>
            </div>
            <div className="service-card">
              <div className="service-badge">Legal</div>
              <h3>Rutas Legales</h3>
              <p>Guías paso a paso sobre cómo interponer denuncias y solicitar medidas de protección.</p>
              <a href="#contacto" className="service-link">Saber más &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="proceso" className="process-section">
        <div className="container">
          <h2>Cómo Recibir Apoyo en Nebula</h2>
          <p className="section-subtitle">Un proceso claro, empático y seguro para guiarte en cada paso.</p>
          <div className="process-steps">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3>Identifica</h3>
              <p>Reconoce las señales de alerta y evalúa tu situación con nuestras herramientas interactivas.</p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h3>Infórmate</h3>
              <p>Accede a guías claras sobre tus derechos y los recursos disponibles en tu localidad.</p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h3>Contacta</h3>
              <p>Comunícate de forma segura con centros de ayuda o líneas de emergencia especializadas.</p>
            </div>
            <div className="step-item">
              <div className="step-number">4</div>
              <h3>Acompañamiento</h3>
              <p>Recibe soporte continuo de redes de apoyo y profesionales comprometidos con tu bienestar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS / IMPACT METRICS */}
      <section className="skills-section">
        <div className="container">
          <h2>Impacto y Alcance de Nebula</h2>
          <p className="section-subtitle">Nuestro compromiso medido en resultados y apoyo comunitario.</p>
          <div className="skills-grid">
            <div className="skill-circle">
              <div className="circle-progress p-92"><span>92%</span></div>
              <h4>Canalización Exitosa</h4>
            </div>
            <div className="skill-circle">
              <div className="circle-progress p-88"><span>88%</span></div>
              <h4>Satisfacción de Apoyo</h4>
            </div>
            <div className="skill-circle">
              <div className="circle-progress p-95"><span>95%</span></div>
              <h4>Información Verificada</h4>
            </div>
            <div className="skill-circle">
              <div className="circle-progress p-99"><span>99%</span></div>
              <h4>Confidencialidad</h4>
            </div>
          </div>
        </div>
      </section>

      {/* START YOUR NEW PROJECT / CONTACT FORM */}
      <section id="contacto" className="cta-contact-section">
        <div className="container">
          <h2>¿Necesitas Orientación o Quieres Unirte a Nebula?</h2>
          <p>Escríbenos para recibir información sobre centros de ayuda, o para colaborar con nuestra iniciativa comunitaria.</p>
          
          {submitted ? (
            <div className="success-message">
              <p>✨ ¡Mensaje enviado de forma segura! Gracias por contactar a Nebula. Te responderemos pronto.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" placeholder="Tu Nombre o Alias (Opcional)" required />
                <input type="email" placeholder="Correo electrónico de contacto" required />
                <input type="tel" placeholder="Teléfono (Opcional)" />
              </div>
              <textarea placeholder="Cuéntanos cómo podemos ayudarte o qué información necesitas..." rows="4" required></textarea>
              <button type="submit" className="btn-primary">Enviar Mensaje Seguro</button>
            </form>
          )}
        </div>
      </section>

      {/* CONTACT INFO BAR */}
      <section className="contacts-info-section">
        <div className="container contacts-info-grid">
          <div>
            <p>📍 Cobertura y Centros Aliados en Baja California Sur y México</p>
          </div>
          <div>
            <p>📞 Línea Nacional de Ayuda: 800-108-4053</p>
          </div>
          <div>
            <p>✉️ contacto@proyecto-nebula.org</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-col">
            <h3>✨ NEBULA</h3>
            <p>Sistema de prevención, concientización y apoyo contra la violencia hacia la mujer.</p>
          </div>
          <div className="footer-col">
            <h4>Secciones</h4>
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#pilares">Pilares</a></li>
              <li><a href="#nosotros">Sobre el Proyecto</a></li>
              <li><a href="#servicios">Servicios</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Recursos Útiles</h4>
            <ul>
              <li><a href="#contacto">Centros de Atención</a></li>
              <li><a href="#proceso">Rutas de Acción</a></li>
              <li><a href="#servicios">Líneas de Emergencia</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Emergencias</h4>
            <ul>
              <li><a href="tel:911">Emergencias Nacionales: 911</a></li>
              <li><a href="tel:075">Línea Mujeres: 075</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Nebula Project. Todos los derechos reservados. Espacio seguro y confidencial.</p>
        </div>
      </footer>
    </div>
  )
}

export default App