import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom')) return 'react-vendor';
            if (id.includes('react-dom') || id.includes('/react/')) return 'react-vendor';
            // Les autres paquets (passkeys, pays…) suivent le code qui les utilise : chargés à la demande
            return undefined;
          }
        },
      },
    },
  },
})
