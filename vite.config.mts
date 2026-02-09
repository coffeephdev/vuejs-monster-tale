import { fileURLToPath, URL } from 'url'

export default async () => {
  const { defineConfig } = await import('vite')
  const { default: vue } = await import('@vitejs/plugin-vue')
  const { default: vueJsx } = await import('@vitejs/plugin-vue-jsx')

  return defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  })
}