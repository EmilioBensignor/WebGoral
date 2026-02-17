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

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  keywords: () => t('seo.keywords'),
  ogTitle: () => t('seo.ogTitle'),
  ogDescription: () => t('seo.description'),
  twitterCard: 'summary_large_image'
})
</script>