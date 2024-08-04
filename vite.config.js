import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

// const src = path.resolve(__dirname, "resources/ts/*");

export default defineConfig({
  plugins: [
    laravel({
      input: [
        "resources/sass/app.scss",
        "resources/css/app.css",
        "resources/js/app.js",
        "resources/ts/src/features/auth/confirmMail/index.tsx",
        "resources/ts/src/features/auth/login/index.tsx",
        "resources/ts/src/features/auth/register/index.tsx",
        "resources/ts/src/features/auth/registerContract/index.tsx",
        "resources/ts/src/features/product/router/router.tsx",
        "resources/ts/src/features/transaction/router/router.tsx",
      ],

      refresh: true,
    }),
    react(),
  ],
  // Windows、WSL上で実行するときだけ必要か
  // server: {
  //   hmr: {
  //     host: "localhost",
  //   },
  // },

  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      $: "jQuery",
      "@resource": path.resolve(__dirname, "./resources"),
      "@src": path.resolve(__dirname, "./resources/ts/src"),
      "@common": path.resolve(__dirname, "./resources/ts/src/common"),
      "@public": path.resolve(__dirname, "./resources/ts/public"),
    },
  },
});
