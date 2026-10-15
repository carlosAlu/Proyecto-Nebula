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
    relatedIds: ['F01', 'F02', 'F03', 'F04'],
    text: '¿Alguien suele hacer comentarios, burlas o críticas sobre tu forma de ser, vestir o actuar que te hacen sentir incómoda?',
  },
  {
    id: 'A02', level: 'warning', weight: 1, conduct: 'Celos / desconfianza',
    relatedIds: ['F05', 'F06', 'F07', 'F08'],
    text: '¿Alguien suele mostrar celos cuando convives con otras personas o mantiene una actitud de desconfianza hacia ti?',
  },
  {
    id: 'A03', level: 'warning', weight: 1, conduct: 'Control de relaciones / aislamiento',
    relatedIds: ['R01', 'F09', 'F10', 'F11', 'F12'],
    text: '¿Alguien intenta decidir con quién puedes convivir o limita tus amistades o relaciones familiares?',
  },
  {
    id: 'A04', level: 'warning', weight: 1, conduct: 'Chantaje / manipulación',
    relatedIds: ['R03', 'F13', 'F14', 'F15', 'F16'],
    text: '¿Alguien utiliza chantajes, culpa o manipulación para conseguir que hagas algo que no quieres?',
  },
  {
    id: 'A05', level: 'warning', weight: 1, conduct: 'Control digital',
    relatedIds: ['R04', 'F17', 'F18', 'F19', 'F20'],
    text: '¿Alguien intenta revisar tu teléfono, mensajes o redes sociales para saber con quién hablas o qué haces?',
  },
  {
    id: 'R01', level: 'reaction', weight: 2, conduct: 'Aislamiento',
    relatedIds: ['F21', 'F22', 'F23', 'F24'],
    text: '¿Alguien te ha impedido o dificultado mantener contacto con tus amistades o familiares?',
  },
  {
    id: 'R02', level: 'reaction', weight: 2, conduct: 'Control económico',
    relatedIds: ['F25', 'F26', 'F27', 'F28'],
    text: '¿Alguien controla o limita tu acceso al dinero, recursos o actividades económicas?',
  },
  {
    id: 'R03', level: 'reaction', weight: 2, conduct: 'Amenaza / intimidación',
    relatedIds: ['P02', 'P03', 'F29', 'F30', 'F31', 'F32'],
    text: '¿Alguien te ha amenazado con terminar la relación, exponerte, perjudicarte o causarte algún problema si no haces lo que quiere?',
  },
  {
    id: 'R04', level: 'reaction', weight: 2, conduct: 'Vigilancia / control digital',
    relatedIds: ['F33', 'F34', 'F35', 'F36'],
    text: '¿Alguien revisa de manera insistente tus dispositivos, contraseñas, conversaciones o redes sociales para controlar tus actividades?',
  },
  {
    id: 'R05', level: 'reaction', weight: 2, conduct: 'Humillación / intimidación',
    relatedIds: ['F37', 'F38', 'F39', 'F40'],
    text: '¿Alguien utiliza insultos, humillaciones o intimidación para conseguir que actúes de determinada manera?',
  },
  {
    id: 'P01', level: 'danger', weight: 3, conduct: 'Agresión física',
    relatedIds: ['F41', 'F42', 'F43', 'F44'],
    text: '¿Alguien te ha empujado, sujetado, golpeado o lastimado físicamente?',
  },
  {
    id: 'P02', level: 'danger', weight: 3, conduct: 'Amenaza física',
    relatedIds: ['F45', 'F46', 'F47', 'F48'],
    text: '¿Alguien te ha amenazado con lastimarte físicamente?',
  },
  {
    id: 'P03', level: 'danger', weight: 3, conduct: 'Amenaza con objeto o arma',
    relatedIds: ['F49', 'F50', 'F51', 'F52'],
    text: '¿Alguien ha utilizado un objeto o arma para amenazarte o intentar lastimarte?',
  },
  {
    id: 'P04', level: 'danger', weight: 3, conduct: 'Coerción sexual',
    relatedIds: ['F53', 'F54', 'F55', 'F56'],
    text: '¿Alguien te ha presionado u obligado a realizar una actividad de carácter sexual que no querías realizar?',
  },
  {
    id: 'P05', level: 'danger', weight: 3, conduct: 'Restricción física',
    relatedIds: ['F57', 'F58', 'F59', 'F60'],
    text: '¿Alguna persona ha utilizado la fuerza física para impedir que te alejes, salgas de un lugar o busques ayuda?',
  },
  {
    id: 'F01', level: 'warning', weight: 1, conduct: 'Descalificación / ridiculización', adaptive: true,
    relatedIds: ['F01', 'F02', 'F03', 'F04'],
    text: '¿Alguien minimiza tus logros o te hace sentir que nunca haces algo suficientemente bien?',
  },
  {
    id: 'F02', level: 'warning', weight: 1, conduct: 'Descalificación / ridiculización', adaptive: true,
    relatedIds: ['F01', 'F02', 'F03', 'F04'],
    text: '¿Alguien hace comentarios hirientes sobre tu cuerpo o apariencia, incluso después de que le pides que pare?',
  },
  {
    id: 'F03', level: 'warning', weight: 1, conduct: 'Descalificación / ridiculización', adaptive: true,
    relatedIds: ['F01', 'F02', 'F03', 'F04'],
    text: '¿Alguien se burla de tus opiniones o te hace sentir vergüenza cuando expresas lo que piensas?',
  },
  {
    id: 'F04', level: 'warning', weight: 1, conduct: 'Descalificación / ridiculización', adaptive: true,
    relatedIds: ['F01', 'F02', 'F03', 'F04'],
    text: '¿Alguien te compara con otras personas para hacerte sentir menos valiosa?',
  },
  {
    id: 'F05', level: 'warning', weight: 1, conduct: 'Celos / desconfianza', adaptive: true,
    relatedIds: ['F05', 'F06', 'F07', 'F08'],
    text: '¿Alguien te pide explicaciones repetidas sobre dónde estuviste o con quién hablaste?',
  },
  {
    id: 'F06', level: 'warning', weight: 1, conduct: 'Celos / desconfianza', adaptive: true,
    relatedIds: ['F05', 'F06', 'F07', 'F08'],
    text: '¿Alguien interpreta tus conversaciones cotidianas como una señal de que estás ocultando algo?',
  },
  {
    id: 'F07', level: 'warning', weight: 1, conduct: 'Celos / desconfianza', adaptive: true,
    relatedIds: ['F05', 'F06', 'F07', 'F08'],
    text: '¿Alguien se molesta o cambia su trato contigo cuando pasas tiempo con otras personas?',
  },
  {
    id: 'F08', level: 'warning', weight: 1, conduct: 'Celos / desconfianza', adaptive: true,
    relatedIds: ['F05', 'F06', 'F07', 'F08'],
    text: '¿Alguien te acusa de ser desleal sin que puedas hablar tranquilamente sobre la situación?',
  },
  {
    id: 'F09', level: 'warning', weight: 1, conduct: 'Control de relaciones / aislamiento', adaptive: true,
    relatedIds: ['F09', 'F10', 'F11', 'F12'],
    text: '¿Alguien se enoja cuando visitas o llamas a personas importantes para ti?',
  },
  {
    id: 'F10', level: 'warning', weight: 1, conduct: 'Control de relaciones / aislamiento', adaptive: true,
    relatedIds: ['F09', 'F10', 'F11', 'F12'],
    text: '¿Alguien insiste en acompañarte a todos lados aunque prefieras ir por tu cuenta?',
  },
  {
    id: 'F11', level: 'warning', weight: 1, conduct: 'Control de relaciones / aislamiento', adaptive: true,
    relatedIds: ['F09', 'F10', 'F11', 'F12'],
    text: '¿Alguien intenta que dejes de participar en actividades, estudios o reuniones que disfrutas?',
  },
  {
    id: 'F12', level: 'warning', weight: 1, conduct: 'Control de relaciones / aislamiento', adaptive: true,
    relatedIds: ['F09', 'F10', 'F11', 'F12'],
    text: '¿Alguien crea conflictos con tus amistades o familiares para que te distancies de ellos?',
  },
  {
    id: 'F13', level: 'warning', weight: 1, conduct: 'Chantaje / manipulación', adaptive: true,
    relatedIds: ['F13', 'F14', 'F15', 'F16'],
    text: '¿Alguien te hace responsable de su enojo o de las consecuencias de sus propias decisiones?',
  },
  {
    id: 'F14', level: 'warning', weight: 1, conduct: 'Chantaje / manipulación', adaptive: true,
    relatedIds: ['F13', 'F14', 'F15', 'F16'],
    text: '¿Alguien usa el silencio o deja de hablarte para que aceptes lo que pide?',
  },
  {
    id: 'F15', level: 'warning', weight: 1, conduct: 'Chantaje / manipulación', adaptive: true,
    relatedIds: ['F13', 'F14', 'F15', 'F16'],
    text: '¿Alguien cambia lo ocurrido o niega sus acciones y luego te hace dudar de tu memoria?',
  },
  {
    id: 'F16', level: 'warning', weight: 1, conduct: 'Chantaje / manipulación', adaptive: true,
    relatedIds: ['F13', 'F14', 'F15', 'F16'],
    text: '¿Alguien condiciona su cariño, apoyo o atención a que hagas lo que quiere?',
  },
  {
    id: 'F17', level: 'warning', weight: 1, conduct: 'Control digital', adaptive: true,
    relatedIds: ['F17', 'F18', 'F19', 'F20'],
    text: '¿Alguien te pide tus contraseñas como condición para confiar en ti?',
  },
  {
    id: 'F18', level: 'warning', weight: 1, conduct: 'Control digital', adaptive: true,
    relatedIds: ['F17', 'F18', 'F19', 'F20'],
    text: '¿Alguien publica o comparte información tuya sin preguntarte primero?',
  },
  {
    id: 'F19', level: 'warning', weight: 1, conduct: 'Control digital', adaptive: true,
    relatedIds: ['F17', 'F18', 'F19', 'F20'],
    text: '¿Alguien se molesta si no respondes de inmediato sus mensajes o llamadas?',
  },
  {
    id: 'F20', level: 'warning', weight: 1, conduct: 'Control digital', adaptive: true,
    relatedIds: ['F17', 'F18', 'F19', 'F20'],
    text: '¿Alguien insiste en que compartas tu ubicación para comprobar dónde estás?',
  },
  {
    id: 'F21', level: 'reaction', weight: 2, conduct: 'Aislamiento', adaptive: true,
    relatedIds: ['F21', 'F22', 'F23', 'F24'],
    text: '¿Alguien ha interferido para que no puedas acudir a reuniones o eventos con tu red de apoyo?',
  },
  {
    id: 'F22', level: 'reaction', weight: 2, conduct: 'Aislamiento', adaptive: true,
    relatedIds: ['F21', 'F22', 'F23', 'F24'],
    text: '¿Alguien ha dificultado que estudies, trabajes o realices actividades fuera de casa?',
  },
  {
    id: 'F23', level: 'reaction', weight: 2, conduct: 'Aislamiento', adaptive: true,
    relatedIds: ['F21', 'F22', 'F23', 'F24'],
    text: '¿Alguien ha retenido tu teléfono o ha interrumpido tus comunicaciones con otras personas?',
  },
  {
    id: 'F24', level: 'reaction', weight: 2, conduct: 'Aislamiento', adaptive: true,
    relatedIds: ['F21', 'F22', 'F23', 'F24'],
    text: '¿Alguien te ha hecho sentir que pedir apoyo a otras personas traerá problemas?',
  },
  {
    id: 'F25', level: 'reaction', weight: 2, conduct: 'Control económico', adaptive: true,
    relatedIds: ['F25', 'F26', 'F27', 'F28'],
    text: '¿Alguien te impide tomar decisiones sobre el dinero que ganas o recibes?',
  },
  {
    id: 'F26', level: 'reaction', weight: 2, conduct: 'Control económico', adaptive: true,
    relatedIds: ['F25', 'F26', 'F27', 'F28'],
    text: '¿Alguien retiene tus documentos, tarjetas o recursos necesarios para trabajar o estudiar?',
  },
  {
    id: 'F27', level: 'reaction', weight: 2, conduct: 'Control económico', adaptive: true,
    relatedIds: ['F25', 'F26', 'F27', 'F28'],
    text: '¿Alguien contrae deudas a tu nombre o te presiona para entregar dinero?',
  },
  {
    id: 'F28', level: 'reaction', weight: 2, conduct: 'Control económico', adaptive: true,
    relatedIds: ['F25', 'F26', 'F27', 'F28'],
    text: '¿Alguien te niega dinero para necesidades básicas mientras controla los recursos disponibles?',
  },
  {
    id: 'F29', level: 'reaction', weight: 2, conduct: 'Amenaza / intimidación', adaptive: true,
    relatedIds: ['F29', 'F30', 'F31', 'F32'],
    text: '¿Alguien amenaza con divulgar información privada o imágenes tuyas para presionarte?',
  },
  {
    id: 'F30', level: 'reaction', weight: 2, conduct: 'Amenaza / intimidación', adaptive: true,
    relatedIds: ['F29', 'F30', 'F31', 'F32'],
    text: '¿Alguien amenaza con perjudicar tu trabajo, estudios, reputación o relación con otras personas?',
  },
  {
    id: 'F31', level: 'reaction', weight: 2, conduct: 'Amenaza / intimidación', adaptive: true,
    relatedIds: ['F29', 'F30', 'F31', 'F32'],
    text: '¿Alguien te intimida con gestos, gritos o acercamientos para que tengas miedo de expresar desacuerdo?',
  },
  {
    id: 'F32', level: 'reaction', weight: 2, conduct: 'Amenaza / intimidación', adaptive: true,
    relatedIds: ['F29', 'F30', 'F31', 'F32'],
    text: '¿Alguien amenaza con hacerse daño para evitar que tomes una decisión propia?',
  },
  {
    id: 'F33', level: 'reaction', weight: 2, conduct: 'Vigilancia / control digital', adaptive: true,
    relatedIds: ['F33', 'F34', 'F35', 'F36'],
    text: '¿Alguien ha instalado o usado aplicaciones para rastrear tu ubicación sin tu consentimiento?',
  },
  {
    id: 'F34', level: 'reaction', weight: 2, conduct: 'Vigilancia / control digital', adaptive: true,
    relatedIds: ['F33', 'F34', 'F35', 'F36'],
    text: '¿Alguien ha accedido a tus cuentas o dispositivos sin tu permiso?',
  },
  {
    id: 'F35', level: 'reaction', weight: 2, conduct: 'Vigilancia / control digital', adaptive: true,
    relatedIds: ['F33', 'F34', 'F35', 'F36'],
    text: '¿Alguien te exige pruebas, como fotos o capturas, para verificar lo que estás haciendo?',
  },
  {
    id: 'F36', level: 'reaction', weight: 2, conduct: 'Vigilancia / control digital', adaptive: true,
    relatedIds: ['F33', 'F34', 'F35', 'F36'],
    text: '¿Alguien ha usado tus cuentas o se ha hecho pasar por ti para contactar a otras personas?',
  },
  {
    id: 'F37', level: 'reaction', weight: 2, conduct: 'Humillación / intimidación', adaptive: true,
    relatedIds: ['F37', 'F38', 'F39', 'F40'],
    text: '¿Alguien te insulta o degrada durante discusiones para imponerse?',
  },
  {
    id: 'F38', level: 'reaction', weight: 2, conduct: 'Humillación / intimidación', adaptive: true,
    relatedIds: ['F37', 'F38', 'F39', 'F40'],
    text: '¿Alguien te expone o se burla de ti frente a otras personas para avergonzarte?',
  },
  {
    id: 'F39', level: 'reaction', weight: 2, conduct: 'Humillación / intimidación', adaptive: true,
    relatedIds: ['F37', 'F38', 'F39', 'F40'],
    text: '¿Alguien usa gritos, golpes a objetos o actitudes intimidantes para terminar una conversación?',
  },
  {
    id: 'F40', level: 'reaction', weight: 2, conduct: 'Humillación / intimidación', adaptive: true,
    relatedIds: ['F37', 'F38', 'F39', 'F40'],
    text: '¿Alguien amenaza con castigos o represalias si no obedeces sus indicaciones?',
  },
  {
    id: 'F41', level: 'danger', weight: 3, conduct: 'Agresión física', adaptive: true,
    relatedIds: ['F41', 'F42', 'F43', 'F44'],
    text: '¿Alguien te ha sujetado con fuerza o te ha jalado para llevarte a algún lugar?',
  },
  {
    id: 'F42', level: 'danger', weight: 3, conduct: 'Agresión física', adaptive: true,
    relatedIds: ['F41', 'F42', 'F43', 'F44'],
    text: '¿Alguien te ha aventado objetos o ha golpeado cosas cerca de ti para asustarte?',
  },
  {
    id: 'F43', level: 'danger', weight: 3, conduct: 'Agresión física', adaptive: true,
    relatedIds: ['F41', 'F42', 'F43', 'F44'],
    text: '¿Alguien te ha lastimado físicamente durante una discusión o al intentar controlarte?',
  },
  {
    id: 'F44', level: 'danger', weight: 3, conduct: 'Agresión física', adaptive: true,
    relatedIds: ['F41', 'F42', 'F43', 'F44'],
    text: '¿Alguien ha impedido que recibas atención médica después de una lesión?',
  },
  {
    id: 'F45', level: 'danger', weight: 3, conduct: 'Amenaza física', adaptive: true,
    relatedIds: ['F45', 'F46', 'F47', 'F48'],
    text: '¿Alguien ha amenazado con hacerte daño si terminas una relación o buscas ayuda?',
  },
  {
    id: 'F46', level: 'danger', weight: 3, conduct: 'Amenaza física', adaptive: true,
    relatedIds: ['F45', 'F46', 'F47', 'F48'],
    text: '¿Alguien ha amenazado con lastimar a tus seres queridos o a una mascota para controlarte?',
  },
  {
    id: 'F47', level: 'danger', weight: 3, conduct: 'Amenaza física', adaptive: true,
    relatedIds: ['F45', 'F46', 'F47', 'F48'],
    text: '¿Alguien ha amenazado con matarte o con que nadie podrá ayudarte?',
  },
  {
    id: 'F48', level: 'danger', weight: 3, conduct: 'Amenaza física', adaptive: true,
    relatedIds: ['F45', 'F46', 'F47', 'F48'],
    text: '¿Alguien ha dicho que perderá el control y podría lastimarte?',
  },
  {
    id: 'F49', level: 'danger', weight: 3, conduct: 'Amenaza con objeto o arma', adaptive: true,
    relatedIds: ['F49', 'F50', 'F51', 'F52'],
    text: '¿Alguien ha mostrado un arma u objeto peligroso para hacer que cumplas una exigencia?',
  },
  {
    id: 'F50', level: 'danger', weight: 3, conduct: 'Amenaza con objeto o arma', adaptive: true,
    relatedIds: ['F49', 'F50', 'F51', 'F52'],
    text: '¿Alguien ha destruido objetos a tu alrededor de una manera que te hizo temer por tu seguridad?',
  },
  {
    id: 'F51', level: 'danger', weight: 3, conduct: 'Amenaza con objeto o arma', adaptive: true,
    relatedIds: ['F49', 'F50', 'F51', 'F52'],
    text: '¿Alguien te ha amenazado con un objeto cortante, un arma de fuego u otro elemento peligroso?',
  },
  {
    id: 'F52', level: 'danger', weight: 3, conduct: 'Amenaza con objeto o arma', adaptive: true,
    relatedIds: ['F49', 'F50', 'F51', 'F52'],
    text: '¿Alguien ha usado un vehículo u otro objeto para intimidarte o bloquearte el paso?',
  },
  {
    id: 'F53', level: 'danger', weight: 3, conduct: 'Coerción sexual', adaptive: true,
    relatedIds: ['F53', 'F54', 'F55', 'F56'],
    text: '¿Alguien ha ignorado tu negativa o tus dudas ante un contacto sexual?',
  },
  {
    id: 'F54', level: 'danger', weight: 3, conduct: 'Coerción sexual', adaptive: true,
    relatedIds: ['F53', 'F54', 'F55', 'F56'],
    text: '¿Alguien te ha presionado para enviar imágenes íntimas o realizar actos sexuales por internet?',
  },
  {
    id: 'F55', level: 'danger', weight: 3, conduct: 'Coerción sexual', adaptive: true,
    relatedIds: ['F53', 'F54', 'F55', 'F56'],
    text: '¿Alguien ha usado amenazas, insistencia o la fuerza para obtener contacto sexual?',
  },
  {
    id: 'F56', level: 'danger', weight: 3, conduct: 'Coerción sexual', adaptive: true,
    relatedIds: ['F53', 'F54', 'F55', 'F56'],
    text: '¿Alguien te ha impedido usar métodos de protección o tomar decisiones sobre tu salud sexual?',
  },
  {
    id: 'F57', level: 'danger', weight: 3, conduct: 'Restricción física', adaptive: true,
    relatedIds: ['F57', 'F58', 'F59', 'F60'],
    text: '¿Alguien ha cerrado una puerta, bloqueado una salida o retenido tus pertenencias para impedir que te vayas?',
  },
  {
    id: 'F58', level: 'danger', weight: 3, conduct: 'Restricción física', adaptive: true,
    relatedIds: ['F57', 'F58', 'F59', 'F60'],
    text: '¿Alguien te ha sujetado o perseguido cuando intentabas alejarte de una situación?',
  },
  {
    id: 'F59', level: 'danger', weight: 3, conduct: 'Restricción física', adaptive: true,
    relatedIds: ['F57', 'F58', 'F59', 'F60'],
    text: '¿Alguien te ha quitado las llaves, el teléfono o los medios para pedir ayuda o salir?',
  },
  {
    id: 'F60', level: 'danger', weight: 3, conduct: 'Restricción física', adaptive: true,
    relatedIds: ['F57', 'F58', 'F59', 'F60'],
    text: '¿Alguien te ha impedido buscar atención médica o salir de un lugar en contra de tu voluntad?',
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
  const [questionOrder, setQuestionOrder] = useState(
    questions.filter(({ adaptive }) => !adaptive).map(({ id }) => id),
  )
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
    const relatedCoreId = selectedAnswer.score > 0
      ? question.relatedIds?.find((id) => remainingIds.includes(id))
      : null
    const adaptiveIds = selectedAnswer.score > 0
      ? question.relatedIds?.filter((id) => (
        !questionOrder.includes(id) && questions.find((item) => item.id === id)?.adaptive
      )) ?? []
      : []
    const adaptiveId = adaptiveIds.length > 0
      ? adaptiveIds[Math.floor(Math.random() * adaptiveIds.length)]
      : null

    if (adaptiveId) {
      setQuestionOrder([
        ...questionOrder.slice(0, currentIndex + 1),
        adaptiveId,
        ...(relatedCoreId ? [relatedCoreId] : []),
        ...remainingIds.filter((id) => id !== adaptiveId && id !== relatedCoreId),
      ])
    } else if (relatedCoreId) {
      setQuestionOrder([
        ...questionOrder.slice(0, currentIndex + 1),
        relatedCoreId,
        ...remainingIds.filter((id) => id !== relatedCoreId),
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
    setQuestionOrder(questions.filter(({ adaptive }) => !adaptive).map(({ id }) => id))
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
