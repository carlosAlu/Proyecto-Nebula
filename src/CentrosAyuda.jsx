const centros = [
  {
    name: 'Casa de Esperanza',
    city: 'La Paz',
    phone: '(612) 123-4567',
    icon: '📍',
    description: 'Acompañamiento integral, refugio temporal y apoyo legal.',
  },
  {
    name: 'Red de Mujeres',
    city: 'Los Cabos',
    phone: '(624) 987-6543',
    icon: '🤝',
    description: 'Grupo comunitario con atención psicológica y orientación social.',
  },
  {
    name: 'Centro de Apoyo Jurídico',
    city: 'Cabo Pulmo',
    phone: '(612) 765-4321',
    icon: '⚖️',
    description: 'Asesoría legal y guía para procedimientos y derechos.',
  },
]

function CentrosAyuda() {
  return (
    <div className="page-shell">
      <section className="page-header compact-hero">
        <div className="container">
          <span className="eyebrow">Centros de ayuda</span>
          <h1>Red de apoyo cercana</h1>
          <p>
            Conoce organizaciones y colectivos comprometidos con la protección, atención y acompañamiento.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="info-grid">
            {centros.map((centro) => (
              <article key={centro.name} className="info-card">
                <div className="card-icon">{centro.icon}</div>
                <h3>{centro.name}</h3>
                <p>{centro.description}</p>
                <span>{centro.city}</span>
                <strong>{centro.phone}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CentrosAyuda
