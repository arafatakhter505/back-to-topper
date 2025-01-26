import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  build: {
    outDir: "admin/assets/js", // Output directory for build
    rollupOptions: {
      input: "./src/index.jsx", // Your entry point
      /*************  ✨ Codeium Command 🌟  *************/
      output: {
        entryFileNames: "admin-script.js", // The output filename
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "admin-style.css";
          }
          return assetInfo.name;
        },
      },
      /******  c2d8f5aa-6f39-46c0-ad1d-6165956e4b73  *******/
    },
  },
});
