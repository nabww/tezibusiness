import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Windows terminals can open the project as c:\ or C:\; without this Vite bundles React twice and the page goes blank.
  resolve: { dedupe: ['react', 'react-dom'] },
  server: { host: true, allowedHosts: true },
  preview: { host: true, allowedHosts: true },
})
