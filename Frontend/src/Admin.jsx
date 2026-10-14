import { useEffect, useRef, useState } from 'react'
import {
	createOrientationResource,
	deleteOrientationResource,
	getOrientationResources,
	updateOrientationResource,
} from './orientationResourcesApi.js'
import {
	deleteOrientationRequest,
	getOrientationRequests,
} from './orientationRequestsApi.js'
import { createPartner, deletePartner, getPartners, updatePartner } from './partnersApi.js'
import './Admin.css'

const resourceCategories = [
	{ id: 'sitios', title: 'Instituciones y apoyo', icon: '🧭' },
	{ id: 'multimedia', title: 'Videos y multimedia', icon: '▶️' },
	{ id: 'documentos', title: 'Guías y documentos', icon: '📄' },
]

const initialResourceForm = {
	category: 'sitios',
	title: '',
	description: '',
	source: '',
	url: '',
	type: 'link',
}

const initialPartnerForm = {
	name: '',
	type: '',
	url: '',
	image: '',
}

// Datos de presentación de las tarjetas; aquí se definen título, descripción e icono de cada módulo.
const adminOptions = [
	{ title: 'Gestionar recursos', description: 'Administra guías, multimedia de atención y materiales preventivos.', icon: '📚' },
	{ title: 'Revisar solicitudes', description: 'Consulta y da seguimiento a las solicitudes de apoyo recibidas.', icon: '📝' },
	{ title: 'Red de colaboradores', description: 'Mantén actualizada la información de organizaciones aliadas.', icon: '🤝' },
	{ title: 'Métricas', description: 'Accede a informes y análisis sobre el rendimiento de la plataforma.', icon: '📊' },
	{ title: 'Reportes anónimos', description: 'Seguimiento a reportes de ayuda enviados por usuarias', icon: '⚠️' },

]

function AdminEditModal({ title, onClose, children }) {
	const modalRef = useRef(null)
	const onCloseRef = useRef(onClose)

	useEffect(() => {
		onCloseRef.current = onClose
	}, [onClose])

	useEffect(() => {
		const previouslyFocused = document.activeElement
		const previousOverflow = document.body.style.overflow
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				onCloseRef.current()
				return
			}

			if (event.key !== 'Tab') return
			const focusableElements = modalRef.current?.querySelectorAll(
				'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]',
			)
			if (!focusableElements?.length) return

			const firstElement = focusableElements[0]
			const lastElement = focusableElements[focusableElements.length - 1]
			if (event.shiftKey && document.activeElement === firstElement) {
				event.preventDefault()
				lastElement.focus()
			} else if (!event.shiftKey && document.activeElement === lastElement) {
				event.preventDefault()
				firstElement.focus()
			}
		}

		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', handleKeyDown)
		modalRef.current?.querySelector('input, select, textarea')?.focus()

		return () => {
			document.body.style.overflow = previousOverflow
			window.removeEventListener('keydown', handleKeyDown)
			previouslyFocused?.focus()
		}
	}, [])

	return (
		<div className="admin-edit-modal-backdrop" onClick={onClose}>
			<section
				ref={modalRef}
				className="admin-edit-modal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="admin-edit-modal-title"
				tabIndex="-1"
				onClick={(event) => event.stopPropagation()}
			>
				<button
					type="button"
					className="admin-edit-modal-close"
					onClick={onClose}
					aria-label="Cerrar edición"
				>
					×
				</button>
				<h2 id="admin-edit-modal-title">{title}</h2>
				{children}
			</section>
		</div>
	)
}

// Estructura del panel: encabezado de administración seguido por la cuadrícula de módulos.
function Admin({ onLogout }) {
	const [isLoggingOut, setIsLoggingOut] = useState(false)
	const [logoutError, setLogoutError] = useState('')
	const [isManagingResources, setIsManagingResources] = useState(false)
	const [isManagingPartners, setIsManagingPartners] = useState(false)
	const [isManagingRequests, setIsManagingRequests] = useState(false)
	const [resources, setResources] = useState([])
	const [resourceForm, setResourceForm] = useState(initialResourceForm)
	const [editingResourceId, setEditingResourceId] = useState('')
	const [isLoadingResources, setIsLoadingResources] = useState(false)
	const [isSavingResource, setIsSavingResource] = useState(false)
	const [deletingResourceId, setDeletingResourceId] = useState('')
	const [resourceError, setResourceError] = useState('')
	const [resourceNotice, setResourceNotice] = useState('')
	const [partners, setPartners] = useState([])
	const [partnerForm, setPartnerForm] = useState(initialPartnerForm)
	const [editingPartnerId, setEditingPartnerId] = useState('')
	const [isLoadingPartners, setIsLoadingPartners] = useState(false)
	const [isSavingPartner, setIsSavingPartner] = useState(false)
	const [deletingPartnerId, setDeletingPartnerId] = useState('')
	const [partnerError, setPartnerError] = useState('')
	const [partnerNotice, setPartnerNotice] = useState('')
	const [orientationRequests, setOrientationRequests] = useState([])
	const [isLoadingRequests, setIsLoadingRequests] = useState(false)
	const [deletingRequestId, setDeletingRequestId] = useState('')
	const [requestError, setRequestError] = useState('')
	const [requestNotice, setRequestNotice] = useState('')

	useEffect(() => {
		if (!isManagingResources) return undefined

		let isMounted = true
		getOrientationResources()
			.then((loadedResources) => {
				if (isMounted) setResources(loadedResources)
			})
			.catch((error) => {
				if (isMounted) setResourceError(error.message)
			})
			.finally(() => {
				if (isMounted) setIsLoadingResources(false)
			})

		return () => { isMounted = false }
	}, [isManagingResources])

	useEffect(() => {
		if (!isManagingPartners) return undefined

		let isMounted = true
		getPartners()
			.then((loadedPartners) => {
				if (isMounted) setPartners(loadedPartners)
			})
			.catch((error) => {
				if (isMounted) setPartnerError(error.message)
			})
			.finally(() => {
				if (isMounted) setIsLoadingPartners(false)
			})

		return () => { isMounted = false }
	}, [isManagingPartners])

	useEffect(() => {
		if (!isManagingRequests) return undefined

		let isMounted = true
		getOrientationRequests()
			.then((loadedRequests) => {
				if (isMounted) setOrientationRequests(loadedRequests)
			})
			.catch((error) => {
				if (isMounted) setRequestError(error.message)
			})
			.finally(() => {
				if (isMounted) setIsLoadingRequests(false)
			})

		return () => { isMounted = false }
	}, [isManagingRequests])

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

	const handleAddResource = async (event) => {
		event.preventDefault()
		setIsSavingResource(true)
		setResourceError('')
		setResourceNotice('')

		try {
			const createdResource = await createOrientationResource(resourceForm)
			setResources((currentResources) => [...currentResources, createdResource])
			setResourceForm(initialResourceForm)
			setResourceNotice('El recurso se guardó correctamente.')
		} catch (error) {
			setResourceError(error.message)
		} finally {
			setIsSavingResource(false)
		}
	}

	const handleUpdateResource = async (event) => {
		event.preventDefault()
		setIsSavingResource(true)
		setResourceError('')
		setResourceNotice('')

		try {
			const updatedResource = await updateOrientationResource(editingResourceId, resourceForm)
			setResources((currentResources) => currentResources.map((item) => (
				item._id === editingResourceId ? updatedResource : item
			)))
			setResourceForm(initialResourceForm)
			setEditingResourceId('')
			setResourceNotice('El recurso se actualizó correctamente.')
		} catch (error) {
			setResourceError(error.message)
		} finally {
			setIsSavingResource(false)
		}
	}

	const startEditingResource = (resource) => {
		setResourceForm({
			category: resource.category,
			title: resource.title,
			description: resource.description,
			source: resource.source,
			url: resource.url,
			type: resource.type,
		})
		setEditingResourceId(resource._id)
		setResourceError('')
		setResourceNotice('')
	}

	const cancelEditingResource = () => {
		setResourceForm(initialResourceForm)
		setEditingResourceId('')
		setResourceError('')
		setResourceNotice('')
	}

	const handleDeleteResource = async (resource) => {
		if (!window.confirm(`¿Eliminar "${resource.title}"? Esta acción no se puede deshacer.`)) return

		setDeletingResourceId(resource._id)
		setResourceError('')
		setResourceNotice('')
		try {
			await deleteOrientationResource(resource._id)
			setResources((currentResources) => currentResources.filter((item) => item._id !== resource._id))
			if (editingResourceId === resource._id) cancelEditingResource()
			setResourceNotice('El recurso se eliminó correctamente.')
		} catch (error) {
			setResourceError(error.message)
		} finally {
			setDeletingResourceId('')
		}
	}

	const openResourceManager = () => {
		setIsLoadingResources(true)
		setResourceError('')
		setResourceNotice('')
		setIsManagingResources(true)
	}

	const handleAddPartner = async (event) => {
		event.preventDefault()
		setIsSavingPartner(true)
		setPartnerError('')
		setPartnerNotice('')

		try {
			const createdPartner = await createPartner(partnerForm)
			setPartners((currentPartners) => [...currentPartners, createdPartner])
			setPartnerForm(initialPartnerForm)
			setPartnerNotice('La organización colaboradora se guardó correctamente.')
		} catch (error) {
			setPartnerError(error.message)
		} finally {
			setIsSavingPartner(false)
		}
	}

	const handleUpdatePartner = async (event) => {
		event.preventDefault()
		setIsSavingPartner(true)
		setPartnerError('')
		setPartnerNotice('')

		try {
			const updatedPartner = await updatePartner(editingPartnerId, partnerForm)
			setPartners((currentPartners) => currentPartners.map((item) => (
				item._id === editingPartnerId ? updatedPartner : item
			)))
			setPartnerForm(initialPartnerForm)
			setEditingPartnerId('')
			setPartnerNotice('La organización colaboradora se actualizó correctamente.')
		} catch (error) {
			setPartnerError(error.message)
		} finally {
			setIsSavingPartner(false)
		}
	}

	const startEditingPartner = (partner) => {
		setPartnerForm({
			name: partner.name,
			type: partner.type,
			url: partner.url,
			image: partner.image || '',
		})
		setEditingPartnerId(partner._id)
		setPartnerError('')
		setPartnerNotice('')
	}

	const cancelEditingPartner = () => {
		setPartnerForm(initialPartnerForm)
		setEditingPartnerId('')
		setPartnerError('')
		setPartnerNotice('')
	}

	const handleDeletePartner = async (partner) => {
		if (!window.confirm(`¿Eliminar a "${partner.name}" de la red de colaboradores? Esta acción no se puede deshacer.`)) return

		setDeletingPartnerId(partner._id)
		setPartnerError('')
		setPartnerNotice('')
		try {
			await deletePartner(partner._id)
			setPartners((currentPartners) => currentPartners.filter((item) => item._id !== partner._id))
			if (editingPartnerId === partner._id) cancelEditingPartner()
			setPartnerNotice('La organización colaboradora se eliminó correctamente.')
		} catch (error) {
			setPartnerError(error.message)
		} finally {
			setDeletingPartnerId('')
		}
	}

	const openPartnerManager = () => {
		setIsLoadingPartners(true)
		setPartnerError('')
		setPartnerNotice('')
		setIsManagingPartners(true)
	}

	const handleDeleteRequest = async (orientationRequest) => {
		if (!window.confirm('¿Eliminar este mensaje? Esta acción no se puede deshacer.')) return

		setDeletingRequestId(orientationRequest._id)
		setRequestError('')
		setRequestNotice('')
		try {
			await deleteOrientationRequest(orientationRequest._id)
			setOrientationRequests((currentRequests) => currentRequests.filter(
				(item) => item._id !== orientationRequest._id,
			))
			setRequestNotice('El mensaje se eliminó correctamente.')
		} catch (error) {
			setRequestError(error.message)
		} finally {
			setDeletingRequestId('')
		}
	}

	const openRequestManager = () => {
		setIsLoadingRequests(true)
		setRequestError('')
		setRequestNotice('')
		setIsManagingRequests(true)
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
				{isManagingResources || isManagingPartners || isManagingRequests ? (
					<div className="container admin-resource-manager">
						<div className="admin-resource-manager-heading">
							<div>
								<span className="eyebrow">Administración de contenido</span>
								<h2>
									{isManagingRequests
										? 'Solicitudes de orientación'
										: isManagingPartners ? 'Red de colaboradores' : 'Gestionar recursos'}
								</h2>
								<p>
									{isManagingRequests
										? 'Consulta los mensajes recibidos y los datos de contacto para responder a cada persona.'
										: isManagingPartners
											? 'Los cambios se guardan en MongoDB y se reflejan en el directorio público.'
											: 'Los cambios se guardan en MongoDB y se reflejan en la sección pública de recursos.'}
								</p>
							</div>
							<button
								type="button"
								className="admin-resource-back"
								onClick={() => {
									setIsManagingResources(false)
									setIsManagingPartners(false)
									setIsManagingRequests(false)
								}}
							>
								← Volver al panel
							</button>
						</div>

						{(isManagingRequests ? requestError : isManagingPartners ? partnerError : resourceError) && (
							<p className="admin-resource-message is-error" role="alert">
								{isManagingRequests ? requestError : isManagingPartners ? partnerError : resourceError}
							</p>
						)}
						{(isManagingRequests ? requestNotice : isManagingPartners ? partnerNotice : resourceNotice) && (
							<p className="admin-resource-message is-success" role="status">
								{isManagingRequests ? requestNotice : isManagingPartners ? partnerNotice : resourceNotice}
							</p>
						)}
						{isLoadingResources || isLoadingPartners || isLoadingRequests ? (
							<p className="admin-resource-loading" role="status">
								{isManagingRequests
									? 'Cargando solicitudes…'
									: isManagingPartners ? 'Cargando colaboradores…' : 'Cargando recursos…'}
							</p>
						) : isManagingRequests ? (
							orientationRequests.length ? (
								<ul className="admin-orientation-request-list">
									{orientationRequests.map((orientationRequest) => (
										<li className="admin-orientation-request" key={orientationRequest._id}>
											<div className="admin-orientation-request-content">
												<div className="admin-orientation-request-heading">
													<strong>{orientationRequest.name || 'Sin nombre o alias'}</strong>
													<time dateTime={orientationRequest.createdAt}>
														{new Date(orientationRequest.createdAt).toLocaleString('es-MX')}
													</time>
												</div>
												<a href={`mailto:${orientationRequest.email}`}>{orientationRequest.email}</a>
												{orientationRequest.phone && (
													<a href={`tel:${orientationRequest.phone}`}>{orientationRequest.phone}</a>
												)}
												<p>{orientationRequest.message}</p>
											</div>
											<button
												type="button"
												className="admin-resource-delete"
												onClick={() => handleDeleteRequest(orientationRequest)}
												disabled={deletingRequestId === orientationRequest._id}
											>
												{deletingRequestId === orientationRequest._id ? 'Eliminando…' : 'Eliminar'}
											</button>
										</li>
									))}
								</ul>
							) : requestError ? null : (
								<p className="admin-resource-empty">No hay solicitudes de orientación.</p>
							)
						) : isManagingPartners ? (
							<>
								{partners.length ? (
									<div className="admin-resource-groups">
										<section className="admin-resource-group">
											<header>
												<span aria-hidden="true">🤝</span>
												<h3>Colaboradores</h3>
												<span className="admin-resource-count">{partners.length}</span>
											</header>
											<ul>
												{partners.map((partner) => (
													<li key={partner._id}>
														<div className="admin-resource-details">
															<strong>{partner.name}</strong>
															<span>{partner.type}</span>
															<a href={partner.url} target="_blank" rel="noreferrer">{partner.url}</a>
															{partner.image && <span>Imagen: {partner.image}</span>}
														</div>
														<div className="admin-resource-actions">
															<button
																type="button"
																className="admin-resource-edit"
																onClick={() => startEditingPartner(partner)}
															>
																Editar
															</button>
															<button
																type="button"
																className="admin-resource-delete"
																onClick={() => handleDeletePartner(partner)}
																disabled={deletingPartnerId === partner._id}
															>
																{deletingPartnerId === partner._id ? 'Eliminando…' : 'Eliminar'}
															</button>
														</div>
													</li>
												))}
											</ul>
										</section>
									</div>
								) : (
									<p className="admin-resource-empty">No hay organizaciones colaboradoras registradas.</p>
								)}

								<form className="admin-resource-form" onSubmit={handleAddPartner}>
									<h3>Agregar colaborador</h3>
									<div className="admin-resource-form-grid">
										<label>
											Nombre de la organización
											<input
												required
												maxLength="150"
												value={partnerForm.name}
												onChange={(event) => setPartnerForm({ ...partnerForm, name: event.target.value })}
											/>
										</label>
										<label>
											Tipo de colaboración
											<input
												required
												maxLength="100"
												placeholder="Ej. Atención y orientación especializada"
												value={partnerForm.type}
												onChange={(event) => setPartnerForm({ ...partnerForm, type: event.target.value })}
											/>
										</label>
										<label className="admin-resource-form-wide">
											Sitio web o enlace
											<input
												required
												type="url"
												maxLength="2048"
												placeholder="https://…"
												value={partnerForm.url}
												onChange={(event) => setPartnerForm({ ...partnerForm, url: event.target.value })}
											/>
										</label>
										<label className="admin-resource-form-wide">
											URL de imagen (opcional)
											<input
												type="url"
												maxLength="2048"
												placeholder="https://…"
												value={partnerForm.image}
												onChange={(event) => setPartnerForm({ ...partnerForm, image: event.target.value })}
											/>
										</label>
									</div>
									<button type="submit" className="admin-resource-submit" disabled={isSavingPartner}>
										{isSavingPartner ? 'Guardando…' : 'Agregar colaborador'}
									</button>
								</form>
							</>
						) : (
							<div className="admin-resource-groups">
								{resourceCategories.map((category) => {
									const categoryResources = resources.filter((resource) => resource.category === category.id)
									return (
										<section className="admin-resource-group" key={category.id}>
											<header>
												<span aria-hidden="true">{category.icon}</span>
												<h3>{category.title}</h3>
												<span className="admin-resource-count">{categoryResources.length}</span>
											</header>
											{categoryResources.length ? (
												<ul>
													{categoryResources.map((resource) => (
														<li key={resource._id}>
															<div className="admin-resource-details">
																<strong>{resource.title}</strong>
																<span>{resource.source} · {resource.type}</span>
																<a href={resource.url} target="_blank" rel="noreferrer">{resource.url}</a>
															</div>
															<div className="admin-resource-actions">
																<button
																	type="button"
																	className="admin-resource-edit"
																	onClick={() => startEditingResource(resource)}
																>
																	Editar
																</button>
																<button
																	type="button"
																	className="admin-resource-delete"
																	onClick={() => handleDeleteResource(resource)}
																	disabled={deletingResourceId === resource._id}
																>
																	{deletingResourceId === resource._id ? 'Eliminando…' : 'Eliminar'}
																</button>
															</div>
														</li>
													))}
												</ul>
											) : (
												<p className="admin-resource-empty">No hay recursos en esta categoría.</p>
											)}
										</section>
									)
								})}
							</div>
						)}

						{!isManagingPartners && !isManagingRequests && <form className="admin-resource-form" onSubmit={handleAddResource}>
							<h3>Agregar recurso</h3>
							<div className="admin-resource-form-grid">
								<label>
									Tipo de recurso
									<select
										value={resourceForm.category}
										onChange={(event) => setResourceForm({ ...resourceForm, category: event.target.value })}
									>
										{resourceCategories.map((category) => (
											<option value={category.id} key={category.id}>{category.title}</option>
										))}
									</select>
								</label>
								<label>
									Formato
									<select
										value={resourceForm.type}
										onChange={(event) => setResourceForm({ ...resourceForm, type: event.target.value })}
									>
										<option value="link">Sitio web</option>
										<option value="video">Video de YouTube</option>
										<option value="pdf">Documento o PDF</option>
									</select>
								</label>
								<label>
									Título
									<input
										required
										maxLength="120"
										value={resourceForm.title}
										onChange={(event) => setResourceForm({ ...resourceForm, title: event.target.value })}
									/>
								</label>
								<label>
									Fuente
									<input
										required
										maxLength="120"
										value={resourceForm.source}
										onChange={(event) => setResourceForm({ ...resourceForm, source: event.target.value })}
									/>
								</label>
								<label className="admin-resource-form-wide">
									Descripción
									<textarea
										required
										maxLength="500"
										rows="3"
										value={resourceForm.description}
										onChange={(event) => setResourceForm({ ...resourceForm, description: event.target.value })}
									/>
								</label>
								<label className="admin-resource-form-wide">
									URL
									<input
										required
										type="url"
										maxLength="2048"
										placeholder={resourceForm.type === 'video' ? 'https://youtu.be/…' : 'https://…'}
										value={resourceForm.url}
										onChange={(event) => setResourceForm({ ...resourceForm, url: event.target.value })}
									/>
									{resourceForm.type === 'video' && <span className="admin-resource-hint">Los videos deben estar publicados en YouTube.</span>}
								</label>
							</div>
							<button type="submit" className="admin-resource-submit" disabled={isSavingResource}>
								{isSavingResource ? 'Guardando…' : 'Agregar recurso'}
							</button>
						</form>}
					</div>
				) : (
					<div className="container info-grid">
						{adminOptions.map((option) => (
							<article key={option.title} className="info-card">
								<div className="card-icon">{option.icon}</div>
								<h3>{option.title}</h3>
								<p>{option.description}</p>
								<button
									type="button"
									className="card-cta"
									onClick={() => {
										if (option.title === 'Gestionar recursos') openResourceManager()
										if (option.title === 'Revisar solicitudes') openRequestManager()
										if (option.title === 'Red de colaboradores') openPartnerManager()
									}}
								>
									Abrir módulo
								</button>
							</article>
						))}
					</div>
				)}
			</section>
			{isManagingResources && editingResourceId && (
				<AdminEditModal title="Editar recurso" onClose={cancelEditingResource}>
					{resourceError && <p className="admin-resource-message is-error" role="alert">{resourceError}</p>}
					<form className="admin-resource-form admin-edit-modal-form" onSubmit={handleUpdateResource}>
						<div className="admin-resource-form-grid">
							<label>
								Tipo de recurso
								<select
									value={resourceForm.category}
									onChange={(event) => setResourceForm({ ...resourceForm, category: event.target.value })}
								>
									{resourceCategories.map((category) => (
										<option value={category.id} key={category.id}>{category.title}</option>
									))}
								</select>
							</label>
							<label>
								Formato
								<select
									value={resourceForm.type}
									onChange={(event) => setResourceForm({ ...resourceForm, type: event.target.value })}
								>
									<option value="link">Sitio web</option>
									<option value="video">Video de YouTube</option>
									<option value="pdf">Documento o PDF</option>
								</select>
							</label>
							<label>
								Título
								<input
									required
									maxLength="120"
									value={resourceForm.title}
									onChange={(event) => setResourceForm({ ...resourceForm, title: event.target.value })}
								/>
							</label>
							<label>
								Fuente
								<input
									required
									maxLength="120"
									value={resourceForm.source}
									onChange={(event) => setResourceForm({ ...resourceForm, source: event.target.value })}
								/>
							</label>
							<label className="admin-resource-form-wide">
								Descripción
								<textarea
									required
									maxLength="500"
									rows="3"
									value={resourceForm.description}
									onChange={(event) => setResourceForm({ ...resourceForm, description: event.target.value })}
								/>
							</label>
							<label className="admin-resource-form-wide">
								URL
								<input
									required
									type="url"
									maxLength="2048"
									placeholder={resourceForm.type === 'video' ? 'https://youtu.be/…' : 'https://…'}
									value={resourceForm.url}
									onChange={(event) => setResourceForm({ ...resourceForm, url: event.target.value })}
								/>
								{resourceForm.type === 'video' && <span className="admin-resource-hint">Los videos deben estar publicados en YouTube.</span>}
							</label>
						</div>
						<div className="admin-edit-modal-actions">
							<button type="button" className="admin-resource-cancel" onClick={cancelEditingResource}>
								Cancelar
							</button>
							<button type="submit" className="admin-resource-submit" disabled={isSavingResource}>
								{isSavingResource ? 'Guardando…' : 'Guardar cambios'}
							</button>
						</div>
					</form>
				</AdminEditModal>
			)}
			{isManagingPartners && editingPartnerId && (
				<AdminEditModal title="Editar colaborador" onClose={cancelEditingPartner}>
					{partnerError && <p className="admin-resource-message is-error" role="alert">{partnerError}</p>}
					<form className="admin-resource-form admin-edit-modal-form" onSubmit={handleUpdatePartner}>
						<div className="admin-resource-form-grid">
							<label>
								Nombre de la organización
								<input
									required
									maxLength="150"
									value={partnerForm.name}
									onChange={(event) => setPartnerForm({ ...partnerForm, name: event.target.value })}
								/>
							</label>
							<label>
								Tipo de colaboración
								<input
									required
									maxLength="100"
									value={partnerForm.type}
									onChange={(event) => setPartnerForm({ ...partnerForm, type: event.target.value })}
								/>
							</label>
							<label className="admin-resource-form-wide">
								Sitio web o enlace
								<input
									required
									type="url"
									maxLength="2048"
									value={partnerForm.url}
									onChange={(event) => setPartnerForm({ ...partnerForm, url: event.target.value })}
								/>
							</label>
							<label className="admin-resource-form-wide">
								URL de imagen (opcional)
								<input
									type="url"
									maxLength="2048"
									value={partnerForm.image}
									onChange={(event) => setPartnerForm({ ...partnerForm, image: event.target.value })}
								/>
							</label>
						</div>
						<div className="admin-edit-modal-actions">
							<button type="button" className="admin-resource-cancel" onClick={cancelEditingPartner}>
								Cancelar
							</button>
							<button type="submit" className="admin-resource-submit" disabled={isSavingPartner}>
								{isSavingPartner ? 'Guardando…' : 'Guardar cambios'}
							</button>
						</div>
					</form>
				</AdminEditModal>
			)}
		</div>
	)
}

export default Admin
