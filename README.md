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

El repositorio contiene una aplicación frontend funcional construida con React y Vite. Las vistas y formularios descritos abajo están disponibles en la interfaz, pero algunas funciones siguen siendo demostrativas:

- `Backend/` está reservado para el backend; actualmente no contiene una API implementada.
- El inicio de sesión y el registro de administración no autentican ni crean cuentas.
- El panel de administración muestra módulos de ejemplo; no guarda ni gestiona información.
- Los formularios de reporte y consulta no envían ni recuperan datos de un servicio.
- La autoevaluación usa un cálculo orientativo local. Sus niveles no representan una matriz oficial ni una escala clínica validada.
- El botón de salida rápida tiene un destino configurado en el frontend. Verifica y reemplaza ese destino antes de publicar el sitio.

## Funciones disponibles

- **Inicio y navegación:** portada con accesos a las secciones principales. La navegación interna utiliza fragmentos de URL, por ejemplo `#centros` o `#ia`.
- **Autoevaluación:** diálogo con los 15 reactivos del mapeo, ponderados por nivel (Advertencia, Reacción y Peligro). Las respuestas positivas priorizan reactivos relacionados; el resultado conserva las conductas identificadas y muestra una puntuación normalizada orientativa.
- **Líneas de escucha:** información de orientación y canales de atención.
- **Centros de ayuda:** directorio y mapa de recursos de apoyo.
- **Módulos preventivos:** materiales y herramientas de prevención.
- **Rutas legales:** información general sobre derechos y opciones de acompañamiento.
- **Asistente virtual:** chat en español conectado a un workflow de n8n.
- **Socios:** presentación de organizaciones colaboradoras.
- **Administración:** pantallas de inicio de sesión, registro y panel visual, aún sin autenticación ni persistencia.
- **Reportes:** interfaces de creación y consulta, aún sin conexión a un backend.
- **Preferencia de tema:** alternancia entre modo claro y oscuro, guardada localmente en el navegador.

## Tecnologías

- React 19
- Vite 8
- JavaScript y CSS
- ESLint
- Chat de n8n cargado desde jsDelivr
- MongoDB 7 definido como infraestructura opcional en `docker-compose.yml`; todavía no está conectado a la aplicación

## Requisitos

- Node.js **20.19 o posterior** o **22.12 o posterior**.
- npm.
- Un navegador moderno.
- Opcional: Docker con Docker Compose para iniciar los contenedores de MongoDB definidos en el repositorio.

## Instalación y ejecución

Los comandos de npm se ejecutan desde la carpeta `Frontend/`.

```sh
cd Frontend
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación, normalmente `http://localhost:5173`.

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
├── Backend/                   # Reservado para el backend (sin API implementada)
├── Frontend/
│   ├── public/                # Recursos estáticos públicos
│   ├── src/
│   │   ├── assets/            # Imágenes y recursos gráficos
│   │   ├── App.jsx            # Navegación y composición principal
│   │   ├── App.css            # Estilos de la aplicación
│   │   ├── Autoevaluacion.jsx # Cuestionario y resultado orientativo
│   │   ├── IA.jsx             # Página del asistente virtual
│   │   └── ...                # Secciones y componentes de la aplicación
│   ├── package.json           # Dependencias y scripts npm
│   └── README.md              # Instrucciones breves del frontend
└── docker-compose.yml         # Definición local de tres nodos MongoDB
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

`docker-compose.yml` define tres procesos MongoDB 7 con el nombre de replica set `rsBanco`, expuestos en los puertos `27017`, `27018` y `27019`. Son una infraestructura local opcional: el archivo no implementa una API, no inicializa por sí solo el replica set y la aplicación frontend no se conecta a estas bases de datos.

Con Docker Compose instalado, los servicios se pueden iniciar y detener desde la raíz del repositorio:

```sh
docker compose up -d
docker compose down
```

No ejecutes el stack de MongoDB a menos que estés trabajando en esa integración.

## Privacidad y seguridad

- No ingreses ni compartas datos personales o información que identifique a alguien en el chat.
- El chat transmite mensajes al workflow configurado en n8n; revisa sus controles de acceso, retención de datos y avisos de privacidad antes de usarlo con personas usuarias.
- La autoevaluación se presenta solo como una reflexión orientativa. La herramienta no sustituye una valoración profesional y su cálculo requiere revisión antes de cualquier uso clínico o institucional.
- El acceso administrativo no está protegido mientras no exista autenticación real en un backend. No publiques información sensible en el panel actual.
- Verifica el destino del botón de salida rápida y asegúrate de que sea apropiado y seguro para la población usuaria antes de cada despliegue.

## Próximos pasos

1. Implementar una API y definir el esquema de datos y permisos.
2. Conectar de forma segura autenticación, administración, reportes y consulta de folios.
3. Configurar MongoDB y su replica set, si se confirma que formará parte de la arquitectura.
4. Revisar y validar con especialistas el cuestionario, su cálculo de riesgo y los recursos de apoyo.
5. Documentar privacidad, retención y operación del workflow de n8n.
6. Agregar pruebas automatizadas para navegación, accesibilidad y flujos principales.
