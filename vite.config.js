import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/qa-masterclass/', 
  build: {
    outDir: 'docs' // <-- This tells it to pack the finished website into a "docs" folder
  }
})