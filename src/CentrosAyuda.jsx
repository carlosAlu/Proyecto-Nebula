// Lista de organizaciones y centros de apoyo aliados para orientación y atención.
const centros = [
  {
    name: 'Centro de Justicia Para Las Mujeres',
    city: 'La Paz B.C.S.',
    phone: '(612) 688-1236',
    icon: '🤝',
    description: 'Grupo comunitario con atención psicológica y orientación social.',
  },
  {
    name: 'Centro Mujeres',
    city: 'La Paz B.C.S.',
    phone: '(612) 122-3342',
    icon: '⚖️',
    description: 'Asesoría legal y guía para procedimientos y derechos.',
  },
  {
    name: 'Instituto Municipal de Las Mujeres',
    city: 'La Paz B.C.S.',
    phone: '(612) 123-3440',
    icon: '⚖️',
    description: 'Asesoría legal y guía para procedimientos y derechos.',
  },
  {
    name: 'Instituto Sudcaliforniano de las Mujeres',
    city: 'La Paz B.C.S.',
    phone: '(612) 122-2945',
    icon: '⚖️',
    description: 'Asesoría legal y guía para procedimientos y derechos.',
  },
]

// Muestra la red de centros de atención cercanos, con mapa y tarjetas de contacto.
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

<section className="page-section map-section">
        <div className="container">
          <div className="map-wrapper">
            <h2>Ubicación de centros de apoyo</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d58274.733810085665!2d-110.31914963155035!3d24.095486058925122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scentros%20de%20ayuda%20para%20la%20mujer!5e0!3m2!1ses!2smx!4v1789064845400!5m2!1ses!2smx"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Mapa de centros de ayuda"
            />
          </div>
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
                <a href={`tel:${centro.phone.replace(/\D/g, '')}`}>
                  {centro.phone}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
    
  )
}

export default CentrosAyuda
