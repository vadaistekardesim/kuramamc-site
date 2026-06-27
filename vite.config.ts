import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    resolve: {
      alias: [
        // Punycode çağrılarını tamamen boşaltıp, build motorunun hata vermesini engelliyoruz
        { find: "punycode/", replacement: "punycode" },
        { find: "punycode", replacement: "punycode" }
      ],
    },
    build: {
      rollupOptions: {
        // Build motoruna punycode ile ilgili hiçbir şeyi paketlememesini söylüyoruz
        external: ["punycode", "punycode/"],
      },
      chunkSizeWarningLimit: 2000,
    },
    ssr: {
      // Sunucu tarafında bu paketleri aramasını engelle
      external: ["punycode", "tr46"],
      noExternal: [],
    },
  },
});
