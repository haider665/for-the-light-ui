import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Use a single source of truth for backend URL. Prefer VITE_API_BASE_URL.
  const target = env.VITE_API_BASE_URL || 'http://localhost:8080'
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': { target, changeOrigin: true },
        '/oauth2': { target, changeOrigin: true },
        '/logout': { target, changeOrigin: true },
        '/user': { target, changeOrigin: true },
        '/csrf': { target, changeOrigin: true },
      },
    },
  }
})