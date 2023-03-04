import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/sass/app.scss",
                "resources/css/app.css",
                "resources/js/app.js",
            ],
            refresh: true,
        }),
    ],
    // Windows、WSL上で実行するときだけ必要か
    server: {
        hmr: {
            host: "localhost",
        },
    },
});
