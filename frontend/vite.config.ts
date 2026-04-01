import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/app/components",
      "@pages": "/src/app/pages",
      "@assets": "/src/app/assets",
      "@dto": "/src/tools/dto",
      "@hooks": "/src/tools/hooks",
      "@queries": "/src/tools/hooks/queries",
      "@lib": "/src/tools/lib",
      "@models": "/src/tools/models",
      "@models/enums": "/src/tools/models/enums",
      "@services": "/src/tools/services",
      "@types": "/src/tools/types",
      "@utils": "/src/tools/utils",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/app/scss/variables" as *;`,
      },
    },
  },
});
