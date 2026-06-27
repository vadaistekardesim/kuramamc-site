import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    resolve: {
      tsconfigPaths: true, // Vite'ın native desteğini aktif ettik
    },
    build: {
      rollupOptions: {
        // Hatalı build'leri engellemek için paketleri dışarıdan yönetiyoruz
        external: ['@tanstack/react-start', '@tanstack/start', 'mongodb'],
      },
    },
    ssr: {
      // Server-side paket çözümleme hatalarını önler
      noExternal: ['@tanstack/react-start'],
    },
  },
});
