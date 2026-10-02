import { useEffect, useState } from 'react'

const answers = [
  { label: 'Nunca', score: 0, route: 0 },
  { label: 'Algunas veces', score: 1, route: 1 },
  { label: 'Frecuentemente', score: 2, route: 2 },
  { label: 'Siempre', score: 3, route: 2 },
  { label: 'Prefiero no responder', score: null, route: null },
]

// Cada bloque contiene tres preguntas posibles para la misma dimensión.
// La respuesta anterior elige la variante para el siguiente paso.
const questionPaths = [
  [
    '¿Alguien hace comentarios que te hacen sentir menos o descalificada?',
    '¿Con qué frecuencia alguien te insulta, ridiculiza o descalifica?',
    '¿Alguien te humilla o amenaza para hacerte sentir miedo?',
  ],
  [
    '¿Alguien intenta decidir con quién puedes convivir?',
    '¿Te han pedido alejarte de amistades o familiares?',
    '¿Alguien te impide contactar a personas de confianza o pedirles ayuda?',
  ],
  [
    '¿Alguien opina o decide cómo debes vestirte o arreglarte?',
    '¿Alguien controla tu apariencia o te presiona para cambiarla?',
    '¿Temes las consecuencias si no sigues las instrucciones de alguien sobre tu apariencia?',
  ],
  [
    '¿Alguien revisa tu teléfono o tus cuentas sin tu permiso?',
    '¿Alguien te pide contraseñas o revisa tus mensajes para vigilarte?',
    '¿Alguien usa tu ubicación, tus cuentas o tus dispositivos para controlarte o intimidarte?',
  ],
  [
    '¿Alguien intenta decidir cómo usas tu dinero?',
    '¿Alguien limita tu acceso al dinero, al trabajo o a tus pertenencias?',
    '¿Alguien te quita dinero o te impide cubrir necesidades básicas?',
  ],
  [
    '¿Alguien te hace sentir culpable o responsable de sus reacciones?',
    '¿Alguien te presiona o manipula para que hagas cosas que no quieres?',
    '¿Alguien te amenaza con hacerte daño, lastimarse o perjudicar a alguien para controlarte?',
  ],
  [
    '¿Alguien golpea, rompe o lanza objetos durante una discusión?',
    '¿Alguien ha destruido tus pertenencias o golpeado objetos para intimidarte?',
    '¿Alguien ha usado objetos para amenazarte o impedir que te vayas?',
  ],
  [
    '¿Alguien te ha sujetado o empujado contra tu voluntad?',
    '¿Alguien te ha empujado, jalado, abofeteado o golpeado?',
    '¿Alguien te ha estrangulado, asfixiado o causado una lesión?',
  ],
  [
    '¿Alguien te ha presionado para tener contacto físico que no deseas?',
    '¿Alguien ha ignorado tu negativa o te ha presionado para tener relaciones sexuales?',
    '¿Alguien te ha obligado o intentado obligar a realizar actos sexuales?',
  ],
  [
    '¿Alguien aparece en lugares donde estás sin que lo hayas acordado?',
    '¿Alguien insiste en buscarte o contactarte después de que pediste espacio?',
    '¿Alguien te sigue, vigila o acosa y esto te hace temer por tu seguridad?',
  ],
  [
    '¿Alguien ha amenazado con usar un objeto o arma para asustarte?',
    '¿Alguien tiene acceso a un arma y la ha mencionado durante un conflicto?',
    '¿Alguien te ha amenazado con un arma o la ha usado para intimidarte?',
  ],
  [
    '¿Te preocupa cómo reaccionaría alguien si decides terminar una relación o alejarte?',
    '¿Alguien ha intensificado el control o las amenazas cuando intentas poner límites?',
    '¿Alguien ha aumentado las amenazas o agresiones cuando intentas alejarte?',
  ],
  [
    '¿Alguien usa a tus hijas, hijos u otras personas cercanas para presionarte?',
    '¿Alguien amenaza con lastimar, quitarte o perjudicar a personas importantes para ti?',
    '¿Alguien ha lastimado o amenazado a tus hijas, hijos, familiares o mascotas para controlarte?',
  ],
  [
    '¿Cambias lo que haces por temor a la reacción de alguien?',
    '¿Sientes miedo de alguien cercano o de lo que podría hacer?',
    '¿Sientes que tu seguridad corre peligro por la conducta de alguien?',
  ],
  [
    '¿Tienes a alguien de confianza a quien acudir si necesitas apoyo?',
    '¿Te resulta difícil pedir ayuda o encontrar un lugar seguro?',
    '¿En este momento te sientes en peligro o sin una forma segura de salir?',
  ],
]

const riskLevels = {
  low: {
    label: 'Señales de riesgo bajas',
    message: 'El puntaje de tus respuestas compartidas es bajo en esta orientación. Esto no descarta situaciones de riesgo; si algo te preocupa, puedes buscar apoyo cuando lo necesites.',
  },
  moderate: {
    label: 'Señales de riesgo moderadas',
    message: 'Tus respuestas muestran situaciones que merecen atención. Considera conversar con alguien de confianza o contactar un servicio de apoyo para explorar tus opciones.',
  },
  high: {
    label: 'Señales de riesgo altas',
    message: 'Tus respuestas reflejan varias señales de alerta. Te sugerimos contactar cuanto antes a una institución de apoyo o a una persona de confianza.',
  },
  unavailable: {
    label: 'Resultado no disponible',
    message: 'No hay suficientes respuestas para calcular una orientación. Puedes volver a intentarlo cuando te sientas cómoda.',
  },
}

function getResult(responses) {
  const answered = responses.filter((response) => response?.score !== null)

  if (answered.length === 0) return riskLevels.unavailable

  const score = answered.reduce((total, response) => total + response.score, 0)
  const percentage = (score / (answered.length * 3)) * 100

  if (percentage >= 67) return riskLevels.high
  if (percentage >= 34) return riskLevels.moderate
  return riskLevels.low
}

function Autoevaluacion({ onClose, onFindSupport }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

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

  const previousRoute = responses[currentIndex - 1]?.route
  const variant = previousRoute ?? 1
  const question = questionPaths[currentIndex][variant]
  const progress = ((currentIndex + 1) / questionPaths.length) * 100

  const continueAssessment = () => {
    if (!selectedAnswer) return

    const nextResponses = [...responses.slice(0, currentIndex), selectedAnswer]
    setResponses(nextResponses)

    if (currentIndex === questionPaths.length - 1) {
      setShowResult(true)
      return
    }

    setCurrentIndex((index) => index + 1)
    setSelectedAnswer(null)
  }

  const goBack = () => {
    if (currentIndex === 0) return
    setCurrentIndex((index) => index - 1)
    setSelectedAnswer(responses[currentIndex - 1])
  }

  const restart = () => {
    setCurrentIndex(0)
    setResponses([])
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const result = getResult(responses)

  return (
    <div className="assessment-modal-backdrop">
      <section
        className={`assessment-modal${showResult ? ' assessment-result-modal' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="assessment-title"
      >
        {!showResult ? (
          <>
            <header className="assessment-modal-header">
              <div>
                <span className="assessment-stage">Orientación</span>
                <p className="assessment-count">Pregunta {currentIndex + 1} de {questionPaths.length}</p>
              </div>
              <button
                type="button"
                className="assessment-close"
                onClick={onClose}
                aria-label="Cerrar autoevaluación"
              >
                ×
              </button>
            </header>

            <div
              className="assessment-modal-progress"
              role="progressbar"
              aria-label="Progreso de la autoevaluación"
              aria-valuemin="0"
              aria-valuemax={questionPaths.length}
              aria-valuenow={currentIndex + 1}
            >
              <span style={{ width: `${progress}%` }} />
            </div>

            <h1 id="assessment-title" className="assessment-question">{question}</h1>

            <fieldset className="assessment-options">
              <legend className="visually-hidden">Selecciona una respuesta</legend>
              {answers.map((answer) => (
                <button
                  key={answer.label}
                  type="button"
                  className={`assessment-option${selectedAnswer?.label === answer.label ? ' is-selected' : ''}`}
                  onClick={() => setSelectedAnswer(answer)}
                  aria-pressed={selectedAnswer?.label === answer.label}
                >
                  <span>{answer.label}</span>
                  {selectedAnswer?.label === answer.label && <span aria-hidden="true">✓</span>}
                </button>
              ))}
            </fieldset>

            <footer className="assessment-modal-footer">
              {currentIndex > 0 ? (
                <button type="button" className="assessment-exit" onClick={goBack}>Volver</button>
              ) : (
                <button type="button" className="assessment-exit" onClick={onClose}>Salir</button>
              )}
              <button
                type="button"
                className="assessment-continue"
                onClick={continueAssessment}
                disabled={!selectedAnswer}
              >
                {currentIndex === questionPaths.length - 1 ? 'Ver resultado' : 'Continuar'}
                <span aria-hidden="true">→</span>
              </button>
            </footer>
          </>
        ) : (
          <div className="assessment-result-content" aria-live="polite">
            <span className="assessment-result-icon" aria-hidden="true">✧</span>
            <h1 id="assessment-title">Resultado orientativo</h1>
            <div className="assessment-result-panel">
              <strong>NIVEL DETECTADO: {result.label.toLocaleUpperCase('es-MX')}</strong>
              <p>{result.message}</p>
            </div>
            <p className="assessment-result-disclaimer">
              Este resultado es estrictamente orientativo y no constituye un diagnóstico ni una
              evaluación profesional. Si estás en peligro inmediato, llama al 911.
            </p>
            <div className="assessment-result-actions">
              <button type="button" className="assessment-exit" onClick={onFindSupport}>
                Centros de ayuda
              </button>
              <a className="assessment-continue" href="tel:911">Llamar al 911</a>
              <button type="button" className="assessment-exit" onClick={restart}>Volver a empezar</button>
              <button type="button" className="assessment-continue" onClick={onClose}>Finalizar y cerrar</button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Autoevaluacion
