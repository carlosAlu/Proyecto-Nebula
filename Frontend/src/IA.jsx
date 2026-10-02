// Vista dedicada a la evaluación de la IA, con un espacio para análisis o apoyo automatizado.
function IA() {
	return (
		<div className="page-shell ai-page-shell">
			{/* Explica el enfoque informativo y preventivo de esta pantalla. */}
			<section className="page-header compact-hero">
				<div className="container">
					<span className="eyebrow">Evaluación IA</span>
					<h1>Análisis seguro y orientado a la prevención</h1>
					<p>Un espacio para explorar indicadores, señales y recomendaciones con enfoque en apoyo, contención y seguridad.</p>
				</div>
			</section>

			{/* Muestra indicadores de referencia y los temas prioritarios de apoyo. */}
			<section className="page-section">
				<div className="container">
					<div className="ai-panel">
						<div className="ai-stat-card">
							<strong>92%</strong>
							<span>Índice de respuesta útil y clara</span>
						</div>
						<div className="ai-stat-card">
							<strong>24/7</strong>
							<span>Disponibilidad de orientación</span>
						</div>
						<div className="ai-stat-card">
							<strong>4.7/5</strong>
							<span>Satisfacción en atención inicial</span>
						</div>
					</div>

					<div className="ai-focus-card" style={{ marginTop: '24px' }}>
						<h3>Áreas de apoyo prioritarias</h3>
						<p>La IA puede ofrecer apoyo en identificación temprana, orientación informativa y acceso a recursos de prevención.</p>
						<ul className="ai-focus-list">
							<li>✅ Reconocimiento de señales de riesgo</li>
							<li>✅ Guía para buscar ayuda segura</li>
							<li>✅ Organización de información y recursos</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
	)
}

export default IA
