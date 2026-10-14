import { useEffect, useState } from 'react'
import defaultImage from './assets/ImagenDefault.jpg'
import { getPartners } from './partnersApi.js'

function Socios() {
	const [partners, setPartners] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		let isMounted = true
		getPartners()
			.then((loadedPartners) => {
				if (isMounted) setPartners(loadedPartners)
			})
			.catch((loadError) => {
				if (isMounted) setError(loadError.message)
			})
			.finally(() => {
				if (isMounted) setIsLoading(false)
			})

		return () => { isMounted = false }
	}, [])

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
					{isLoading && <p className="partner-directory-status" role="status">Cargando colaboradores…</p>}
					{error && <p className="partner-directory-error" role="alert">{error}</p>}
					{!isLoading && !error && partners.length === 0 && (
						<p className="partner-directory-status">Aún no hay organizaciones colaboradoras registradas.</p>
					)}
					<div className="partners-grid">
						{partners.map((partner) => (
							<a
								key={partner._id}
								className="partner-card"
								href={partner.url}
								target="_blank"
								rel="noreferrer"
								aria-label={`Conoce a ${partner.name}`}
							>
								<img
									src={partner.image || defaultImage}
									alt=""
									onError={(event) => {
										event.currentTarget.onerror = null
										event.currentTarget.src = defaultImage
									}}
								/>
								<div className="partner-card-content">
									<h3>{partner.name}</h3>
									<p>{partner.type}</p>
									<span>Colaboración activa</span>
								</div>
							</a>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}

export default Socios
