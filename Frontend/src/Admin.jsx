// Datos de presentación de las tarjetas; aquí se definen título, descripción e icono de cada módulo.
const adminOptions = [
	{ title: 'Gestionar recursos', description: 'Administra guías, rutas de atención y materiales preventivos.', icon: '📚' },
	{ title: 'Revisar solicitudes', description: 'Consulta y da seguimiento a las solicitudes de apoyo recibidas.', icon: '📝' },
	{ title: 'Red de colaboradores', description: 'Mantén actualizada la información de organizaciones aliadas.', icon: '🤝' },
]

// Estructura del panel: encabezado de administración seguido por la cuadrícula de módulos.
function Admin() {
	return (
		<div id="admin" className="page-shell">
			<section className="page-header compact-hero">
				<div className="container">
					<span className="eyebrow">Administración</span>
					<h1>Panel de gestión Nebula</h1>
					<p>Organiza los recursos y la información que mantiene activa nuestra red de apoyo.</p>
				</div>
			</section>
			<section className="page-section">
				<div className="container info-grid">
					{/* Genera una tarjeta por cada módulo administrativo disponible. */}
					{adminOptions.map((option) => (
						<article key={option.title} className="info-card">
							<div className="card-icon">{option.icon}</div>
							<h3>{option.title}</h3>
							<p>{option.description}</p>
							<button type="button" className="card-cta">Abrir módulo</button>
						</article>
					))}
				</div>
			</section>
		</div>
	)
}

export default Admin
