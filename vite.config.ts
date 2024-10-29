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
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@config": path.resolve(__dirname, "./src/config"),
    },
  },
});
