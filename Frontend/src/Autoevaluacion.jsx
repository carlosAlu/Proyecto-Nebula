// Tarjetas introductorias que explican el propósito y el ritmo de la autoevaluación.
const orientacion = [
  {
    icon: '🌿',
    title: 'A tu propio ritmo',
    description: 'Tómate el tiempo que necesites. Puedes hacer una pausa cuando lo consideres.',
  },
  {
    icon: '🧭',
    title: 'Para reflexionar',
    description: 'Un espacio para reconocer cómo te sientes y observar situaciones de tu entorno.',
  },
  {
    icon: '🤝',
    title: 'Con orientación',
    description: 'Al terminar, podrás consultar información y opciones de apoyo disponibles.',
  },
]

function Autoevaluacion() {
  return (
    <div className="page-shell ai-page-shell">
      {/* Presenta el objetivo de la herramienta y establece expectativas de privacidad. */}
      <section className="page-header compact-hero">
        <div className="container">
          <span className="eyebrow">Autoevaluación</span>
          <h1>Un espacio para escucharte</h1>
          <p>
            Esta sección está pensada para ayudarte a reflexionar sobre tu bienestar,
            con calma, privacidad y sin juicios.
          </p>
        </div>
      </section>

      {/* Reúne las recomendaciones de seguridad y las tarjetas de orientación. */}
      <section className="page-section">
        <div className="container">
          <div className="ai-focus-card">
            <h2>Antes de comenzar</h2>
            <p>
              Cada experiencia es distinta. No hay respuestas correctas o incorrectas
              y esta herramienta no reemplaza el acompañamiento de una persona
              profesional.
            </p>
            <ul className="ai-focus-list">
              <li>Tu bienestar y seguridad son lo más importante.</li>
              <li>Comparte únicamente la información con la que te sientas cómoda.</li>
              <li>Si estás en peligro inmediato, comunícate al 911.</li>
            </ul>
          </div>

          <div className="info-grid" style={{ marginTop: '24px' }}>
            {orientacion.map((item) => (
              <article className="info-card" key={item.title}>
                <div className="card-icon" aria-hidden="true">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Autoevaluacion
