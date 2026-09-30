<template>
  <main>
    <HomeHero @open-dialog="openContactDialog" />
    <HomeVariations />
    <HomeCalendar @open-dialog="openContactDialog" />
    <HomeAbout />
    <HomeServices @open-dialog="openContactDialog" />
    <DefaultContacto ref="dialog" />
  </main>
</template>

<script setup>
const dialog = ref(null)

function openContactDialog() {
  dialog.value?.openDialog()
}

onMounted(() => {
  window.addEventListener('open-contact-modal', openContactDialog)
})

onUnmounted(() => {
  window.removeEventListener('open-contact-modal', openContactDialog)
})

const { t, locale } = useI18n()

const ogLocaleMap = {
  es: 'es_AR',
  en: 'en_US',
  pt: 'pt_BR',
  fr: 'fr_FR',
  ru: 'ru_RU',
  nl: 'nl_NL',
}

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  // meta keywords removida — Google la ignora desde 2009
  // mismo string que renderiza el titleTemplate de @nuxtjs/seo en <title>
  ogTitle: () => `${t('seo.title')} | Goral`,
  ogDescription: () => t('seo.description'),
  ogType: 'website',
  ogImage: 'https://www.goral.com.ar/images/home/Goral-Granadas-Desktop.webp',
  ogImageAlt: () => t('seo.title'),
  ogLocale: () => ogLocaleMap[locale.value] || 'es_AR',
  ogLocaleAlternate: () => Object.entries(ogLocaleMap)
    .filter(([code]) => code !== locale.value)
    .map(([, og]) => og),
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${t('seo.title')} | Goral`,
  twitterDescription: () => t('seo.description'),
  twitterImage: 'https://www.goral.com.ar/images/home/Goral-Granadas-Desktop.webp',
})

// Schema.org específico de la home: Farm + Productos
useSchemaOrg([
  defineLocalBusiness({
    '@type': ['LocalBusiness', 'Farm'],
    name: 'Goral',
    url: 'https://www.goral.com.ar',
    image: 'https://www.goral.com.ar/images/home/Goral-Granadas-Desktop.webp',
    description: () => t('seo.description'),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AR',
      addressRegion: 'San Juan',
      addressLocality: 'Pocito',
    },
    email: 'info@goral.com.ar',
    priceRange: '$$',
  }),
  defineProduct({
    '@id': 'https://www.goral.com.ar/#product-acco',
    name: 'Granada Acco',
    description: () => `${t('acco.feature1')}. ${t('acco.feature2')}. ${t('acco.feature3')}`,
    image: 'https://www.goral.com.ar/images/arilos/Goral-Granada-Arilo.webp',
    brand: { '@type': 'Brand', name: 'Goral' },
    category: 'Pomegranate / Acco variety',
    countryOfOrigin: 'AR',
  }),
  defineProduct({
    '@id': 'https://www.goral.com.ar/#product-wonderful',
    name: 'Granada Wonderful',
    description: () => `${t('wonderful.feature1')}. ${t('wonderful.feature2')}. ${t('wonderful.feature3')}`,
    image: 'https://www.goral.com.ar/images/arilos/Goral-Granada-Arilo-2.webp',
    brand: { '@type': 'Brand', name: 'Goral' },
    category: 'Pomegranate / Wonderful variety',
    countryOfOrigin: 'AR',
  }),
])
</script>
