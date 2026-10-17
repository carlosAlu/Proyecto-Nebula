# Frontend de Nebula

Aplicación de una sola página construida con React y Vite.

Desde esta carpeta, ejecuta:

```sh
npm install
npm run dev
```

## Despliegue en Vercel

En Vercel, configura `Frontend` como **Root Directory**. Usa el comando de build
`npm run build` y el directorio de salida `dist`. `vercel.json` reenvía las
peticiones `/api/*` a `https://proyecto-nebula-1.onrender.com`; no agregues el
puerto `10000`, ya que Render lo utiliza internamente y publica la API por HTTPS
en el puerto estándar.

La aplicación usa rutas relativas en producción para que las peticiones y las
cookies administrativas permanezcan en el mismo origen de Vercel. No configures
`VITE_API_URL` en el despliegue normal. Para desarrollo local, el frontend sigue
conectándose a `http://<host>:3000`; se puede definir `VITE_API_URL` en un archivo
`.env.local` si se necesita otra API.

Comandos disponibles:

- `npm run build`: genera la versión de producción en `Frontend/dist`.
- `npm run preview`: sirve localmente la versión de producción.
- `npm run lint`: valida el código del frontend.
