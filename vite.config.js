// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/project-successful-minds-07/',
  build: {
    sourcemap: true,
    minify: 'esbuild', // Используйте встроенную минификацию
  },
});
