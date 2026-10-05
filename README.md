# Proyecto Nebula

Nebula es una plataforma web de orientación y prevención de la violencia contra las mujeres. Reúne información, herramientas de reflexión y accesos a recursos de apoyo en una interfaz que busca ser clara, privada y libre de juicios.

> **Importante:** Nebula es un proyecto informativo en desarrollo. La autoevaluación y el asistente virtual ofrecen orientación general; no son servicios de emergencia, diagnósticos ni sustitutos de atención profesional. Si existe peligro inmediato en México, llama al **911**.

## Contenido

- [Estado actual](#estado-actual)
- [Funciones disponibles](#funciones-disponibles)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Comandos del frontend](#comandos-del-frontend)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Integraciones y configuración](#integraciones-y-configuración)
- [Privacidad y seguridad](#privacidad-y-seguridad)
- [Próximos pasos](#próximos-pasos)

## Estado actual

El repositorio contiene una aplicación frontend React/Vite y una API Express. La autenticación administrativa está implementada y utiliza MongoDB; requiere que Atlas sea accesible y que las variables de entorno estén configuradas. La API informa un estado degradado si la base de datos no está disponible.

Las secciones informativas, el cuestionario y el asistente están disponibles desde la interfaz. Algunas funciones aún son demostrativas: el panel administrativo muestra tarjetas de módulos sin operaciones de gestión conectadas; los formularios de reportes y consulta de folios no persisten ni recuperan información. La autoevaluación es orientativa y no sustituye atención profesional. El destino del botón de salida rápida debe revisarse antes de publicar el sitio.

## Funciones disponibles

- **Inicio y navegación:** portada con accesos a las secciones principales. La navegación interna utiliza fragmentos de URL, por ejemplo `#centros` o `#ia`.
- **Autoevaluación:** diálogo con los 15 reactivos del mapeo, ponderados por nivel (Advertencia, Reacción y Peligro). Las respuestas positivas priorizan reactivos relacionados; el resultado conserva las conductas identificadas y muestra una puntuación normalizada orientativa.
- **Líneas de escucha:** información de orientación y canales de atención.
- **Centros de ayuda:** directorio y mapa de recursos de apoyo.
- **Módulos preventivos:** materiales y herramientas de prevención.
- **Rutas legales:** información general sobre derechos y opciones de acompañamiento.
- **Asistente virtual:** chat en español conectado a un workflow de n8n.
- **Socios:** presentación de organizaciones colaboradoras.
- **Administración:** registro limitado a correos autorizados por el backend, inicio de sesión contra MongoDB, validación de sesión al abrir el panel y cierre de sesión. Las contraseñas se almacenan con hash bcrypt y la sesión se conserva en una cookie `HttpOnly`.
- **Panel administrativo:** tarjetas de demostración para gestionar recursos, revisar solicitudes y consultar la red de colaboradores. Las operaciones de estas tarjetas aún no están conectadas a datos.
- **Reportes:** formularios visuales de creación de reportes anónimos y consulta por folio; todavía no se envían ni recuperan desde la API.
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
- Docker Compose para despliegue local de frontend y backend

## Requisitos

- Node.js **20.19 o posterior** o **22.12 o posterior**.
- npm.
- Un navegador moderno.
- Opcional: Docker con Docker Compose para iniciar el frontend y el backend en contenedores.

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

La API escucha en el puerto `3000` por defecto (se puede cambiar con `PORT`). `GET /health` informa el estado del servidor y MongoDB. Si MongoDB no está configurado o disponible, el servidor sigue iniciando, pero `/health` responde con estado `503` y `"status": "degraded"`. Configura `MONGODB_URI` para conectar MongoDB Atlas; también se acepta `MONGO_URI` por compatibilidad. Si Atlas no conecta, revisa que el clúster esté activo, que las credenciales de base de datos sean correctas y que la IP pública de salida de la máquina donde corre la API esté permitida en **Atlas → Security → Network Access**.

Para habilitar el acceso administrativo, configura en `Backend/.env`:

- `JWT_SECRET`: una clave aleatoria de al menos 32 caracteres; no la compartas ni la incluyas en el frontend.
- `ADMIN_EMAILS`: lista separada por comas de los correos autorizados para crear cuentas administrativas.
- `FRONTEND_URL`: origen exacto del frontend. Usa `http://localhost:5173` con Vite, `http://localhost:8080` con el Docker Compose actual o el dominio del frontend en producción.
- En producción, configura `NODE_ENV=production`, sirve el sitio mediante HTTPS y usa dominios del mismo sitio para frontend y API, de modo que el navegador envíe la cookie `Secure` con `SameSite=Lax`.

Puedes generar `JWT_SECRET` desde `Backend/` con `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"` y copiar el resultado directamente a `Backend/.env`.

El frontend usa `http://localhost:3000` para la API de forma predeterminada. Si la API está en otra dirección, configura `VITE_API_URL` en el entorno del frontend antes de ejecutar Vite o compilar la aplicación. La API permite por defecto solicitudes con credenciales desde `http://localhost:5173`; ajusta `FRONTEND_URL` al origen real del frontend.

### API de autenticación administrativa

| Método | Ruta | Función |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Registra un correo autorizado y crea una sesión. Requiere nombre, correo, contraseña y aceptación de términos. |
| `POST` | `/api/auth/login` | Valida las credenciales y crea una sesión. |
| `GET` | `/api/auth/me` | Valida la cookie de sesión y devuelve el perfil administrativo. |
| `POST` | `/api/auth/logout` | Elimina la cookie de sesión. |

Los intentos de inicio de sesión y registro están limitados por IP. Las credenciales no deben guardarse ni exponerse en el frontend; `Backend/.env` debe mantenerse fuera del control de versiones.

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
│   ├── models/                # Modelo de cuentas administrativas
│   ├── routes/                 # Rutas de autenticación
│   ├── server.js               # API, CORS, MongoDB y health check
│   └── package.json            # Dependencias del backend
├── Frontend/
│   ├── public/                # Recursos estáticos públicos
│   ├── src/
│   │   ├── assets/            # Imágenes y recursos gráficos
│   │   ├── App.jsx            # Navegación y composición principal
│   │   ├── App.css            # Estilos de la aplicación
│   │   ├── Autoevaluacion.jsx # Cuestionario y resultado orientativo
│   │   ├── IA.jsx              # Página del asistente virtual
│   │   ├── Admin.jsx           # Panel administrativo
│   │   ├── LoginAdmin.jsx      # Inicio de sesión
│   │   ├── SingUpAdmin.jsx     # Registro administrativo
│   │   ├── adminAuthApi.js     # Cliente de autenticación
│   │   └── ...                 # Secciones y componentes de la aplicación
│   ├── package.json           # Dependencias y scripts npm
│   └── README.md              # Instrucciones breves del frontend
└── docker-compose.yml         # Servicios de frontend y backend
```

## Integraciones y configuración

### Asistente de n8n

La página de IA carga `@n8n/chat` y sus estilos desde jsDelivr y se conecta a un webhook configurado en `Frontend/src/IA.jsx`. Para que el chat pueda intercambiar mensajes:

1. Activa el workflow correspondiente en n8n.
2. En el nodo **Chat Trigger**, permite mediante CORS los orígenes donde se servirá la aplicación, tanto de desarrollo como de producción.
3. Comprueba que el webhook configurado en el frontend sea el endpoint de producción correcto.
4. Prueba el envío de un mensaje desde cada dominio permitido.

La carga del chat requiere conexión a Internet y disponibilidad de jsDelivr y del servicio de n8n. La URL del webhook está escrita en el código del frontend; antes de desplegar, considera mover la configuración a variables de entorno. Los webhooks publicados en código cliente no deben tratarse como secretos.

### MongoDB

La API se conecta a MongoDB mediante `MONGODB_URI` (o `MONGO_URI`) del archivo `Backend/.env`. `docker-compose.yml` construye el backend y el frontend, y proporciona el archivo de entorno del backend al contenedor. La disponibilidad de la API no garantiza que Atlas sea accesible: configura la lista de acceso de red de Atlas para el entorno desde donde se ejecuta el backend.

Con Docker Compose instalado y `Backend/.env` configurado, los servicios se pueden iniciar y detener desde la raíz del repositorio:

```sh
docker compose up -d
docker compose down
```

El frontend se publica en el puerto `8080` y la API en el `3000`, según el compose actual. Para que las cookies de sesión funcionen en producción, configura dominios/orígenes compatibles, HTTPS y `FRONTEND_URL` según el despliegue.

## Privacidad y seguridad

- No ingreses ni compartas datos personales o información que identifique a alguien en el chat.
- El chat transmite mensajes al workflow configurado en n8n; revisa sus controles de acceso, retención de datos y avisos de privacidad antes de usarlo con personas usuarias.
- La autoevaluación se presenta solo como una reflexión orientativa. La herramienta no sustituye una valoración profesional y su cálculo requiere revisión antes de cualquier uso clínico o institucional.
- Las cuentas administrativas solo se pueden registrar si su correo figura en `ADMIN_EMAILS`. Usa una contraseña única y mantén `JWT_SECRET` fuera del frontend y del control de versiones.
- La sesión administrativa expira en ocho horas y se guarda en una cookie `HttpOnly`; en producción también requiere HTTPS para activar el atributo `Secure`.
- La autenticación protege el acceso al panel, pero las tarjetas de gestión aún son demostrativas y no implementan operaciones de datos ni permisos específicos por módulo.
- Los formularios de reporte y consulta no tienen persistencia en backend; no los uses para recibir información sensible hasta implementar y revisar su almacenamiento y protección.
- Verifica el destino del botón de salida rápida y asegúrate de que sea apropiado y seguro para la población usuaria antes de cada despliegue.

## Próximos pasos

1. Implementar operaciones y permisos para los módulos de recursos, solicitudes y colaboradores del panel.
2. Diseñar y conectar almacenamiento seguro para reportes y consulta por folio.
3. Añadir pruebas automatizadas para autenticación, expiración de sesión, formularios y rutas protegidas.
4. Revisar y validar con especialistas el cuestionario, su cálculo de riesgo y los recursos de apoyo.
5. Documentar privacidad, retención y operación del workflow de n8n.
6. Revisar el destino de salida rápida y la configuración de seguridad antes de cada despliegue.
