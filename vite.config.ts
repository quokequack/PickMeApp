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
      '/mal-api': {
        target: 'https://api.myanimelist.net/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mal-api/, ''),
      },
    },
  },
})
