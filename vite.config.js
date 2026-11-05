import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Environnement DOM pour @testing-library/react
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    restoreMocks: true,
  },
})
