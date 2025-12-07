import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: "src",
  base: "./",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./src/index.html"),
        category: resolve(__dirname, "./src/categories.html"),
        summary: resolve(__dirname, "./src/summary.html"),
      },
    },
  },
  plugins: [
    VitePWA({
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "apple-touch.icon.png", "icon-512.png"],
      manifest: {
        name: "家計簿",
        short_name: "家計簿",
        description: "my 家計簿 app",
        theme_color: "#FFFFFF",
        icons: [{ src: "icon-512.png", sizes: "512x512", type: "image/png" }],
      },
    }),
  ],
});
