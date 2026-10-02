// Contenido de cada tarjeta: nombre del servicio, propósito, número o disponibilidad e icono.
const info = [
  {
    title: 'Línea Nacional de Emergencia',
    description: ' Atención inmediata y orientación de seguridad.',
    value: '911',
    icon: '🚨',
  },
  {
    title: 'Línea Mujeres',
    description: 'Apoyo especializado para violencia de género.',
    value: '075',
    icon: '🛡️',
  },
  {
    title: 'Atención psicológica',
    description: 'Canales de acompañamiento emocional y orientación.',
    value: '24/7',
    icon: '💬',
  },
]

// Presenta el encabezado informativo y genera una tarjeta por cada canal definido en info.
function LineaEscucha() {
  return (
    <div className="page-shell">
      <section className="page-header compact-hero">
        <div className="container">
          <span className="eyebrow">Línea de escucha</span>
          <h1>Orientación segura y confidencial</h1>
          <p>
            Si necesitas ayuda, información o acompañamiento, nuestros canales están pensados para atenderte con respeto y discreción.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="info-grid">
            {/* Renderiza una tarjeta por cada canal de ayuda definido en info. */}
            {info.map((item) => (
              <article key={item.title} className="info-card">
                <div className="card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default LineaEscucha
