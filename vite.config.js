import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import WindiCSS from "vite-plugin-windicss";
import { resolve } from "path";

export default defineConfig({
  optimizeDeps: {
    // wasm breaks without this dont ask me why
    exclude: ["@swc/wasm-web"],
  },
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    commonjsOptions: {
      // this is necessary for babel to work
      requireReturnsDefault: "preferred",
    },
  },

  resolve: {
    alias: {
      // this is ALSO necessary for babel to work
      assert: resolve("assert.js"),
    },
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
