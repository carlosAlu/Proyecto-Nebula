import defaultImage from './assets/ImagenDefault.jpg'

// Lista de organizaciones y centros de apoyo aliados para orientación y atención.
const centros = [
  {
    name: 'Centro de Justicia Para Las Mujeres',
    city: 'La Paz B.C.S.',
    phone: '(612) 688-1236',
    url: 'https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiByLH-q5KXAxVFliYFHRG1DAEQFnoECCAQAQ&url=https%3A%2F%2Fwww.pgjebcs.gob.mx%2Fcjpm%2F&usg=AOvVaw1lUrF8pd6LhGM8kzzLfIik&opi=89978449',
    image: 'https://storage.googleapis.com/tribunamexico/2024/04/gmKkN0FA-Tribuna-1.jpg',
    description: 'Grupo comunitario con atención psicológica y orientación social.',
  },
  {
    name: 'Centro Mujeres',
    city: 'La Paz B.C.S.',
    phone: '(612) 122-3342',
    url: 'https://www.facebook.com/centromujeresac/',
    image: 'https://lh3.googleusercontent.com/proxy/Pg656jhxLzYHo6ycLaG-Lvey3wF3xLTRoN4_shJ2j1A1SIf0Ln8ZumNzceGUBI3mKJ55XmkFmFyhcveDjX1oq4q1ToPKPX1UplWXYtlQqFohITXWpoTDjXYOKCFyYYX-OENxTJe2cUxC0q-B2jmQtyO9xRglIHbQ1MDmSg=s1360-w1360-h1020-rw',
    description: 'atención integral y gratuita a mujeres, así como a sus hijas e hijos',
  },
  {
    name: 'Instituto Municipal de Las Mujeres',
    city: 'La Paz B.C.S.',
    phone: '(612) 123-3440',
    url: 'https://www.facebook.com/IMMLPZ/?locale=es_LA',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnQVL9LjlN8QVwJ11KGeaTLFiVCEtwFBokWVubZH34P8s_037NGBqsnjLbyyNUjn2wpNEoLiJpiGdDWUeY2_BP_kaK5Fhr8Di0zUTq5ehXq1vPLoH7SyWxxHnhxotFEK3VX4hrT=s1360-w1360-h1020-rw',
    description: 'asesoría y atención especializada en beneficio de las mujeres, niñas y adolescentes del municipio',
  },
  {
    name: 'Instituto Sudcaliforniano de las Mujeres',
    city: 'La Paz B.C.S.',
    phone: '(612) 122-2945',
    url: 'https://ismujeres.bcs.gob.mx',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlr2xm4yjgvT7o-HGNWFLKetSxtVPsUsqnX9hTNlk7tU0deW1VtnP5RhzZppqj0WuY_YKoCBRvTysHw_lVx80youJmfsUUFKLD5-V_jxCFAj5DiIToYJ1-Ifi7izQ3kLxA7Dh2Z=s1360-w1360-h1020-rw',
    description: 'promueve la igualdad de género en las capacidades y oportunidades,',
  },
  {
    name: 'Centro Integral de Atención para la Mujer - Municipio de La Paz',
    city: 'La Paz B.C.S.',
    phone: '(612) 121-1829',
    url: 'https://imm.lapaz.gob.mx/contacto',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Hw5VAIncngJw5YCWe26F_lRAPSj5O1CGcjH6HA1-9yZAxzQcGCB6Y_o&s=10',
    description: 'El centro ofrece servicios totalmente gratuitos y confidenciales, incluyendo asesoría legal, atención psicológica y canalización a otros servicios de apoyo.',
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
            {/* Convierte cada registro de centros en una tarjeta con ubicación y contacto. */}
            {centros.map((centro) => (
              <article key={centro.name} className="info-card help-center-card">
                <div className="card-icon">
                  <img src={centro.image || defaultImage} alt={`Imagen de ${centro.name}`} />
                </div>
                <h3>
                  <a href={centro.url} target="_blank" rel="noreferrer" aria-label={`Abrir enlace de ${centro.name}`}>
                    {centro.name}
                  </a>
                </h3>
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
