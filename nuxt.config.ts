// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
  },

  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
      ],
    },
  },

  experimental: {
    typedPages: true,
  },
})
