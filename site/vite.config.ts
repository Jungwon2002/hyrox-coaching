import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // program.html and coaching.html are hand-written pages, not part of the
    // React entry — without listing them here Vite ships only index.html
    rollupOptions: {
      input: {
        index: path.resolve(import.meta.dirname, "index.html"),
        program: path.resolve(import.meta.dirname, "program.html"),
        coaching: path.resolve(import.meta.dirname, "coaching.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 4173,
    host: true,
  },
  optimizeDeps: {
    include: ["framer-motion"],
  },
});
