import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Configuración de Vite con el complemento que transforma y recarga componentes React.
export default defineConfig({
  plugins: [react()],
})
