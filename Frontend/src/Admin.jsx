import { useState } from 'react'

// Datos de presentación de las tarjetas; aquí se definen título, descripción e icono de cada módulo.
const adminOptions = [
	{ title: 'Gestionar recursos', description: 'Administra guías, rutas de atención y materiales preventivos.', icon: '📚' },
	{ title: 'Revisar solicitudes', description: 'Consulta y da seguimiento a las solicitudes de apoyo recibidas.', icon: '📝' },
	{ title: 'Red de colaboradores', description: 'Mantén actualizada la información de organizaciones aliadas.', icon: '🤝' },
]

// Estructura del panel: encabezado de administración seguido por la cuadrícula de módulos.
function Admin({ onLogout }) {
	// Controla el estado del cierre remoto y permite comunicar errores al usuario.
	const [isLoggingOut, setIsLoggingOut] = useState(false)
	const [logoutError, setLogoutError] = useState('')

	// Cierra la sesión usando el callback de la aplicación y conserva el error si falla.
	const handleLogout = async () => {
		setIsLoggingOut(true)
		setLogoutError('')
		try {
			await onLogout()
		} catch (error) {
			setLogoutError(error.message)
		} finally {
			setIsLoggingOut(false)
		}
	}

	return (
		<div id="admin" className="page-shell">
			<section className="page-header compact-hero">
				<div className="container">
					<span className="eyebrow">Administración</span>
					<h1>Panel de gestión Nebula</h1>
					<p>Organiza los recursos y la información que mantiene activa nuestra red de apoyo.</p>
					<button type="button" className="admin-logout-button" onClick={handleLogout} disabled={isLoggingOut}>
						{isLoggingOut ? 'Cerrando sesión…' : 'Cerrar sesión'}
					</button>
					{logoutError && <p className="admin-auth-error" role="alert">{logoutError}</p>}
				</div>
			</section>
			<section className="page-section">
				<div className="container info-grid">
					{/* Genera tarjetas de ejemplo; los módulos aún no ejecutan gestión de datos. */}
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
