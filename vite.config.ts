import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Local dev stays at '/'; the Pages deploy workflow injects
// VITE_BASE_PATH=/portafolio/ so the site is served under the repo subpath.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/'
})
