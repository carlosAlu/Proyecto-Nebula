import { useEffect, useState } from 'react'
import { createAnonymousReport } from './anonymousReportsApi.js'

function ReporteModal({ onClose }) {
  const [folio, setFolio] = useState('')
  const [evidence, setEvidence] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const form = event.currentTarget
      const type = form.elements.type.value
      const place = form.elements.place.value
      const description = form.elements.description.value
      let attachment
      if (evidence) {
        if (evidence.size > 2 * 1024 * 1024
            || !['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(evidence.type)) {
          throw new Error('Adjunta una imagen JPG, PNG, WEBP o un PDF de hasta 2 MB.')
        }
        const data = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = () => reject(new Error('No se pudo leer el archivo adjunto.'))
          reader.readAsDataURL(evidence)
        })
        if (typeof data !== 'string') throw new Error('No se pudo leer el archivo adjunto.')
        attachment = { fileName: evidence.name, mimeType: evidence.type, data }
      }

      const report = await createAnonymousReport({
        type,
        place,
        description,
        ...(attachment ? { evidence: attachment } : {}),
      })
      setFolio(report.folio)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

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

        {folio ? (
          <div className="report-confirmation" aria-live="polite">
            <span className="report-confirmation-icon" aria-hidden="true">✓</span>
            <h3>¡Reporte enviado!</h3>
            <p>
              Guarda este folio: es la única forma de consultar el avance de tu reporte.
              No podremos recuperarlo si lo pierdes.
            </p>
            <div className="report-reference">
              <span>Folio único de seguimiento</span>
              <strong>{folio}</strong>
            </div>
            <button
              type="button"
              className="report-submit-button"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form className="report-form" onSubmit={handleSubmit}>
            <label htmlFor="report-type">Tipo de violencia</label>
            <select id="report-type" name="type" defaultValue="" required>
              <option value="" disabled>Selecciona una opción</option>
              <option value="Psicológica">Psicológica</option>
              <option value="Física">Física</option>
              <option value="Sexual">Sexual</option>
              <option value="Económica">Económica</option>
              <option value="Patrimonial">Patrimonial</option>
              <option value="Digital">Digital</option>
              <option value="Otra">Otra</option>
            </select>

            <label htmlFor="report-place">Lugar o espacio de incidencia</label>
            <input
              id="report-place"
              name="place"
              type="text"
              maxLength="200"
              placeholder="Ej. Institución educativa o espacio comunitario"
              required
            />

            <label htmlFor="report-description">Descripción de los hechos</label>
            <textarea
              id="report-description"
              name="description"
              rows="4"
              maxLength="5000"
              placeholder="Describe la situación de manera clara..."
              required
            />

            <label htmlFor="report-evidence">Adjuntar evidencia (Opcional)</label>
            <input
              id="report-evidence"
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              onChange={(event) => {
                const selectedFile = event.target.files?.[0] || null
                setEvidence(selectedFile)
                setError(selectedFile && selectedFile.size > 2 * 1024 * 1024
                  ? 'El archivo adjunto debe pesar menos de 2 MB.'
                  : selectedFile && !['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(selectedFile.type)
                    ? 'Adjunta una imagen JPG, PNG, WEBP o un archivo PDF.'
                    : '')
              }}
            />
            <p className="report-privacy-note">
              Se aceptan imágenes JPG, PNG, WEBP o archivos PDF de hasta 2 MB. No incluyas datos que te identifiquen.
            </p>

            {error && <p className="report-form-message is-error" role="alert">{error}</p>}
            <button type="submit" className="report-submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando…' : 'Enviar reporte anónimo'} <span aria-hidden="true">→</span>
            </button>
          </form>
        )}
      </section>
    </div>
  )
}

export default ReporteModal
