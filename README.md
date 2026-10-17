# Proyecto Nebula

Nebula es una plataforma web de orientación y prevención de la violencia contra las mujeres. Reúne información, herramientas de reflexión y accesos a recursos de apoyo en una interfaz que busca ser clara, privada y libre de juicios.

> **Importante:** Nebula es un proyecto informativo en desarrollo. La autoevaluación y el asistente virtual ofrecen orientación general; no son servicios de emergencia, diagnósticos ni sustitutos de atención profesional. Si existe peligro inmediato en México, llama al **911**.

## Contenido

- [Estado actual](#estado-actual)
- [Funciones disponibles](#funciones-disponibles)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [API disponible](#api-disponible)
- [Comandos del frontend](#comandos-del-frontend)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Integraciones y configuración](#integraciones-y-configuración)
- [Privacidad y seguridad](#privacidad-y-seguridad)
- [Próximos pasos](#próximos-pasos)

## Estado actual

El repositorio contiene una aplicación frontend React/Vite y una API Express. La autenticación administrativa y los módulos de reportes, solicitudes de orientación, recursos y colaboradores usan MongoDB; requieren que la base de datos sea accesible y que las variables de entorno estén configuradas. La API puede iniciar sin MongoDB, pero informa un estado degradado y las funciones que dependen de la base de datos no estarán disponibles.

Las secciones informativas, el cuestionario y el asistente están disponibles desde la interfaz. Los reportes anónimos y las solicitudes de orientación se envían a la API y se guardan en MongoDB; los reportes generan un folio para consultar su avance. El panel permite gestionar reportes, solicitudes, recursos de orientación y colaboradores. Las métricas mostradas en la portada son ilustrativas, no indicadores calculados a partir de datos reales. La autoevaluación es orientativa y no sustituye atención profesional. Revisa el destino del botón de salida rápida antes de publicar el sitio.

## Funciones disponibles

- **Inicio y navegación:** portada con accesos a las secciones principales. La navegación interna utiliza fragmentos de URL, por ejemplo `#centros` o `#ia`.
- **Autoevaluación:** cuestionario orientativo y violentómetro interactivo; sus resultados no son un diagnóstico ni una valoración clínica.
- **Líneas de escucha y centros de ayuda:** información de contacto, centros aliados y mapa incrustado. Verifica los datos y su vigencia antes de depender de ellos.
- **Recursos de orientación:** directorio público de sitios, videos y documentos guardado en MongoDB.
- **Chat global:** conversación pública en tiempo real mediante Server-Sent Events. Usa un alias generado para la sesión, limita el envío a 10 mensajes por minuto por IP y conserva los mensajes por hasta 24 horas.
- **Asistente virtual:** chat en español conectado a un webhook de n8n; requiere Internet y que el servicio externo esté disponible.
- **Colaboradores:** directorio público persistido en MongoDB y administrable desde el panel.
- **Solicitudes de orientación:** formulario público que guarda los mensajes de contacto en MongoDB; el panel administrativo permite consultarlos y eliminarlos.
- **Reportes anónimos:** formulario sin cuenta que guarda tipo de violencia, lugar, descripción y evidencia opcional en MongoDB. Devuelve un folio para consultar solo el estado y la fecha de actualización. El panel administrativo permite revisar el contenido, descargar evidencia, cambiar el estado y eliminar reportes.
- **Administración:** registro limitado a correos configurados en `ADMIN_EMAILS`, inicio de sesión, validación de sesión al abrir el panel y cierre de sesión. Las contraseñas se almacenan con bcrypt y la sesión en una cookie `HttpOnly` de ocho horas.
- **Panel administrativo:** gestión de recursos, colaboradores, solicitudes de orientación y reportes. Las métricas de la portada son ilustrativas; no representan datos operativos.
- **Preferencia de tema:** alternancia entre modo claro y oscuro, guardada localmente en el navegador.

## Tecnologías

- React 19
- Vite 8
- JavaScript y CSS
- Node.js y Express para la API
- MongoDB Atlas y Mongoose
- JWT, bcryptjs y express-rate-limit para la autenticación administrativa
- ESLint
- Chat de n8n cargado desde jsDelivr
- Docker para el backend. La configuración actual de Docker Compose también declara un servicio frontend, pero no existe `Frontend/Dockerfile`, por lo que ese servicio aún no se puede construir.

## Requisitos

- Node.js **20.19 o posterior** o **22.12 o posterior**.
- npm.
- Un navegador moderno.
- Opcional: Docker para construir y ejecutar el backend. Docker Compose no funciona de extremo a extremo hasta agregar un Dockerfile del frontend o corregir su configuración de construcción.

## Instalación y ejecución

Los comandos del frontend se ejecutan desde la carpeta `Frontend/`.

```sh
cd Frontend
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación, normalmente `http://localhost:5173`.

Para iniciar la API, ejecuta desde `Backend/`:

```sh
npm install
npm start
```

La API escucha en el puerto `3000` por defecto para desarrollo local (se puede cambiar con `PORT`) y queda disponible en las interfaces de red del equipo. En Render, el servidor usa el puerto proporcionado automáticamente en `PORT` (normalmente `10000`); la URL pública se usa sin añadir `:10000`. `GET /health` informa el estado del servidor y MongoDB. Si MongoDB no está configurado o disponible, el servidor sigue iniciando, pero `/health` responde con estado `503` y `"status": "degraded"`. Configura `MONGODB_URI` para conectar MongoDB Atlas; también se acepta `MONGO_URI` por compatibilidad. Si Atlas no conecta, revisa que el clúster esté activo, que las credenciales de base de datos sean correctas y que la IP pública de salida de la máquina donde corre el backend esté permitida en **Atlas → Security → Network Access**.

Configura `Backend/.env` con los valores necesarios para MongoDB y la autenticación:

```dotenv
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>/<base-de-datos>
JWT_SECRET=<clave-aleatoria-de-al-menos-32-caracteres>
ADMIN_EMAILS=admin@ejemplo.com
FRONTEND_URL=http://localhost:5173
PORT=3000
NODE_ENV=development
```

`MONGODB_URI` (o `MONGO_URI`) es necesaria para las funciones respaldadas por la base de datos. `JWT_SECRET` es una clave aleatoria de al menos 32 caracteres; no la compartas ni la incluyas en el frontend. `ADMIN_EMAILS` es una lista separada por comas de los correos autorizados para crear cuentas administrativas. `FRONTEND_URL` acepta una lista separada por comas de orígenes adicionales. Los orígenes locales (`localhost` y `127.0.0.1`) y las direcciones IPv4 privadas de la LAN en los puertos `5173` y `8080` se autorizan automáticamente para pruebas. En producción, indica el origen exacto del sitio. Configura `NODE_ENV=production`, sirve el sitio mediante HTTPS y permite cookies `Secure` y `SameSite=None` para autenticar solicitudes entre dominios.

Los recursos de orientación y la red de colaboradores se inicializan con datos predeterminados en MongoDB cuando sus colecciones están vacías y aún no se marcó la inicialización. La API los ofrece públicamente en `GET /api/resources` y `GET /api/partners`; agregar, editar y eliminar elementos requiere una sesión administrativa.

Puedes generar `JWT_SECRET` desde `Backend/` con `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"` y copiar el resultado directamente a `Backend/.env`.

El frontend usa `VITE_API_URL` cuando está configurada. Sin esa variable, usa `http://localhost:3000` en desarrollo local y `https://proyecto-nebula-1.onrender.com` en otros hosts. Para desarrollo, Vite escucha en todas las interfaces y la API autoriza orígenes IPv4 privados de la LAN en los puertos `5173` y `8080`.

### Despliegue separado en Render y Vercel

- **Render (API):** configura `Backend` como *Root Directory*, `npm install` como *Build Command* y `npm start` como *Start Command*. Render asigna `PORT` (normalmente `10000`); no establezcas una URL con `:10000` en el navegador. Añade `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAILS`, `FRONTEND_URL` y `NODE_ENV=production` como variables de entorno del servicio. `FRONTEND_URL` debe ser el origen exacto de la web publicada, sin ruta, por ejemplo `https://tu-sitio.vercel.app`.
- **Vercel (frontend):** configura `Frontend` como *Root Directory*, `npm run build` como comando de construcción y `dist` como directorio de salida. En las variables de entorno, configura `VITE_API_URL=https://proyecto-nebula-1.onrender.com` y vuelve a desplegar para que se aplique al bundle.
- La sesión administrativa usa una cookie `Secure` y `SameSite=None` en producción para permitir solicitudes con credenciales entre el frontend y la API en dominios distintos. El navegador también debe permitir cookies de terceros para esa combinación de dominios; para evitar esa dependencia, publica ambos servicios bajo el mismo sitio raíz.

### Acceso desde otras computadoras de la red local

1. Inicia el frontend con `npm.cmd --prefix Frontend run dev` y la API con `npm.cmd --prefix Backend start` en la computadora que actuará como servidor.
2. Averigua su dirección IPv4 local ejecutando `ipconfig` en PowerShell.
3. Desde otra computadora conectada a la misma red, abre `http://<IP-LOCAL-DEL-SERVIDOR>:5173` (por ejemplo, `http://192.168.1.25:5173`).
4. Si no carga, permite los puertos TCP `5173` y `3000` en el Firewall de Windows para redes privadas. El frontend usará automáticamente esa misma IP para autenticación y chat.

El acceso descrito es solo para la red local; no publiques esos puertos en el router para exponer el sistema a Internet.

### API de autenticación administrativa

| Método | Ruta | Función |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Registra un correo autorizado y crea una sesión. Requiere nombre, correo, contraseña y aceptación de términos. |
| `POST` | `/api/auth/login` | Valida las credenciales y crea una sesión. |
| `GET` | `/api/auth/me` | Valida la cookie de sesión y devuelve el perfil administrativo. |
| `POST` | `/api/auth/logout` | Elimina la cookie de sesión. |

Los intentos de inicio de sesión y registro están limitados a 10 por IP cada 15 minutos. Las contraseñas administrativas deben tener al menos 12 caracteres y no exceder 72 bytes. Las credenciales no deben guardarse ni exponerse en el frontend; `Backend/.env` debe mantenerse fuera del control de versiones.

### API disponible

Las respuestas de la API son JSON, excepto el flujo SSE del chat y la descarga binaria de evidencia. Las operaciones administrativas requieren la cookie de sesión; `POST /api/auth/logout` elimina la cookie actual.

| Método | Ruta | Acceso y función |
| --- | --- | --- |
| `GET` | `/` | Público; información básica de la API. |
| `GET` | `/health` | Público; estado de la conexión a MongoDB (`503` si está desconectada). |
| `POST` | `/api/auth/register` | Público con correo autorizado; crea una cuenta administrativa. |
| `POST` | `/api/auth/login` | Público; inicia sesión administrativa. |
| `GET` | `/api/auth/me` | Sesión requerida; valida y devuelve el perfil administrativo. |
| `POST` | `/api/auth/logout` | Elimina la cookie de sesión. |
| `GET` | `/api/chat/stream` | Público; abre el flujo de mensajes Server-Sent Events. |
| `POST` | `/api/chat/messages` | Público; envía un mensaje al chat global. |
| `GET` | `/api/resources` | Público; lista los recursos de orientación. |
| `POST`, `PUT /:id`, `DELETE /:id` | `/api/auth/resources` | Sesión requerida; gestiona recursos. |
| `GET` | `/api/partners` | Público; lista colaboradores. |
| `POST`, `PUT /:id`, `DELETE /:id` | `/api/auth/partners` | Sesión requerida; gestiona colaboradores. |
| `POST` | `/api/orientation-requests` | Público; envía una solicitud de orientación. |
| `GET`, `DELETE /:id` | `/api/auth/orientation-requests` | Sesión requerida; consulta o elimina solicitudes. |
| `POST` | `/api/reports` | Público; crea un reporte anónimo y devuelve su folio. |
| `GET` | `/api/reports/folio/:folio` | Público; consulta el estado y fechas del reporte. |
| `GET` | `/api/auth/reports/admin` | Sesión requerida; lista reportes sin el contenido binario de la evidencia. |
| `PATCH /:id/status`, `GET /:id/evidence`, `DELETE /:id` | `/api/auth/reports/admin` | Sesión requerida; cambia estado, descarga evidencia o elimina un reporte. |

En PowerShell también puedes ejecutar los comandos desde la raíz del repositorio:

```powershell
npm.cmd --prefix Frontend install
npm.cmd --prefix Frontend run dev
```

## Comandos del frontend

Ejecuta estos comandos desde `Frontend/`:

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor local de desarrollo con recarga en caliente. |
| `npm run build` | Genera la versión de producción en `Frontend/dist/`. |
| `npm run preview` | Sirve localmente el resultado compilado para revisarlo. |
| `npm run lint` | Ejecuta ESLint sobre el frontend. |

Antes de integrar cambios, valida el frontend:

```sh
npm run lint
npm run build
```

## Estructura del repositorio

```text
.
├── Backend/
│   ├── controllers/           # Lógica de autenticación administrativa
│   ├── middleware/            # Validación de sesión y rol administrativo
│   ├── data/                  # Datos predeterminados para inicialización
│   ├── models/                # Modelos de administración, reportes y contenido
│   ├── routes/                # Rutas de autenticación, chat y módulos de la API
│   ├── server.js              # API, CORS, MongoDB y health check
│   ├── Dockerfile             # Imagen del backend
│   └── package.json           # Dependencias del backend
├── Frontend/
│   ├── public/                # Recursos estáticos públicos
│   ├── src/
│   │   ├── assets/            # Imágenes y recursos gráficos
│   │   ├── App.jsx            # Navegación y composición principal
│   │   ├── App.css            # Estilos de la aplicación
│   │   ├── Autoevaluacion.jsx # Cuestionario y resultado orientativo
│   │   ├── IA.jsx             # Página del asistente virtual
│   │   ├── Admin.jsx          # Panel administrativo
│   │   ├── LoginAdmin.jsx     # Inicio de sesión
│   │   ├── SingUpAdmin.jsx    # Registro administrativo
│   │   ├── adminAuthApi.js    # Cliente de autenticación
│   │   └── ...                 # Secciones y componentes de la aplicación
│   ├── package.json           # Dependencias y scripts npm
│   └── README.md              # Instrucciones breves del frontend
├── JSON(Ejemplo)/             # Datos de ejemplo y modelo entidad-relación
├── docker-compose.yml         # Configuración declarada para contenedores
└── README.md                  # Documentación principal
```

## Integraciones y configuración

### Asistente de n8n

La página de IA carga `@n8n/chat` y sus estilos desde jsDelivr y se conecta a un webhook configurado directamente en `Frontend/src/IA.jsx`. Para que el chat pueda intercambiar mensajes:

1. Activa el workflow y el webhook correspondiente en n8n.
2. Configura el servicio para aceptar solicitudes desde los orígenes donde se servirá la aplicación.
3. Comprueba que el webhook configurado en el frontend sea el endpoint correcto.
4. Prueba el envío de un mensaje desde cada dominio de despliegue.

La carga del chat requiere conexión a Internet y disponibilidad de jsDelivr y del servicio de n8n. La URL del webhook está escrita en el código del frontend; antes de desplegar, considera mover la configuración a variables de entorno. Los webhooks publicados en código cliente no deben tratarse como secretos.

### MongoDB

La API se conecta a MongoDB mediante `MONGODB_URI` (o `MONGO_URI`) del archivo `Backend/.env`. La disponibilidad de la API no garantiza que Atlas sea accesible: configura la lista de acceso de red de Atlas para el entorno desde donde se ejecuta el backend.

### Chat global anónimo

El chat global no requiere cuenta, correo ni nombre real. El navegador genera un alias aleatorio y lo conserva en `sessionStorage` durante esa sesión; el backend almacena únicamente el alias, el texto y las fechas de cada mensaje, sin crear perfiles ni asociar un identificador de usuaria. Los mensajes se actualizan en vivo mediante Server-Sent Events y MongoDB los elimina con un índice TTL al cumplir 24 horas. La eliminación TTL de MongoDB es automática, aunque el proceso de limpieza puede tardar un poco más de 24 horas; los mensajes vencidos no se entregan en el chat. Como medida antiabuso, el límite de 10 mensajes por minuto mantiene un contador temporal por IP en la memoria del proceso (no en MongoDB); los registros que mantenga el proveedor de alojamiento quedan fuera de la aplicación.

Para probarlo, inicia MongoDB/API y el frontend, y configura `VITE_API_URL` si la API no está en `http://localhost:3000` durante el desarrollo local. En producción, el frontend usa la URL de Render descrita arriba o la URL explícita de `VITE_API_URL`. El alias no identifica a una persona, pero el chat es público y no evita que alguien incluya información personal voluntariamente; la interfaz recomienda no compartirla.

### Docker Compose (incompleto)

`docker-compose.yml` declara el backend en el puerto `10000` y el frontend en el `8080`, pero no existe `Frontend/Dockerfile`. Por eso, `docker compose up --build` no puede construir todos los servicios tal como está configurado actualmente. El backend sí cuenta con `Backend/Dockerfile`; para desarrollo local, usa los comandos npm anteriores. También se requiere `Backend/.env` para que Compose pueda cargar la configuración del backend.

Al completar la imagen del frontend, valida que los puertos publicados, `VITE_API_URL`, CORS y la configuración de cookies coincidan con el despliegue. En producción, usa HTTPS y `FRONTEND_URL` con el origen público del sitio.

## Privacidad y seguridad

- No ingreses ni compartas datos personales o información que identifique a alguien en el chat ni en los reportes anónimos.
- El asistente virtual envía los mensajes al servicio configurado en n8n; revisa sus controles de acceso, retención de datos y avisos de privacidad antes de usarlo con personas usuarias.
- La autoevaluación se presenta solo como una reflexión orientativa. La herramienta no sustituye una valoración profesional y su cálculo requiere revisión antes de cualquier uso clínico o institucional.
- Las cuentas administrativas solo se pueden registrar si su correo figura en `ADMIN_EMAILS`. Usa una contraseña única y mantén `JWT_SECRET` fuera del frontend y del control de versiones.
- La sesión administrativa expira en ocho horas y se guarda en una cookie `HttpOnly`; en producción también requiere HTTPS para activar el atributo `Secure`.
- La autenticación protege los datos y las operaciones administrativas de los reportes. La consulta pública por folio solo devuelve el estado y la fecha de actualización; conserva el folio en un lugar seguro, porque no existe recuperación si se pierde.
- La evidencia opcional se limita a imágenes JPG, PNG o WEBP y archivos PDF de hasta 2 MB, y solo puede descargarse desde el panel autenticado. Define y comunica una política de retención y eliminación de reportes antes de usar el sistema en producción.
- Verifica el destino del botón de salida rápida y asegúrate de que sea apropiado y seguro para la población usuaria antes de cada despliegue.

## Próximos pasos

1. Añadir pruebas automatizadas para autenticación, expiración de sesión, formularios y rutas protegidas.
2. Revisar y validar con especialistas el cuestionario, su cálculo de riesgo y los recursos de apoyo.
3. Documentar privacidad, retención y operación del workflow de n8n.
4. Revisar el destino de salida rápida y la configuración de seguridad antes de cada despliegue.
