import { useEffect, useState } from 'react'

// Opciones de respuesta y valor que aporta cada una al cálculo orientativo.
const answers = [
  { label: 'Nunca', score: 0 },
  { label: 'Algunas veces', score: 1 },
  { label: 'Frecuentemente', score: 2 },
  { label: 'Siempre', score: 3 },
  { label: 'Prefiero no responder', score: null },
]

// Reactivos ordenados por nivel; algunos enlazan preguntas relacionadas para ampliar la orientación.
const questions = [
  {
    id: 'A01', level: 'warning', weight: 1, conduct: 'Descalificación / ridiculización',
    text: '¿Alguien suele hacer comentarios, burlas o críticas sobre tu forma de ser, vestir o actuar que te hacen sentir incómoda?',
  },
  {
    id: 'A02', level: 'warning', weight: 1, conduct: 'Celos / desconfianza',
    text: '¿Alguien suele mostrar celos cuando convives con otras personas o mantiene una actitud de desconfianza hacia ti?',
  },
  {
    id: 'A03', level: 'warning', weight: 1, conduct: 'Control de relaciones / aislamiento',
    relatedIds: ['R01'],
    text: '¿Alguien intenta decidir con quién puedes convivir o limita tus amistades o relaciones familiares?',
  },
  {
    id: 'A04', level: 'warning', weight: 1, conduct: 'Chantaje / manipulación',
    relatedIds: ['R03'],
    text: '¿Alguien utiliza chantajes, culpa o manipulación para conseguir que hagas algo que no quieres?',
  },
  {
    id: 'A05', level: 'warning', weight: 1, conduct: 'Control digital',
    relatedIds: ['R04'],
    text: '¿Alguien intenta revisar tu teléfono, mensajes o redes sociales para saber con quién hablas o qué haces?',
  },
  {
    id: 'R01', level: 'reaction', weight: 2, conduct: 'Aislamiento',
    text: '¿Alguien te ha impedido o dificultado mantener contacto con tus amistades o familiares?',
  },
  {
    id: 'R02', level: 'reaction', weight: 2, conduct: 'Control económico',
    text: '¿Alguien controla o limita tu acceso al dinero, recursos o actividades económicas?',
  },
  {
    id: 'R03', level: 'reaction', weight: 2, conduct: 'Amenaza / intimidación',
    relatedIds: ['P02', 'P03'],
    text: '¿Alguien te ha amenazado con terminar la relación, exponerte, perjudicarte o causarte algún problema si no haces lo que quiere?',
  },
  {
    id: 'R04', level: 'reaction', weight: 2, conduct: 'Vigilancia / control digital',
    text: '¿Alguien revisa de manera insistente tus dispositivos, contraseñas, conversaciones o redes sociales para controlar tus actividades?',
  },
  {
    id: 'R05', level: 'reaction', weight: 2, conduct: 'Humillación / intimidación',
    text: '¿Alguien utiliza insultos, humillaciones o intimidación para conseguir que actúes de determinada manera?',
  },
  {
    id: 'P01', level: 'danger', weight: 3, conduct: 'Agresión física',
    text: '¿Alguien te ha empujado, sujetado, golpeado o lastimado físicamente?',
  },
  {
    id: 'P02', level: 'danger', weight: 3, conduct: 'Amenaza física',
    text: '¿Alguien te ha amenazado con lastimarte físicamente?',
  },
  {
    id: 'P03', level: 'danger', weight: 3, conduct: 'Amenaza con objeto o arma',
    text: '¿Alguien ha utilizado un objeto o arma para amenazarte o intentar lastimarte?',
  },
  {
    id: 'P04', level: 'danger', weight: 3, conduct: 'Coerción sexual',
    text: '¿Alguien te ha presionado u obligado a realizar una actividad de carácter sexual que no querías realizar?',
  },
  {
    id: 'P05', level: 'danger', weight: 3, conduct: 'Restricción física',
    text: '¿Alguna persona ha utilizado la fuerza física para impedir que te alejes, salgas de un lugar o busques ayuda?',
  },
]

// Mensajes que acompañan cada resultado sin presentarlo como diagnóstico profesional.
const riskLevels = {
  warning: {
    label: 'Advertencia',
    message: 'Algunas de tus respuestas identifican conductas que pueden afectar tu bienestar y autonomía. Puedes consultar información sobre estas conductas y revisar los recursos de orientación disponibles.',
  },
  reaction: {
    label: 'Reacción',
    message: 'Tus respuestas muestran varias conductas que pueden estar relacionadas con situaciones de violencia. Considera consultar los recursos de apoyo disponibles y revisar las opciones de orientación.',
  },
  danger: {
    label: 'Peligro',
    message: 'Tus respuestas identifican conductas que pueden representar una situación de mayor riesgo. Revisa los recursos de apoyo disponibles y considera buscar orientación de una institución o servicio especializado.',
  },
  none: {
    label: 'Sin conductas identificadas',
    message: 'En las respuestas que compartiste no se identificaron conductas de este mapeo. Esto no descarta situaciones de riesgo; puedes buscar orientación si algo te preocupa.',
  },
  unavailable: {
    label: 'Resultado no disponible',
    message: 'No hay respuestas contabilizables para generar una orientación. Puedes volver a intentarlo cuando te sientas cómoda.',
  },
}

// Orden numérico usado para elegir el nivel de mayor riesgo señalado.
const levelOrder = { warning: 1, reaction: 2, danger: 3 }

// Calcula puntuación normalizada, conductas señaladas y el nivel más alto respondido.
function getResult(responses, questionOrder) {
  const answered = responses
    .map((response, index) => ({
      ...response,
      question: questions.find((item) => item.id === questionOrder[index]),
    }))
    .filter((response) => response.score !== null)

  if (answered.length === 0) return riskLevels.unavailable

  const score = answered.reduce(
    (total, response) => total + response.score * response.question.weight,
    0,
  )
  const maximumScore = answered.reduce(
    (total, response) => total + 3 * response.question.weight,
    0,
  )
  const percentage = (score / maximumScore) * 100
  const detected = answered.filter((response) => response.score > 0)
  const highestLevel = detected.reduce(
    (highest, response) => (
      !highest || levelOrder[response.question.level] > levelOrder[highest]
        ? response.question.level
        : highest
    ),
    null,
  )
  const conducts = [...new Set(detected.map((response) => response.question.conduct))]
  const level = highestLevel ? riskLevels[highestLevel] : riskLevels.none

  return { ...level, percentage, conducts }
}

function Autoevaluacion({ onClose, onFindSupport }) {
  // Conserva el orden adaptativo, el avance y las respuestas mientras el modal está abierto.
  const [questionOrder, setQuestionOrder] = useState(questions.map(({ id }) => id))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

  // Mantiene la ventana modal abierta, bloquea el scroll de fondo y permite cerrarla con Escape.
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

  const question = questions.find(({ id }) => id === questionOrder[currentIndex])
  const progress = ((currentIndex + 1) / questionOrder.length) * 100

  // Guarda la respuesta actual y adelanta preguntas relacionadas cuando la respuesta lo amerita.
  const continueAssessment = () => {
    if (!selectedAnswer) return

    const nextResponses = [...responses.slice(0, currentIndex), selectedAnswer]
    setResponses(nextResponses)

    if (currentIndex === questionOrder.length - 1) {
      setShowResult(true)
      return
    }

    const remainingIds = questionOrder.slice(currentIndex + 1)
    const relatedId = selectedAnswer.score > 0
      ? question.relatedIds?.find((id) => remainingIds.includes(id))
      : null
    if (relatedId) {
      setQuestionOrder([
        ...questionOrder.slice(0, currentIndex + 1),
        relatedId,
        ...remainingIds.filter((id) => id !== relatedId),
      ])
    }

    setCurrentIndex((index) => index + 1)
    setSelectedAnswer(null)
  }

  // Regresa a la pregunta anterior y restaura la opción que ya se había elegido.
  const goBack = () => {
    if (currentIndex === 0) return
    setCurrentIndex((index) => index - 1)
    setSelectedAnswer(responses[currentIndex - 1])
  }

  // Reinicia el cuestionario y devuelve el orden original de las preguntas.
  const restart = () => {
    setQuestionOrder(questions.map(({ id }) => id))
    setCurrentIndex(0)
    setResponses([])
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const result = getResult(responses, questionOrder)

  return (
    <div className="assessment-modal-backdrop">
      <section
        className={`assessment-modal${showResult ? ' assessment-result-modal' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="assessment-title"
      >
        {/* Presenta una pregunta por pantalla; al terminar, cambia a la orientación calculada. */}
        {!showResult ? (
          <>
            <header className="assessment-modal-header">
              <div>
                <span className="assessment-stage">Orientación</span>
                <p className="assessment-count">Pregunta {currentIndex + 1} de {questionOrder.length}</p>
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
              aria-valuemax={questionOrder.length}
              aria-valuenow={currentIndex + 1}
            >
              <span style={{ width: `${progress}%` }} />
            </div>

            <h1 id="assessment-title" className="assessment-question">{question.text}</h1>

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
                {currentIndex === questionOrder.length - 1 ? 'Ver resultado' : 'Continuar'}
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
              {result.percentage !== undefined && (
                <>
                  <p>Puntuación orientativa normalizada: {result.percentage.toFixed(2)}/100</p>
                  {result.conducts.length > 0 && (
                    <p>Conductas identificadas: {result.conducts.join(', ')}.</p>
                  )}
                </>
              )}
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
