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

// Listen for contact modal events
onMounted(() => {
  window.addEventListener('open-contact-modal', openContactDialog)
})

onUnmounted(() => {
  window.removeEventListener('open-contact-modal', openContactDialog)
})

useSeoMeta({
  title: 'Goral',
  description: 'Descripción de tu sitio',
  ogTitle: 'Goral',
  ogDescription: 'Descripción para redes sociales',
  ogImage: 'https://goral.com/imagen.jpg',
  twitterCard: 'summary_large_image'
})
</script>