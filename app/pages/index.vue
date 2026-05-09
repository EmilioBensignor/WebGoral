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
}

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  // meta keywords removida — Google la ignora desde 2009
  ogTitle: () => t('seo.ogTitle'),
  ogDescription: () => t('seo.description'),
  ogType: 'website',
  ogImage: 'https://goral.com.ar/images/home/Goral-Granadas-Desktop.webp',
  ogImageAlt: () => t('seo.title'),
  ogLocale: () => ogLocaleMap[locale.value] || 'es_AR',
  ogLocaleAlternate: () => Object.entries(ogLocaleMap)
    .filter(([code]) => code !== locale.value)
    .map(([, og]) => og),
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.ogTitle'),
  twitterDescription: () => t('seo.description'),
  twitterImage: 'https://goral.com.ar/images/home/Goral-Granadas-Desktop.webp',
})

// Schema.org específico de la home: Farm + Productos
useSchemaOrg([
  defineLocalBusiness({
    '@type': ['LocalBusiness', 'Farm'],
    name: 'Goral',
    url: 'https://goral.com.ar',
    image: 'https://goral.com.ar/images/home/Goral-Granadas-Desktop.webp',
    description: () => t('seo.description'),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AR',
      addressRegion: 'San Juan',
    },
    email: 'info@goral.com.ar',
    priceRange: '$$',
  }),
  defineProduct({
    name: 'Granada Acco',
    description: () => `${t('acco.feature1')}. ${t('acco.feature2')}. ${t('acco.feature3')}`,
    image: 'https://goral.com.ar/images/arilos/Goral-Granada-Arilo.png',
    brand: { '@type': 'Brand', name: 'Goral' },
    category: 'Pomegranate / Acco variety',
    countryOfOrigin: 'AR',
  }),
  defineProduct({
    name: 'Granada Wonderful',
    description: () => `${t('wonderful.feature1')}. ${t('wonderful.feature2')}. ${t('wonderful.feature3')}`,
    image: 'https://goral.com.ar/images/arilos/Goral-Granada-Arilo-2.png',
    brand: { '@type': 'Brand', name: 'Goral' },
    category: 'Pomegranate / Wonderful variety',
    countryOfOrigin: 'AR',
  }),
])
</script>
