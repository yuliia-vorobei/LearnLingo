import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // (optional) Increases warning limit but doesn't fix the issue
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("firebase")) return "firebase"; // Separate Firebase if it's big
            return "vendor"; // Separate dependencies
          }
        },
      },
    },
  },
});
