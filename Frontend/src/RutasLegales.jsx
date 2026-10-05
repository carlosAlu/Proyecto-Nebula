// Pasos de orientación que se presentan en orden como tarjetas dentro de la ruta legal.
const rutas = [
  {
    title: 'Identifica la situación',
    description: 'Observa señales, toma nota y prioriza tu seguridad.',
    icon: '🧭',
  },
  {
    title: 'Informa a alguien de confianza',
    description: 'Comparte tu situación con una persona de apoyo segura.',
    icon: '🤝',
  },
  {
    title: 'Busca ayuda profesional',
    description: 'Contacta líneas, centros o especialistas en violencia de género.',
    icon: '📞',
  },
]

// Encabezado y cuadrícula con los pasos de cuidado y orientación disponibles.
function RutasLegales() {
  return (
    <div className="page-shell">
      {/* Explica que los pasos son orientación general para buscar apoyo. */}
      <section className="page-header compact-hero">
        <div className="container">
          <span className="eyebrow">Rutas legales</span>
          <h1>Derechos, pasos y acompañamiento</h1>
          <p>
            Conoce los recursos legales disponibles para proteger tus derechos y tomar decisiones informadas.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="info-grid">
            {/* Presenta cada paso de la ruta como una tarjeta independiente. */}
            {rutas.map((ruta) => (
              <article key={ruta.title} className="info-card">
                <div className="card-icon">{ruta.icon}</div>
                <h3>{ruta.title}</h3>
                <p>{ruta.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default RutasLegales
