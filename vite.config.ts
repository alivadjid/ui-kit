import { build, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import typescript2 from "rollup-plugin-typescript2";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    vue(),
    typescript2({
      check: false,
      include: ["src/components/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
        exclude: ["vite.config.ts"],
      },
    }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "./src/ViewerPlugin.ts",
      formats: ["es", "cjs"],
      name: "ViewerPlugin",
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
