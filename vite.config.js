import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration Script
 * Links the official React execution plugin and maps asset bundling pipelines.
 */
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000, // Sets a predictable local port for presentation deployment
    host: true, // Allows exposing the server to the local network (great for testing on a phone)
  },
  resolve: {
    alias: {
      // Allows clean relative import path configurations if required later
      '@': '/src',
    },
  },
});