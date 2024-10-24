import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/2024-2-VK-EDU-Frontend-A-Gaik/',
  build: {
    outDir: 'dist',
  },
});
