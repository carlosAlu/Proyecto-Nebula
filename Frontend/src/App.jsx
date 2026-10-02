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
import Autoevaluacion from './Autoevaluacion.jsx'
import ReporteModal from './ReporteModal.jsx'
import ConsultaReporteModal from './ConsultaReporteModal.jsx'
import logo from './assets/Logo.png'
import miImagen from './assets/Circ_AI.png'
import miImagenParpadeo from './assets/Circ_Ai_Parpadeo.png'
import violentometroImage from './assets/ViolentometroDemostrativo.png'

// Configuración de accesos directos que se muestran en la portada.
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

// Fragmentos que representan pantallas completas y secciones de la portada.
const pageRoutes = [
  'linea',
  'centros',
  'modulos',
  'rutas',
  'admin',
  'login-admin',
  'signup-admin',
  'socios',
  'ia',
  'autoevaluacion',
]

const homeSections = ['inicio', 'pilares', 'nosotros', 'servicios', 'proceso', 'contacto']

// Textos que se alternan en el globo junto al acceso flotante de IA.
const aiMessages = [
  '¡Hola! hazme clic para platicar conmigo.',
  '¿Quieres conversar? pulsame y empecemos.',
  'Estoy aquí para escucharte. Haz clic sobre mi.',
  '¿Buscas orientación? Pulsa aquí para abrir nuestro chat.',
  'Puedes hablar conmigo cuando quieras. ¡Haz clic!',
  'Hola, este es un espacio para ti. pulsa para entrar.',
  '¿Te gustaría platicar? Haz clic aquí para comenzar.',
]

// Interpreta el fragmento de URL para recuperar la pantalla o sección activa.
function getRouteFromHash() {
  const fragment = window.location.hash.slice(1)

  if (pageRoutes.includes(fragment)) {
    return { page: fragment, section: null }
  }

  if (homeSections.includes(fragment)) {
    return { page: 'home', section: fragment }
  }

  return { page: 'home', section: null }
}

// Componente principal de Nebula. Gestiona la navegación entre secciones,
// la vista de inicio y la renderización de pantallas internas.
function App() {
  const [activePage, setActivePage] = useState(() => getRouteFromHash().page)
  const [activeSection, setActiveSection] = useState(() => getRouteFromHash().section)
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.localStorage.getItem('nebula-theme') === 'dark',
  )
  const [isAiBlinking, setIsAiBlinking] = useState(false)
  const [aiMessage, setAiMessage] = useState(null)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isReportLookupOpen, setIsReportLookupOpen] = useState(false)

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light'
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('nebula-theme', theme)
  }, [isDarkMode])

  // Mantiene la vista sincronizada con los botones atrás/adelante y los cambios del hash.
  useEffect(() => {
    const syncRoute = () => {
      const route = getRouteFromHash()
      setActivePage(route.page)
      setActiveSection(route.section)
    }

    window.addEventListener('popstate', syncRoute)
    window.addEventListener('hashchange', syncRoute)

    return () => {
      window.removeEventListener('popstate', syncRoute)
      window.removeEventListener('hashchange', syncRoute)
    }
  }, [])

  // Alterna mensajes breves de bienvenida y limpia los temporizadores al desmontar.
  useEffect(() => {
    let showTimer
    let hideTimer
    let lastMessageIndex = -1

    const scheduleMessage = () => {
      showTimer = window.setTimeout(() => {
        let nextMessageIndex
        do {
          nextMessageIndex = Math.floor(Math.random() * aiMessages.length)
        } while (nextMessageIndex === lastMessageIndex)

        lastMessageIndex = nextMessageIndex
        setAiMessage(aiMessages[nextMessageIndex])

        hideTimer = window.setTimeout(() => {
          setAiMessage(null)
          showTimer = window.setTimeout(scheduleMessage, 3500)
        }, 5000)
      }, 900)
    }

    scheduleMessage()

    return () => {
      window.clearTimeout(showTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  // Anima el parpadeo del avatar de IA en intervalos variables.
  useEffect(() => {
    let blinkTimer
    let openEyesTimer

    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => {
        setIsAiBlinking(true)
        openEyesTimer = window.setTimeout(() => {
          setIsAiBlinking(false)
          scheduleBlink()
        }, 140)
      }, 2800 + Math.random() * 4200)
    }

    scheduleBlink()

    return () => {
      window.clearTimeout(blinkTimer)
      window.clearTimeout(openEyesTimer)
    }
  }, [])

  // Desplaza hasta la sección seleccionada después de navegar dentro de la portada.
  useEffect(() => {
    if (activePage !== 'home' || !activeSection) return

    document.getElementById(activeSection)?.scrollIntoView({ behavior: 'smooth' })
  }, [activePage, activeSection])

  // Al abrir una pantalla interna, vuelve al inicio de la página.
  useEffect(() => {
    if (activePage !== 'home') {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [activePage])

  // Actualiza el hash sin recargar el documento.
  const updateLocation = (fragment) => {
    if (window.location.hash !== `#${fragment}`) {
      window.history.pushState(null, '', `#${fragment}`)
    }
  }

  const navigateToPage = (page) => {
    const destination = page === 'home' ? 'inicio' : page
    updateLocation(destination)
    setActivePage(page)
    setActiveSection(null)
  }

  const navigateToSection = (sectionId) => {
    updateLocation(sectionId)
    setActivePage('home')
    setActiveSection(sectionId)
  }

  const navigateHome = () => {
    navigateToPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Decide qué pantalla mostrar; el caso por defecto compone las secciones de la portada.
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
        return <LoginAdmin onBack={navigateHome} onSignup={() => navigateToPage('signup-admin')} />
      case 'signup-admin':
        return <SingUpAdmin onBack={navigateHome} onLogin={() => navigateToPage('login-admin')} />
      case 'socios':
        return <Socios />
      case 'ia':
        return <IA />
      case 'autoevaluacion':
        return <Autoevaluacion />
      case 'home':
      default:
        return (
          <>
            {/* Presentación principal y acceso inicial a la autoevaluación. */}
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
                    <button type="button" className="btn-primary" onClick={() => navigateToPage('autoevaluacion')}>
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
                    <button type="button" className="assessment-start" onClick={() => navigateToPage('autoevaluacion')}>
                      Comenzar con calma <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Principios de la plataforma y resumen de sus áreas de trabajo. */}
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

            {/* Descripción del proyecto y métricas ilustrativas de sus servicios. */}
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
                  <a href="#servicios" className="btn-primary" onClick={(e) => { e.preventDefault(); navigateToSection('servicios') }}>Explorar Servicios</a>
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

            {/* Accesos a pantallas de recursos y a contenido preventivo. */}
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
                        navigateToPage(action.page)
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
                <h2>Herramientas para entender</h2>
                <p className="section-subtitle">Conoce las señales de alerta y cómo identificar situaciones de riesgo.</p>
                <div className="process-steps">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <h3>Tipos de violencia</h3>
                    <p>Conoce como puede manifestarse la violencia en distintos espacios y relaciones</p>
                  </div>
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <h3>Señales de alerta </h3>
                    <p>Identifica comportamientos que merecen atencion sinm juicios ni etiquetas</p>
                  </div>
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <h3>Situaciones cotidianas</h3>
                    <p>Explora ejemplos y encuentra palabras para lo que estas viviendo</p>
                  </div>
                  <div className="step-item">
                    <div className="step-number">4</div>
                    <h3>Violentometro</h3>
                    <p>Una guia visual para reconocer niveles de riesgo y buscar orientacion</p>
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

            {/* Indicadores, consulta de reportes y formulario de contacto. */}
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
            <section className="report-lookup-section" aria-labelledby="report-lookup-title">
              <div className="container report-lookup-grid">
                <article className="report-lookup-card">
                  <span className="report-lookup-icon" aria-hidden="true">▣</span>
                  <h2 id="report-lookup-title">¿Deseas consultar tu reporte?</h2>
                  <p>
                    Introduce tu folio único para conocer el estatus actual de tu seguimiento
                    de forma completamente anónima.
                  </p>
                  <button
                    type="button"
                    className="report-lookup-link"
                    onClick={() => setIsReportLookupOpen(true)}
                  >
                    Consultar por folio <span aria-hidden="true">→</span>
                  </button>
                </article>
                <article className="report-create-card">
                  <span className="report-create-eyebrow">También puedes</span>
                  <h2>Reportar de forma anónima</h2>
                  <p>
                    No necesitas crear una cuenta. Tu privacidad importa.
                  </p>
                  <button
                    type="button"
                    className="report-create-link"
                    onClick={() => setIsReportModalOpen(true)}
                  >
                    Ir al formulario <span aria-hidden="true">→</span>
                  </button>
                </article>
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
                  <button type="submit" className="btn-primary">Enviar Mensaje</button>
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
      {/* Encabezado persistente con navegación, reportes y acceso a IA. */}
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
            <a href="#inicio" className="nav-link" onClick={(e) => { e.preventDefault(); navigateHome() }}>Inicio</a>
            <a href="#pilares" className="nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('pilares') }}>Pilares</a>
            <a href="#servicios" className="nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('servicios') }}>Recursos</a>
            <a href="#socios" className="nav-link" onClick={(e) => { e.preventDefault(); navigateToPage('socios') }}>Socios</a>
            <button type="button" className="nav-link" onClick={() => navigateToPage('autoevaluacion')}>Autoevaluación</button>
            <a href="#login-admin" className="nav-link nav-admin-link" onClick={(e) => { e.preventDefault(); navigateToPage('login-admin') }}>Admin</a>
            <button
              type="button"
              className="nav-link theme-toggle"
              onClick={() => setIsDarkMode((currentMode) => !currentMode)}
              aria-label={`Activar modo ${isDarkMode ? 'claro' : 'oscuro'}`}
              aria-pressed={isDarkMode}
              title={`Activar modo ${isDarkMode ? 'claro' : 'oscuro'}`}
            >
              <span aria-hidden="true">{isDarkMode ? '☀' : '☾'}</span>
            </button>
          </nav>
          <button type="button" className="header-report-button" onClick={() => setIsReportModalOpen(true)}>
            Reportar
          </button>
          {!['admin', 'login-admin', 'signup-admin'].includes(activePage) && (
            <div className="header-ai">
              {aiMessage && (
                <button
                  type="button"
                  className="ai-message"
                  onClick={() => navigateToPage('ia')}
                  aria-label={`Abrir IA: ${aiMessage}`}
                  aria-live="polite"
                >
                  {aiMessage}
                </button>
              )}
              <button
                type="button"
                className="ai-evaluation-button"
                onClick={() => navigateToPage('ia')}
                aria-label="Abrir evaluación de IA"
              >
                <img
                  src={isAiBlinking ? miImagenParpadeo : miImagen}
                  alt="Evaluación de IA"
                />
              </button>
            </div>
          )}
        </div>
      </header>

      <main>{renderPage()}</main>
      {/* Los modales se montan únicamente mientras su estado de apertura sea verdadero. */}
      {isReportModalOpen && <ReporteModal onClose={() => setIsReportModalOpen(false)} />}
      {isReportLookupOpen && <ConsultaReporteModal onClose={() => setIsReportLookupOpen(false)} />}

      {/* Enlaces a recursos frecuentes y datos de contacto y emergencia. */}
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
              <li><a href="#centros" onClick={(e) => { e.preventDefault(); navigateToPage('centros') }}>Centros de Atención</a></li>
              <li><a href="#rutas" onClick={(e) => { e.preventDefault(); navigateToPage('rutas') }}>Rutas de Acción</a></li>
              <li><a href="#linea" onClick={(e) => { e.preventDefault(); navigateToPage('linea') }}>Líneas de Emergencia</a></li>
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

      {/* Acceso fijo de salida rápida configurado como botón de pánico. */}
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
