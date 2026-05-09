// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ["primeflex/primeflex.min.css", "~/assets/main.css"],
  modules: [
    "@nuxt/image",
    "@nuxt/icon",
    '@nuxtjs/seo',
    'nuxt-anchorscroll',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
  ],
  fonts: {
    defaults: {
      weights: [400, 500, 700, 900],
    }
  },
  icon: {
    size: '1rem',
    serverBundle: {
      collections: ['mingcute', 'circle-flags']
    }
  },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [],
    }
  },
  i18n: {
    vueI18n: '~/i18n.config.ts',
    strategy: 'prefix_except_default',
    defaultLocale: 'es',
    baseUrl: 'https://goral.com.ar',
    locales: [
      { code: 'es', language: 'es-AR', name: 'Español' },
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'pt', language: 'pt-BR', name: 'Português' },
      { code: 'fr', language: 'fr-FR', name: 'Français' },
      { code: 'ru', language: 'ru-RU', name: 'Русский' },
    ],
    bundle: {
      optimizeTranslationDirective: false
    }
  },
  site: {
    url: 'https://goral.com.ar',
    name: 'Goral',
    description: 'Producción y exportación de granadas premium Acco y Wonderful desde San Juan, Argentina. Certificación GLOBALG.A.P., calidad consistente y entregas confiables.',
    defaultLocale: 'es',
  },
  robots: {
    disallow: ['/api/'],
    sitemap: 'https://goral.com.ar/sitemap.xml',
  },
  routeRules: {
    '/**': {
      headers: {
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      }
    }
  },
  image: {
    screens: {
      default: 320,
      xxs: 480,
      xs: 576,
      sm: 768,
      md: 996,
      lg: 1200,
      xl: 1367,
      xxl: 1600,
      '4k': 1921
    },
    domains: ['img.youtube.com', 'i.vimeocdn.com'],
    alias: {
      youtube: 'https://img.youtube.com',
      vimeo: 'https://i.vimeocdn.com',
    }
  },
  vite: {
    optimizeDeps: {
      include: [
        'primevue/config',
        'primevue/toast',
        'primevue/toastservice',
        'primevue/drawer',
        'primevue/menu',
        'primevue/accordion',
        'primevue/accordionheader',
        'primevue/accordioncontent',
        'primevue/accordionpanel',
        'three',
        'three/examples/jsm/loaders/GLTFLoader.js',
        'three/examples/jsm/controls/OrbitControls.js',
        '@unhead/schema-org/vue',
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
  },
})