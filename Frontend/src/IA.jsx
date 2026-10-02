import { useEffect, useState } from 'react'

// Vista dedicada a la evaluación de la IA, con un espacio para análisis o apoyo automatizado.
function IA() {
	const [chatError, setChatError] = useState('')
	const [isChatReady, setIsChatReady] = useState(false)

	useEffect(() => {
		let isActive = true
		let chat
		const stylesheet = document.createElement('link')
		stylesheet.rel = 'stylesheet'
		stylesheet.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css'
		document.head.append(stylesheet)

		const loadChat = async () => {
			try {
				const [{ createChat }] = await Promise.all([
					import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js'),
					new Promise((resolve, reject) => {
						stylesheet.onload = resolve
						stylesheet.onerror = () => reject(new Error('No se pudieron cargar los estilos del asistente.'))
					}),
				])

				if (!isActive) return

				chat = createChat({
					webhookUrl: 'https://cjimenez20.app.n8n.cloud/webhook/908960a5-4aed-422f-8752-6851ecefd2d1/chat',
					target: '#nebula-ai-chat',
					mode: 'fullscreen',
					defaultLanguage: 'es',
					initialMessages: ['¡Hola! Me llamo Kara. Estoy aquí para escucharte.'],
					i18n: {
						es: {
							title: 'Asistente virtual',
							subtitle: 'Estoy aquí para ayudarte',
							inputPlaceholder: 'Escribe tu pregunta...',
							getStarted: 'Nueva conversación',
							footer: '',
						},
					},
				})
				setIsChatReady(true)
			} catch (error) {
				console.error('No se pudo cargar el asistente virtual de n8n.', error)
				if (isActive) setChatError('No se pudo cargar el asistente. Intenta recargar la página.')
			}
		}

		loadChat()

		return () => {
			isActive = false
			chat?.unmount()
			stylesheet.remove()
		}
	}, [])

	return (
		<div className="page-shell ai-page-shell">
			<section className="page-header ai-hero">
				<div className="container ai-hero-content">
					<div className="ai-hero-copy">
						<span className="eyebrow"><span aria-hidden="true">✦</span> Orientación virtual</span>
						<h1>Un espacio para hablar, <span>a tu ritmo.</span></h1>
						<p>
							Comparte tus dudas con nuestro asistente y recibe orientación para
							explorar tus opciones de apoyo.
						</p>
						<div className="ai-hero-note">
							<span aria-hidden="true">♡</span>
							No necesitas tener todas las respuestas para empezar.
						</div>
					</div>
					<div className="ai-hero-orbit" aria-hidden="true">
						<span>✧</span>
					</div>
				</div>
			</section>

			<section className="page-section ai-workspace">
				<div className="container ai-workspace-grid">
					<div className="ai-chat-column">
						<div className="ai-chat-heading">
							<div>
								<span className="ai-section-kicker">Tu conversación</span>
								<h2 id="ai-chat-heading">¿Qué te gustaría compartir?</h2>
							</div>
							<span className="ai-online-status">
								<span aria-hidden="true" />
								Asistente virtual
							</span>
						</div>
						<div className="ai-chat-frame">
							{!isChatReady && !chatError && (
								<div className="ai-chat-loading" role="status">
									<span className="ai-chat-spinner" aria-hidden="true" />
									<span>Preparando un espacio para ti…</span>
								</div>
							)}
							<div
								id="nebula-ai-chat"
								className="ai-chat-container"
								aria-label="Chat con el asistente virtual de Nebula"
							/>
						</div>
						{chatError && <p className="ai-chat-error" role="alert">{chatError}</p>}
						<p className="ai-chat-caption">
							El asistente ofrece información general; no sustituye el apoyo profesional.
						</p>
					</div>

					<aside className="ai-support-card" aria-labelledby="ai-support-heading">
						<div className="ai-support-icon" aria-hidden="true">✧</div>
						<span className="ai-section-kicker">Antes de conversar</span>
						<h2 id="ai-support-heading">Este espacio es para ti</h2>
						<p className="ai-support-intro">
							Comparte solo lo que te haga sentir cómoda. Puedes comenzar con una pregunta sencilla.
						</p>
						<div className="ai-support-divider" />
						<h3>Ten en cuenta</h3>
						<ul className="ai-support-list">
							<li><span aria-hidden="true">01</span><span>No incluyas nombres, direcciones ni datos personales.</span></li>
							<li><span aria-hidden="true">02</span><span>La orientación es informativa y no es un diagnóstico.</span></li>
							<li><span aria-hidden="true">03</span><span>Tú decides qué compartir y cuándo terminar.</span></li>
						</ul>
						<div className="ai-emergency-note">
							<strong>¿Estás en peligro inmediato?</strong>
							<p>Llama a emergencias para recibir ayuda urgente.</p>
							<a href="tel:911">Llamar al 911 <span aria-hidden="true">↗</span></a>
						</div>
					</aside>
				</div>
			</section>
		</div>
	)
}

export default IA
