// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    css: '/assets/css'
  },
  app: {
  },
  css: ['@/assets/css/main.css'],
})
