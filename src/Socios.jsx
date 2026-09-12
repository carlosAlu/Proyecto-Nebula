import defaultImage from './assets/ImagenDefault.jpg'

// Lista de socios e instituciones aliadas que apoyan la misión de Nebula.
const partners = [
	{ name: 'Centro Integral de Atención para la Mujer - Municipio de La Paz', type: 'Atención y orientación especializada', url: 'https://www.youtube.com' },
	{ name: 'Centro de Justicia Para Las Mujeres', type: 'Red de apoyo y canalización', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&partner=centro-justicia' },
    { name: 'Centro Mujeres', type: 'Red de apoyo y canalización', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&partner=centro-mujeres' },
	{ name: 'Instituto Sudcaliforniano de las Mujeres', type: 'Red de apoyo y canalización', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&partner=instituto-sudcaliforniano' },
	{ name: 'Instituto Municipal de Las Mujeres', type: 'Red de apoyo y canalización', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&partner=instituto-municipal' },
    { name: 'UNIVERSIDAD AUTÓNOMA DE BAJA CALIFORNIA SUR', type: 'Institución universitaria', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&partner=uabcs' },
    { name: 'COMPUSERVICIOSBCS', type: 'Institución privada', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&partner=compuserviciosbcs' },


]

// Pantalla que muestra la red de organizaciones y aliados de la iniciativa.
function Socios() {
	return (
		<div id="socios" className="page-shell">
			<section className="page-header compact-hero">
				<div className="container">
					<span className="eyebrow">Red Nebula</span>
					<h1>Nuestros socios</h1>
					<p>Conoce a las instituciones y organizaciones que colaboran para ampliar el acceso al apoyo.</p>
				</div>
			</section>
			<section className="page-section">
				<div className="container">
					<div className="partners-carousel" aria-label="Socios de Nebula">
						<div className="partners-track">
							{[...partners, ...partners].map((partner, index) => (
								<a
									key={`${partner.name}-${index}`}
									className="partner-card"
									href={partner.url}
									target="_blank"
									rel="noreferrer"
									aria-hidden={index >= partners.length ? 'true' : undefined}
									tabIndex={index >= partners.length ? -1 : undefined}
									aria-label={`Conoce a ${partner.name}`}
								>
									<img src={defaultImage} alt="" />
									<div className="partner-card-content">
										<h3>{partner.name}</h3>
										<p>{partner.type}</p>
										<span>Colaboración activa</span>
									</div>
								</a>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Socios
