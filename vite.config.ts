import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: { alias: { '@': '/src' } },
  plugins: [react()],
  server: { port: 5173 },
  build: { sourcemap: true },
  base: process.env.GITHUB_PAGES ? '/otus-expense-tracker/' : '/'
})
