import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from "node:path";

export default defineConfig(() => {
    return {
        build: {
            outDir: 'build',
        },
        plugins: [react()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        define: {
            'process.env': process.env
        }
    };
});