import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: { alias: { '@': '/src' } },
  server: { port: 5173 },
  build: { sourcemap: true },
  base: process.env.GITHUB_PAGES && process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/',
  plugins: [react()]
})
