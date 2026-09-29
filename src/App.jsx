import { useEffect, useState } from 'react'
import './App.css'
import LineaEscucha from './LineasEscucha.jsx'
import CentrosAyuda from './CentrosAyuda.jsx'
import ModulosPreventivos from './ModulosPreventivos.jsx'
import RutasLegales from './RutasLegales.jsx'
import Admin from './Admin.jsx'
import LoginAdmin from './LoginAdmin.jsx'
import SingUpAdmin from './SingUpAdmin.jsx'
import Socios from './Socios.jsx'
import IA from './IA.jsx'
import logo from './assets/Logo.png'
import violentometroImage from './assets/ViolentometroDemostrativo.png'


// Acciones rápidas que aparecen en la home y llevan a cada sección principal de la app.
const quickActions = [
  {
    title: 'Linea de escucha',
    description: 'Consulta información sobre tus derechos y opciones.',
    icon: '⚖️',
    page: 'linea',
  },
  {
    title: 'Centros de ayuda',
    description: 'Encuentra instituciones y refugios cercanos.',
    icon: '📍',
    page: 'centros',
  },
  {
    title: 'Modulos Preventivos',
    description: 'Accede a recursos de contención y acompañamiento.',
    icon: '💬',
    page: 'modulos',
  },
  {
    title: 'Rutas legales',
    description: 'Conoce señales de alerta y rutas de apoyo.',
    icon: '📚',
    page: 'rutas',
  },
]


// Componente principal de Nebula. Gestiona la navegación entre secciones,
// la vista de inicio y la renderización de pantallas internas.
function App() {
  const [activePage, setActivePage] = useState('home')
  const [pendingSection, setPendingSection] = useState(null)

  // Cuando se selecciona una sección desde la home, se desplaza a esa parte de la página.
  useEffect(() => {
    if (activePage !== 'home' || !pendingSection) return

    document.getElementById(pendingSection)?.scrollIntoView({ behavior: 'smooth' })
    setPendingSection(null)
  }, [activePage, pendingSection])

  // Al cambiar de vista, regresa al inicio de la página si ya no estamos en home.
  useEffect(() => {
    if (activePage !== 'home') {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [activePage])

  // Navega a una sección dentro de la home sin perder el contexto visual.
  const navigateToSection = (sectionId) => {
    setPendingSection(sectionId)
    setActivePage('home')
  }

  // Limpia la sección pendiente, vuelve a la portada y desplaza la ventana arriba.
  const navigateHome = () => {
    setPendingSection(null)
    setActivePage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Renderiza la pantalla activa según la navegación del usuario.
  const renderPage = () => {
    switch (activePage) {
      case 'linea':
        return <LineaEscucha />
      case 'centros':
        return <CentrosAyuda />
      case 'modulos':
        return <ModulosPreventivos />
      case 'rutas':
        return <RutasLegales />
      case 'admin':
        return <Admin />
      // Estas funciones flecha cambian entre las vistas de acceso y registro.
      case 'login-admin':
        return <LoginAdmin onBack={navigateHome} onSignup={() => setActivePage('signup-admin')} />
      case 'signup-admin':
        return <SingUpAdmin onBack={navigateHome} onLogin={() => setActivePage('login-admin')} />
      case 'ayuda':
        return <Ayuda />
      case 'socios':
        return <Socios />
      case 'ia':
        return <IA />
      case 'home':
      default:
        return (
          <>
            <section id="inicio" className="hero-section">
              <div className="container hero-content">
                <div className="hero-copy">
                  <span className="eyebrow">Un lugar para entender y orientarte</span>
                  <h1>Tu bienestar <span>también importa.</span></h1>
                  <p>
                    Información, orientación y herramientas para reconocer señales de violencia
                    y buscar apoyo. A tu ritmo, con privacidad y sin juicios.
                  </p>

                  <div className="hero-buttons">
                    <button type="button" className="btn-primary" onClick={() => setActivePage('ia')}>
                      Realizar autoevaluación <span aria-hidden="true">→</span>
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => navigateToSection('nosotros')}>
                      Conocer NEBULA
                    </button>
                  </div>

                  <div className="hero-privacy-note">
                    <span aria-hidden="true">♧</span>
                    <span>No necesitas crear una cuenta para comenzar.</span>
                  </div>
                </div>

                <div className="hero-visual" aria-label="Panel informativo de Nebula">
                  <div className="assessment-preview-card">
                    <div className="assessment-preview-header">
                      <div>
                        <span className="assessment-eyebrow">Un momento para ti</span>
                        <h2>¿Cómo te has sentido?</h2>
                      </div>
                      <span className="assessment-heart" aria-hidden="true">♡</span>
                    </div>
                    <div className="assessment-progress-labels">
                      <span>Tu espacio es privado</span>
                      <span>Matriz oficial</span>
                    </div>
                    <div className="assessment-progress" aria-hidden="true"><span /></div>
                    <p className="assessment-prompt">A veces, lo que vivimos puede ser difícil de nombrar.</p>
                    <p className="assessment-disclaimer">Esta herramienta utiliza una matriz de riesgo oficial para orientarte. No es un diagnóstico.</p>
                    <button type="button" className="assessment-start" onClick={() => setActivePage('ia')}>
                      Comenzar con calma <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section id="pilares" className="advantages-section">
              <div className="container">
                <h2>Nuestros Pilares</h2>
                <p className="section-subtitle">
                  Principios fundamentales para garantizar un entorno seguro, informado y accesible.
                </p>
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

            <section className="violentometro-section" aria-label="Violentómetro demostrativo">
              <div className="container">
                <img
                  className="violentometro-image"
                  src={violentometroImage}
                  alt="Violentómetro: ejemplos de conductas de alerta, violencia y peligro, organizados por nivel de riesgo."
                />
              </div>
            </section>

            <section id="nosotros" className="about-section">
              <div className="container about-grid">
                <div className="about-text">
                  <h2>Sobre el Proyecto Nebula</h2>
                  <p>
                    Nebula nace como una plataforma integral de tecnología social orientada a visibilizar,
                    prevenir y erradicar la violencia hacia la mujer. Creemos firmemente que la información
                    accesible y oportuna salva vidas.
                  </p>
                  <p>
                    Nuestra misión es conectar a quienes necesitan orientación con herramientas claras,
                    centros de atención psicológica y jurídica, y una comunidad informada que promueve el
                    respeto y la equidad.
                  </p>
                  <a href="#servicios" className="btn-primary">Explorar Servicios</a>
                </div>

                <div className="about-stats-graphic">
                  <div className="stat-bar-container">
                    <span>Orientación Preventiva (85%)</span>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: '85%' }} /></div>
                  </div>
                  <div className="stat-bar-container">
                    <span>Atención Psicológica (70%)</span>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: '70%' }} /></div>
                  </div>
                  <div className="stat-bar-container">
                    <span>Asesoría Jurídica (60%)</span>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: '60%' }} /></div>
                  </div>
                  <div className="stat-bar-container">
                    <span>Canalización Efectiva (90%)</span>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: '90%' }} /></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="quick-actions-section" id="servicios">
              <div className="container">
                <h2>Nuestros servicios y recursos</h2>
                <p className="section-subtitle">Herramientas diseñadas para ofrecer soporte integral y oportuno.</p>

                <div className="quick-actions-grid">
                  {/* Recorre las acciones configuradas y cambia a la pantalla asociada al hacer clic. */}
                  {quickActions.map((action) => (
                    <a
                      key={action.title}
                      className="quick-action-card"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActivePage(action.page)
                      }}
                      aria-label={action.title}
                    >
                      <div className="quick-action-media" role="img" aria-label={`${action.title} imagen`}>
                        <span>{action.icon}</span>
                      </div>
                      <div className="quick-action-body">
                        <h3>{action.title}</h3>
                        <p>{action.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>

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
            <section id="contacto" className="cta-contact-section">
              <div className="container">
                <h2>¿Necesitas Orientación?</h2>
                <p>
                  Escríbenos para recibir información sobre centros de ayuda, o para colaborar con nuestra
                  iniciativa comunitaria.
                </p>

                <form className="contact-form">
                  <div className="form-group">
                    <input type="text" placeholder="Tu Nombre o Alias (Opcional)" required />
                    <input type="email" placeholder="Correo electrónico de contacto" required />
                    <input type="tel" placeholder="Teléfono (Opcional)" />
                  </div>
                  <textarea placeholder="Cuéntanos cómo podemos ayudarte o qué información necesitas..." rows="4" required />
                  <button type="submit" className="btn-primary">Enviar Mensaje Seguro</button>
                </form>
              </div>
            </section>

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
          </>
        )
    }
  }

  return (
    <div className="nebula-app">
      <header className="header">
        <div className="container header-container">
          <a href="#inicio" className="logo" onClick={(e) => { e.preventDefault(); navigateHome() }} aria-label="Ir a la página principal">
            <span className="logo-icon">
              <img src={logo} alt="Logo Nebula" />
            </span>
            <span className="logo-text">NEBULA</span>
          </a>

          {/* Los eventos cancelan el ancla predeterminada para usar la navegación interna de React. */}
          <nav className="nav" aria-label="Navegación principal">
            <a href="#pilares" className="nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('pilares') }}>Prevención</a>
            <button type="button" className="nav-link" onClick={() => setActivePage('ia')}>Autoevaluación</button>
            <a href="#servicios" className="nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('servicios') }}>Recursos</a>
            <a href="#socios" className="nav-link" onClick={(e) => { e.preventDefault(); setActivePage('socios'); window.history.pushState(null, '', '#socios') }}>Socios</a>
            <a href="#login-admin" className="nav-link nav-admin-link" onClick={(e) => { e.preventDefault(); setActivePage('login-admin'); window.history.pushState(null, '', '#login-admin') }}>Admin</a>
          </nav>
          <button type="button" className="header-report-button" onClick={() => navigateToSection('contacto')}>
            Reportar
          </button>
        </div>
      </header>

      <main>{renderPage()}</main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-col">
            <h3>
              <img src={logo} alt="Logo Nebula" className="footer-logo-icon" />
              <span>NEBULA</span>
            </h3>
            <p>Sistema de prevención, concientización y apoyo contra la violencia hacia la mujer.</p>
          </div>
          <div className="footer-col">
            <h4>Secciones</h4>
            {/* Los enlaces del pie reutilizan la navegación a secciones de la portada. */}
            <ul>
              <li><a href="#inicio" onClick={(e) => { e.preventDefault(); navigateToSection('inicio') }}>Inicio</a></li>
              <li><a href="#pilares" onClick={(e) => { e.preventDefault(); navigateToSection('pilares') }}>Pilares</a></li>
              <li><a href="#nosotros" onClick={(e) => { e.preventDefault(); navigateToSection('nosotros') }}>Sobre el Proyecto</a></li>
              <li><a href="#servicios" onClick={(e) => { e.preventDefault(); navigateToSection('servicios') }}>Servicios</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Recursos Útiles</h4>
            {/* Estos controladores abren directamente cada pantalla de recursos. */}
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('centros') }}>Centros de Atención</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('rutas') }}>Rutas de Acción</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('linea') }}>Líneas de Emergencia</a></li>
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

      <a
        className="panic-button"
        href="https://www.shein.com.mx/?onelink=10/4ivi7j3cevpg&requestId=olw-61pykflxywwa&url_from=affiliate_af_b_68_181_0&affiliateID=af_b_sub_13861&click_id=gx-mx-shein-shein-ssd&sub_id=browser&campaign_id=SPDL&source_id=opera&placement_id=SPDL&network=%7Bnetwork%7D&keyword=%7Bkeyword%7D&cdn_rsite=ak&ref=www&rep=dir&ret=mx"
        aria-label="Botón de pánico"
      >
        <span className="panic-icon">🚨</span>
        <span className="panic-text">Pánico</span>
      </a>
    </div>
  )
}

export default App
