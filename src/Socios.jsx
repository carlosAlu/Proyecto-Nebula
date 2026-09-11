// Lista de socios e instituciones aliadas que apoyan la misión de Nebula.
const partners = [
	{ name: 'Centro Integral de Atención para la Mujer - Municipio de La Paz', type: 'Atención y orientación especializada' },
	{ name: 'Centro de Justicia Para Las Mujeres', type: 'Red de apoyo y canalización' },
    { name: 'Centro Mujeres', type: 'Red de apoyo y canalización' },
	{ name: 'Instituto Sudcaliforniano de las Mujeres', type: 'Red de apoyo y canalización' },
	{ name: 'Instituto Municipal de Las Mujeres', type: 'Red de apoyo y canalización' },
    { name: 'UNIVERSIDAD AUTÓNOMA DE BAJA CALIFORNIA SUR', type: 'Institución universitaria' },
    { name: 'COMPUSERVICIOSBCS', type: 'Institución privada' },


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
				<div className="container info-grid">
					{partners.map((partner) => (
						<article key={partner.name} className="info-card">
							<div className="card-icon">🤝</div>
							<h3>{partner.name}</h3>
							<p>{partner.type}</p>
							<span>Colaboración activa</span>
						</article>
					))}
				</div>
			</section>
		</div>
	)
}

export default Socios
