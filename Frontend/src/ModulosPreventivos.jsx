// Datos de los módulos preventivos que se convierten en tarjetas dentro de esta pantalla.
const modulos = [
  {
    title: 'Prevención y reconocimiento',
    description: 'Identifica señales de riesgo y toma decisiones con información clara.',
    icon: '🔎',
  },
  {
    title: 'Comunicación segura',
    description: 'Aprende cómo pedir ayuda, documentar información y buscar apoyo.',
    icon: '📡',
  },
  {
    title: 'Cuidado emocional',
    description: 'Recursos para sostener tu bienestar emocional y fortalecer tu red.',
    icon: '🧠',
  },
]

// Organiza el encabezado de la página y la cuadrícula de recursos preventivos.
function ModulosPreventivos() {
  return (
    <div className="page-shell">
      {/* Introduce el contenido preventivo y el objetivo de los recursos. */}
      <section className="page-header compact-hero">
        <div className="container">
          <span className="eyebrow">Módulos preventivos</span>
          <h1>Herramientas para actuar con seguridad</h1>
          <p>
            Brindamos contenidos prácticos para reconocer riesgos, prevenir daños y buscar apoyo oportuno.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="info-grid">
            {/* Construye las tarjetas informativas a partir del arreglo de módulos. */}
            {modulos.map((modulo) => (
              <article key={modulo.title} className="info-card">
                <div className="card-icon">{modulo.icon}</div>
                <h3>{modulo.title}</h3>
                <p>{modulo.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ModulosPreventivos
