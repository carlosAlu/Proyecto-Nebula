import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// Aplica reglas recomendadas de JavaScript, hooks de React y recarga rápida a JS/JSX.
export default defineConfig([
  // Excluye el resultado compilado de las revisiones de código fuente.
  globalIgnores(['dist']),
  {
    // Habilita reglas compartidas para archivos JavaScript y componentes React.
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    // Expone APIs del navegador y activa la sintaxis JSX para el parser.
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
