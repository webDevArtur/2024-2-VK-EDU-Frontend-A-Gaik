import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/2024-2-VK-EDU-Frontend-A-Gaik/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
