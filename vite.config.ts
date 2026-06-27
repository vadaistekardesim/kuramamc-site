// vite.config.ts
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
        // 'mongodb' paketini external bırakıyoruz
        external: ['mongodb'],
      },
    },
    ssr: {
      // TanStack modüllerini SSR için içeriye dahil ediyoruz
      noExternal: ['@tanstack/react-start'],
    },
  },
});
