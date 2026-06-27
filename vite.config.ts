import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    resolve: {
      // tr46'nın "punycode/" isteğini doğrudan "punycode" paketine eşle
      alias: {
        "punycode/": "punycode/",
        "punycode": "punycode"
      },
    },
    build: {
      rollupOptions: {
        // Build motoruna "punycode ile ilgili her şeyi es geç" diyoruz
        external: ["punycode", "punycode/"]
      },
      chunkSizeWarningLimit: 1000
    },
    ssr: {
      // SSR motoruna bu paketleri "external" (dışsal) olarak yüklemesini söyle
      external: ["punycode", "tr46"],
      noExternal: []
    }
  },
});
