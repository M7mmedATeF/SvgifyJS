import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "Svgify", // The name to expose globally for UMD/IIFE builds
            fileName: (format) => {
                if (format === "cjs") return "index.cjs";
                if (format === "umd") return "index.umd.js";
                return "index.js";
            },
            formats: ["cjs", "umd", "iife"],
        },
        cssMinify: true,
        minify: true,
        emptyOutDir: true,
    },
    plugins: [
        dts({
            outDir: "dist/types", // Specifies the output directory for the .d.ts files
            entryRoot: "src", // Ensures src/ is not reflected in the output structure
        }),
    ],
});
