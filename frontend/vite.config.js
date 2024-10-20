import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0", // Permet l'accès depuis l'extérieur
    port: 5173, // Assurez-vous que le port correspond
  },
  build: {
    chunkSizeWarningLimit: 1000, // Augmenter la limite de taille
  },
});
