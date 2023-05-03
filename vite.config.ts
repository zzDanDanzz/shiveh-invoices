import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts(), react()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/shiveh-invoice.tsx"),
      // the proper extensions will be added
      name: "ShivehInvoice",
      fileName: "shiveh-invoice",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom", "@react-pdf/renderer"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
