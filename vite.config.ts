import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    resolve: {
      tsconfigPaths: true,
    },
    build: {
      rollupOptions: {
        // Build sırasında bu paketleri dışarıdan bağımsız bırakıyoruz,
        // böylece build motoru bunları kendi içine kopyalamaya çalışıp hata vermiyor.
        external: ['mongodb'], 
      },
    },
    ssr: {
      // TanStack paketlerini bundle'a dahil ediyoruz ki runtime'da eksik kalmasınlar,
      // MongoDB'yi ise external bırakıyoruz çünkü native node modülü olarak yüklenmeli.
      noExternal: ['@tanstack/react-start', '@tanstack/start'],
    },
  },
});
