import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/sass/app.scss",
                "resources/css/app.css",
                "resources/js/app.js",
                'resources/ts/src/index.tsx',
            ],

            refresh: true,
        }),
        react(),
    ],
    // Windows、WSL上で実行するときだけ必要か
    server: {
        hmr: {
            host: "localhost",
        },
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
            $: "jQuery",
        },
    },
});
