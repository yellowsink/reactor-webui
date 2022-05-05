import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  optimizeDeps: {
    // wasm breaks without this dont ask me why
    exclude: ["@swc/wasm-web"],
  },
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },

  plugins: [
    solidPlugin(),
    WindiCSS({
      config: {
        theme: {
          extend: {
            fontFamily: {
              mono: "monospace",
            },
            fontSize: {
              code: [".9rem", "1.1rem"],
            },
          },
        },
      },
    }),
  ],
});
