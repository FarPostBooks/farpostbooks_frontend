import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, PluginOption } from 'vite'
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
    [visualizer() as PluginOption],
  ],

  server: {
    port: 3001,
  },
  build: {
    target: 'esnext',
  },
  preview: {
    port: 3001,
    host: true,
  },
})
