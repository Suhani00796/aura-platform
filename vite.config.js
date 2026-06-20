import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration Script
 * Links the official React execution plugin and maps asset bundling pipelines.
 */
export default defineConfig({
  plugins: [react()],
  base: '/aura-platform/', // Change './' to '/aura-platform/'
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});