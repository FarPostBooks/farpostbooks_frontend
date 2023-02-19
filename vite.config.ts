import path from 'path'

import devtools from 'solid-devtools/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import solidSvg from 'vite-plugin-solid-svg'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  plugins: [
    solidPlugin(),
    solidSvg({
      defaultAsComponent: true,
    }),
    devtools({
      autoname: true,
    }),
  ],

  server: {
    port: 3000,
    host: 'fblibrary.local',
  },
  build: {
    target: 'esnext',
  },
})
