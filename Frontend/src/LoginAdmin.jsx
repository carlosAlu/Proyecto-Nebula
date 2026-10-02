// Formulario de acceso para administradores del sistema Nebula.
function LoginAdmin({ onBack, onSignup }) {

	return (
		<div className="admin-login-page">
			{/* Panel visual que identifica la zona protegida de administración. */}
			<section className="admin-login-visual" aria-label="Acceso administrativo Nebula">
				<div className="admin-login-orbit orbit-one" />
				<div className="admin-login-orbit orbit-two" />
				<div className="admin-login-visual-content">
					<span className="admin-login-mark">N</span>
					<span className="eyebrow">Zona protegida</span>
					<h1>Gestión que mantiene activa la red de apoyo.</h1>
					<p>
						Ingresa al espacio administrativo de Nebula para mantener actualizados
						los recursos y servicios de la comunidad.
					</p>
					<div className="admin-login-status">
						<span className="live-dot" />
						<span>Acceso seguro y confidencial</span>
					</div>
				</div>
			</section>

			{/* Formulario de acceso y enlaces para volver o iniciar el registro. */}
			<section className="admin-login-form-section">
				<div className="admin-login-form-wrap">
					<button type="button" className="admin-login-back" onClick={onBack}>
						<span aria-hidden="true">←</span> Volver al inicio
					</button>

					<div className="admin-login-heading">
						<span className="eyebrow">Administración</span>
						<h2>Bienvenido de nuevo</h2>
						<p>Ingresa tus datos para continuar al panel de gestión.</p>
					</div>

					{/* Evita el envío y la recarga del navegador; aquí aún no se conecta la autenticación. */}
					<form className="admin-login-form" onSubmit={(event) => event.preventDefault()}>
						<label htmlFor="admin-email">Correo electrónico</label>
						<input
							id="admin-email"
							name="email"
							type="email"
							placeholder="admin@nebula.org"
							autoComplete="username"
						/>

						<div className="admin-login-label-row">
							<label htmlFor="admin-password">Contraseña</label>
							<button type="button" className="admin-login-recovery">¿Olvidaste tu contraseña?</button>
						</div>
						<input
							id="admin-password"
							name="password"
							type="password"
							placeholder="Ingresa tu contraseña"
							autoComplete="current-password"
						/>

						<label className="admin-login-check">
							<input type="checkbox" name="remember" />
							<span>Recordar sesión en este dispositivo</span>
						</label>

						<button type="submit" className="admin-login-submit">Entrar al panel</button>
					</form>

					<p className="admin-login-note">
						<span aria-hidden="true">🔒</span> Tus datos se mantienen protegidos.
					</p>

					<p className="admin-login-switch">
						Crear Cuenta{' '}
						<button type="button" onClick={onSignup}>Crear aquí</button>
					</p>
				</div>
			</section>
		</div>
	)
}

export default LoginAdmin