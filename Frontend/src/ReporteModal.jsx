import { useEffect, useState } from 'react'

// Modal de captura demostrativa; todavía no envía reportes a un servidor.
function ReporteModal({ onClose }) {
  // Alterna el formulario con un mensaje de confirmación de ejemplo.
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Bloquea el scroll de fondo mientras el diálogo está abierto y habilita Escape para cerrarlo.
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
    // Cerrar al pulsar el fondo, pero no al interactuar con el contenido del diálogo.
    <div className="report-modal-backdrop" onClick={onClose}>
      <section
        className="report-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="report-modal-close"
          onClick={onClose}
          aria-label="Cerrar reporte"
        >
          ×
        </button>

        <header className="report-modal-heading">
          <span className="report-modal-icon" aria-hidden="true">♢</span>
          <div>
            <h2 id="report-modal-title">Crear Reporte Anónimo</h2>
            <p>Tu privacidad es prioritaria. No requiere cuenta.</p>
          </div>
        </header>

        {/* Alterna entre el formulario y una confirmación de ejemplo; no realiza un envío real. */}
        {showConfirmation ? (
          <div className="report-confirmation" aria-live="polite">
            <span className="report-confirmation-icon" aria-hidden="true">✓</span>
            <h3>¡Reporte preparado!</h3>
            <p>
              Al habilitar el envío, aquí se confirmará tu reporte y se mostrará
              el folio para consultar su estado.
            </p>
            <div className="report-reference">
              <span>Folio único de ejemplo</span>
              <strong>NEB-XXXXXXXX</strong>
            </div>
            <button
              type="button"
              className="report-submit-button"
              onClick={() => setShowConfirmation(false)}
            >
              Realizar otro reporte
            </button>
          </div>
        ) : (
          <form
            className="report-form"
            onSubmit={(event) => {
              event.preventDefault()
              setShowConfirmation(true)
            }}
          >
            <label htmlFor="report-type">Tipo de violencia</label>
            <select id="report-type" defaultValue="">
              <option value="" disabled>Selecciona una opción</option>
              <option>Psicológica</option>
              <option>Física</option>
              <option>Sexual</option>
              <option>Económica</option>
              <option>Patrimonial</option>
              <option>Digital</option>
              <option>Otra</option>
            </select>

            <label htmlFor="report-place">Lugar o espacio de incidencia</label>
            <input
              id="report-place"
              type="text"
              placeholder="Ej. Institución educativa o espacio comunitario"
            />

            <label htmlFor="report-description">Descripción de los hechos</label>
            <textarea
              id="report-description"
              rows="4"
              placeholder="Describe la situación de manera clara..."
            />

            <label htmlFor="report-evidence">Adjuntar evidencia (Opcional)</label>
            <input id="report-evidence" type="file" />
            <p className="report-privacy-note">
              La carga y el almacenamiento de evidencia estarán disponibles al habilitar el envío.
            </p>

            <button type="submit" className="report-submit-button">
              Enviar reporte anónimo <span aria-hidden="true">→</span>
            </button>
          </form>
        )}
      </section>
    </div>
  )
}

export default ReporteModal
