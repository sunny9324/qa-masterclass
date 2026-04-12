import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/qa-masterclass/', // <-- This tells the browser exactly which aisle to look in!
})