import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitesconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitesconfigPaths()],
  server: {
    open: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "https://four.external.iauth.persistence.process.inube.dev",
        changeOrigin: true,
        secure: true,
        headers: {
          Connection: "keep-alive",
        },
        rewrite: (path) =>
          path.replace(/^\/api/, "/iauth-persistence-process-service/api"),
      },
    },
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@ptypes": path.resolve(__dirname, "./src/types"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@validations": path.resolve(__dirname, "./src/validations"),
      "@mocks": path.resolve(__dirname, "./src/mocks"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@design": path.resolve(__dirname, "./src/design"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },
});
