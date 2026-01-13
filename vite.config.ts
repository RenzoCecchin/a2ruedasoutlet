import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill simple para evitar errores si alguna librería accede a process.env
    'process.env': {}
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});