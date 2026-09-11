// Página de ayuda general que agrupa acceso rápido a líneas, centros y rutas legales.
function Ayuda() {
	return (
		<div id="ayuda" className="page-shell">
			<section className="page-header compact-hero">
				<div className="container">
					<span className="eyebrow">Centro de ayuda</span>
					<h1>Encuentra orientación y apoyo</h1>
					<p>Accede rápidamente a líneas de escucha, centros de atención y rutas legales.</p>
				</div>
			</section>
			<section className="page-section">
				<div className="container info-grid">
					<article className="info-card">
						<div className="card-icon">📍</div>
						<h3>Centros de atención</h3>
						<p>Ubica instituciones y refugios cercanos para recibir acompañamiento especializado.</p>
						<a href="tel:8001084053" className="btn-secondary">Llamar 800-108-4053</a>
					</article>
					<article className="info-card">
						<div className="card-icon">📞</div>
						<h3>Líneas de escucha</h3>
						<p>Habla con una persona orientadora de forma confidencial y segura.</p>
						<a href="tel:075" className="btn-secondary">Llamar línea 075</a>
					</article>
					<article className="info-card">
						<div className="card-icon">⚖️</div>
						<h3>Rutas legales</h3>
						<p>Consulta información sobre derechos y opciones para actuar ante una situación de violencia.</p>
					</article>
				</div>
			</section>
		</div>
	)
}

export default Ayuda
