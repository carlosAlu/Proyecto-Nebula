import { useEffect, useState } from 'react'
import { getAnonymousReportStatus } from './anonymousReportsApi.js'

function ConsultaReporteModal({ onClose }) {
  const [folio, setFolio] = useState('')
  const [report, setReport] = useState(null)
  const [error, setError] = useState('')
  const [isSearching, setIsSearching] = useState(false)

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSearching(true)
    setError('')
    setReport(null)

    try {
      const result = await getAnonymousReportStatus(folio.trim().toUpperCase())
      setReport(result)
    } catch (searchError) {
      setError(searchError.message)
    } finally {
      setIsSearching(false)
    }
  }

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

        <form className="report-form lookup-form" onSubmit={handleSubmit}>
          <label htmlFor="lookup-folio">Folio único del reporte</label>
          <input
            id="lookup-folio"
            type="text"
            placeholder="Ej. NEB-ABC123..."
            maxLength="28"
            autoComplete="off"
            value={folio}
            onChange={(event) => setFolio(event.target.value)}
            required
          />
          {error && <p className="report-form-message is-error" role="alert">{error}</p>}
          <button type="submit" className="report-submit-button" disabled={isSearching}>
            {isSearching ? 'Consultando…' : 'Consultar avance'} <span aria-hidden="true">⌕</span>
          </button>
        </form>
        {report && (
          <section className="report-status-result" aria-live="polite">
            <span>Folio {report.folio}</span>
            <h3>{report.status}</h3>
            <p>Última actualización: {new Date(report.updatedAt).toLocaleString('es-MX')}</p>
          </section>
        )}
      </section>
    </div>
  )
}

export default ConsultaReporteModal
