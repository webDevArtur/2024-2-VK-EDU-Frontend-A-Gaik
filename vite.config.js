// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/2024-2-VK-EDU-Frontend-A-Gaik/",  // Указываем базовый путь для развертывания на GitHub Pages
  build: {
    outDir: "dist",  // Указываем папку, в которую будет собираться билд
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://vkedu-fullstack-div2.ru/api',  // Прокси для локальной разработки
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Убираем /api из пути при проксировании
      },
    },
  },
});
