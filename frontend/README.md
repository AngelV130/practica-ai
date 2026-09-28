# Talento — frontend de vacantes

Aplicación React para consultar y filtrar las vacantes expuestas por el backend del proyecto.

## Requisitos

- Node.js 22 o superior
- Backend disponible localmente

## Configuración

```bash
cp .env.example .env.local
npm install
npm run dev
```

Variables disponibles:

- `VITE_API_URL`: prefijo que Axios usa para las peticiones. En desarrollo se recomienda `/api/v1`.
- `VITE_API_PROXY_TARGET`: URL del backend local a la que Vite enviará las peticiones `/api`.

Para producción, define `VITE_API_URL` con la URL pública completa del backend o configura el servidor para dirigir `/api` hacia él. Las rutas del SPA deben devolver `index.html` como fallback.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Estructura

```text
src/
├── api/          # Cliente Axios y recursos HTTP
├── components/   # Componentes de layout, vacantes y UI
├── hooks/        # Carga y estado de datos
├── pages/        # Listado, detalle y página 404
├── utils/        # Búsqueda y transformación de datos
├── App.jsx       # Rutas de la aplicación
└── index.css     # Tema global de Tailwind CSS
```
