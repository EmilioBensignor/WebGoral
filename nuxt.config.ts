// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ["primeflex/primeflex.min.css", "~/assets/main.css"],
  modules: [
    "@nuxt/image",
    "@nuxt/icon",
    ['@nuxtjs/seo', {
      ogImage: false
    }],
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
      htmlAttrs: { lang: 'es' },
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
    locales: ['es', 'en', 'fr', 'pt', 'ru'],
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
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'primevue/config',
        'primevue/toast',
        'primevue/button',
        'primevue/dialog',
        'primevue/inputtext',
        'primevue/password',
        'primevue/progressspinner',
        'primevue/drawer',
        'primevue/fileupload',
        'primevue/select',
        'primevue/inputnumber',
        'primevue/textarea',
        'primevue/toastservice',
        'primevue/menu',
        'primevue/accordion',
        'primevue/accordionheader',
        'primevue/accordioncontent',
        'primevue/accordionpanel',
        'three',
        'three/examples/jsm/loaders/GLTFLoader',
        'three/examples/jsm/controls/OrbitControls',
      ],
    },
  },
})