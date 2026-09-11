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

function ModulosPreventivos() {
  return (
    <div className="page-shell">
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
