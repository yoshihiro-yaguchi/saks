import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

const src = path.resolve(__dirname, "resources/ts/src");

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/sass/app.scss",
                "resources/css/app.css",
                "resources/js/app.js",
                src,
                // 'resources/ts/src/index.tsx',
                // "resources/ts/src/features/deliverySlip/deliverySlip.tsx",
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
            "src": path.resolve(__dirname, "resources/ts/src"),
        },
    },
});
