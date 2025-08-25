// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  components: {
    // Explicitly enable component auto-imports
    global: true,
    dirs: [
      '~/components'
    ]
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  nitro: {
    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'cache-control': 's-maxage=900' // 15 minutes cache
        }
      }
    }
  },
  routeRules: {
    '/posts/**': {
      swr: 900 // 15 minutes stale-while-revalidate
    }
  }
})