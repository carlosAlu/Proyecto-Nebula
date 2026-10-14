import { useEffect, useRef, useState } from 'react'
import './RecursosOrientacion.css'
import { getOrientationResources } from './orientationResourcesApi.js'

const resourceCategories = [
  {
    id: 'sitios',
    title: 'Webs y apoyo',
    description: 'Webs y servicios para conocer tus derechos y encontrar orientación.',
    icon: '🧭',
    items: [],
  },
  {
    id: 'multimedia',
    title: 'Videos y multimedia',
    description: 'Videos para reflexionar, reconocer señales y promover relaciones respetuosas.',
    icon: '▶️',
    items: [],
  },
  {
    id: 'documentos',
    title: 'Guías y documentos',
    description: 'Materiales de consulta para identificar señales de violencia y buscar orientación.',
    icon: '📄',
    items: [],
  },
]

function RecursosModal({ category, onClose }) {
  const [preview, setPreview] = useState(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const modal = document.querySelector('.resource-modal')
        const focusableElements = modal?.querySelectorAll(
          'button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])',
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
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [onClose])

  const previewUrl = preview?.type === 'video' ? preview.embedUrl : preview?.url

  return (
    <div
      className="resource-modal-backdrop"
      onClick={onClose}
    >
      <section
        className={`resource-modal${preview ? ' has-preview' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resource-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="resource-modal-close"
          onClick={onClose}
          aria-label="Cerrar recursos"
        >
          ×
        </button>

        {preview ? (
          <>
            <header className="resource-modal-heading">
              <button
                type="button"
                className="resource-back-button"
                onClick={() => setPreview(null)}
              >
                <span aria-hidden="true">←</span> Volver a recursos
              </button>
              <p className="resource-source">{preview.source}</p>
              <h2 id="resource-modal-title">{preview.title}</h2>
            </header>
            <div className={`resource-preview-frame ${preview.type === 'pdf' ? 'is-document' : 'is-video'}`}>
              <iframe
                key={previewUrl}
                src={previewUrl}
                title={preview.title}
                allow={preview.type === 'video' ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' : undefined}
                allowFullScreen={preview.type === 'video'}
              />
            </div>
            <a className="resource-open-link" href={preview.url} target="_blank" rel="noreferrer">
              Abrir en una pestaña nueva <span aria-hidden="true">↗</span>
            </a>
          </>
        ) : (
          <>
            <header className="resource-modal-heading">
              <span className="resource-modal-icon" aria-hidden="true">{category.icon}</span>
              <div>
                <p className="resource-source">Recursos de orientación</p>
                <h2 id="resource-modal-title">{category.title}</h2>
                <p>{category.description}</p>
              </div>
            </header>
            <div className="resource-list">
              {category.items.length ? category.items.map((item) => (
                <article className="resource-item" key={item.url}>
                  <div className="resource-item-content">
                    <p className="resource-source">{item.source}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="resource-item-actions">
                    {item.type !== 'link' && (
                      <button
                        type="button"
                        className="resource-preview-button"
                        onClick={() => setPreview(item)}
                      >
                        {item.type === 'video' ? 'Ver video' : 'Vista previa'}
                      </button>
                    )}
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.type === 'link' ? 'Visitar sitio' : 'Abrir recurso'}
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  </div>
                </article>
              )) : <p className="resource-load-status">Aún no hay recursos disponibles en esta categoría.</p>}
            </div>
            <p className="resource-safety-note">
              Si estás en peligro inmediato, busca un lugar seguro y llama al 911.
            </p>
          </>
        )}
      </section>
    </div>
  )
}

function RecursosOrientacion() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [categories, setCategories] = useState(resourceCategories)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let isMounted = true
    getOrientationResources()
      .then((resources) => {
        if (!isMounted) return
        setCategories(resourceCategories.map((category) => ({
          ...category,
          items: resources.filter((resource) => resource.category === category.id),
        })))
      })
      .catch((error) => {
        if (isMounted) setLoadError(error.message)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => { isMounted = false }
  }, [])

  return (
    <div className="page-shell resources-page">
      <section className="page-header compact-hero">
        <div className="container">
          <span className="eyebrow">Recursos de orientación</span>
          <h1>Webs, Multimedia y Documentos</h1>
          <p>
            Explora información confiable, videos y materiales de consulta sobre prevención
            y atención de la violencia de género. Selecciona una categoría para ver sus recursos.
          </p>
        </div>
      </section>

      <section className="page-section resources-section">
        <div className="container">
          <div className="resources-intro">
            <span className="resources-intro-icon" aria-hidden="true">✦</span>
            <p>La información es un primer paso. No tienes que enfrentar una situación de violencia en soledad.</p>
          </div>
          {isLoading && <p className="resource-load-status" role="status">Cargando recursos…</p>}
          {loadError && <p className="resource-load-error" role="alert">{loadError}</p>}
          <div className="info-grid resources-grid">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                className="info-card resource-category-card"
                onClick={() => setActiveCategory(category)}
                aria-haspopup="dialog"
              >
                <span className="card-icon" aria-hidden="true">{category.icon}</span>
                <span className="resource-category-count">
                  {category.items.length} {category.items.length === 1 ? 'recurso' : 'recursos'}
                </span>
                <span className="resource-category-title">{category.title}</span>
                <span className="resource-category-description">{category.description}</span>
                <span className="resource-category-cta">Explorar recursos <span aria-hidden="true">→</span></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeCategory && (
        <RecursosModal
          category={activeCategory}
          onClose={() => setActiveCategory(null)}
        />
      )}
    </div>
  )
}

export default RecursosOrientacion
