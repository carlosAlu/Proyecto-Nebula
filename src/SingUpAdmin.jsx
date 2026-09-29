// Formulario de registro para nuevos administradores o colaboradores del proyecto.
function SingUpAdmin({ onBack, onLogin }) {
	return (
		<div className="admin-login-page admin-signup-page">
			<section className="admin-login-visual" aria-label="Registro administrativo Nebula">
				<div className="admin-login-orbit orbit-one" />
				<div className="admin-login-orbit orbit-two" />
				<div className="admin-login-visual-content">
					<span className="admin-login-mark">N</span>
					<span className="eyebrow">Administración Nebula</span>
					<h1>Construyamos una red de apoyo más fuerte.</h1>
					<p>
						Crea tu cuenta administrativa para colaborar en la actualización de
						recursos y servicios de la comunidad.
					</p>
					<div className="admin-login-status">
						<span className="live-dot" />
						<span>Registro seguro y confidencial</span>
					</div>
				</div>
			</section>

			<section className="admin-login-form-section">
				<div className="admin-login-form-wrap">
					<button type="button" className="admin-login-back" onClick={onBack}>
						<span aria-hidden="true">←</span> Volver al inicio
					</button>

					<div className="admin-login-heading">
						<span className="eyebrow">Crear cuenta</span>
						<h2>Únete al equipo</h2>
						<p>Registra tus datos para solicitar acceso al panel administrativo.</p>
					</div>

					{/* Evita el envío y la recarga del navegador; el registro aún no está conectado a un servicio. */}
					<form className="admin-login-form" onSubmit={(event) => event.preventDefault()}>
						<label htmlFor="admin-signup-name">Nombre completo</label>
						<input
							id="admin-signup-name"
							name="name"
							type="text"
							placeholder="Escribe tu nombre"
							autoComplete="name"
						/>

						<label htmlFor="admin-signup-email">Correo electrónico</label>
						<input
							id="admin-signup-email"
							name="email"
							type="email"
							placeholder="admin@nebula.org"
							autoComplete="email"
						/>

						<label htmlFor="admin-signup-password">Contraseña</label>
						<input
							id="admin-signup-password"
							name="password"
							type="password"
							placeholder="Crea una contraseña"
							autoComplete="new-password"
						/>

						<label htmlFor="admin-signup-confirm-password">Confirmar contraseña</label>
						<input
							id="admin-signup-confirm-password"
							name="confirmPassword"
							type="password"
							placeholder="Repite tu contraseña"
							autoComplete="new-password"
						/>

						<label className="admin-login-check">
							<input type="checkbox" name="terms" />
							<span>Acepto los términos de uso y privacidad</span>
						</label>

						<button type="submit" className="admin-login-submit">Crear cuenta</button>
					</form>

					<p className="admin-login-switch">
						¿Ya tienes una cuenta?{' '}
						<button type="button" onClick={onLogin}>Inicia sesión</button>
					</p>
				</div>
			</section>
		</div>
	)
}

export default SingUpAdmin