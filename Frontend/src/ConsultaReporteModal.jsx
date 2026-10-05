import { useEffect } from 'react'

// Modal de consulta por folio; el formulario aún no consulta una API.
function ConsultaReporteModal({ onClose }) {
  // Mantiene el foco visual en la consulta, restaura el scroll y permite cerrar con Escape.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    // El clic fuera cierra la ventana; los clics dentro se detienen en el diálogo.
    <div className="report-modal-backdrop" onClick={onClose}>
      <section
        className="report-modal lookup-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lookup-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="report-modal-close"
          onClick={onClose}
          aria-label="Cerrar consulta"
        >
          ×
        </button>

        <header className="report-modal-heading">
          <span className="lookup-modal-icon" aria-hidden="true">⌕</span>
          <div>
            <h2 id="lookup-modal-title">Consultar Estado por Folio</h2>
            <p>Introduce tu folio para verificar el avance sin revelar tu identidad.</p>
          </div>
        </header>

        {/* Formulario visual de consulta: el envío todavía no está conectado a un servicio. */}
        <form className="report-form lookup-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="lookup-folio">Folio único del reporte</label>
          <input
            id="lookup-folio"
            type="text"
            placeholder="Ej. NEB-ABC1234"
            autoComplete="off"
          />
          <button type="submit" className="report-submit-button">
            Consultar avance <span aria-hidden="true">⌕</span>
          </button>
        </form>
      </section>
    </div>
  )
}

export default ConsultaReporteModal
