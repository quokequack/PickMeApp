import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
  ],
  server: {
    proxy: {
      '/anilist-api': {
        target: 'https://graphql.anilist.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/anilist-api/, ''),
      },

    }
  }
});
