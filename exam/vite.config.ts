import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/2024-2-VK-EDU-Frontend-A-Gaik/",
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://vkedu-fullstack-div2.ru/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
