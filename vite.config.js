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
      output: {
        entryFileNames: "admin-script.js", // The output filename
      },
    },
  },
});
