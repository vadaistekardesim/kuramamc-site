import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Lovable config'in sunduğu vite alanına eklemeler yapıyoruz
  vite: {
    resolve: {
      alias: {
        // punycode'u boş bir modüle yönlendirerek hatayı "susturuyoruz"
        punycode: "punycode",
      },
    },
    build: {
      rollupOptions: {
        // Hatalı bağımlılığın build'i kırmasını engelle
        external: ["punycode"],
      },
    },
    ssr: {
      // SSR ortamında bu paketi dışarıda tut
      noExternal: ["tr46"],
    },
  },
});
