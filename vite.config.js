import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  build: {
    outDir: "admin/assets/js",
    rollupOptions: {
      input: "./src/index.jsx",
      output: {
        entryFileNames: "admin-script.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "admin-style.css";
          }
          return assetInfo.name;
        },
      },
    },
  },
});
