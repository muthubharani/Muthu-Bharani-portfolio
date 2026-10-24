import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using a relative base so the build works on GitHub Pages, Netlify,
// Vercel, or any static host without extra path configuration.
export default defineConfig({
  plugins: [react()],
  base: '/Muthu-Bharani-portfolio/',
})
