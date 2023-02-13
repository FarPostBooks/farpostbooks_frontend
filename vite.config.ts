import path from 'path'

import devtools from 'solid-devtools/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  plugins: [
    solidPlugin(),
    devtools({
      autoname: true,
    }),
  ],

  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
