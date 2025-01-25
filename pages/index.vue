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

<script>
export default {
  methods: {
    openContactDialog() {
      this.$refs.dialog?.openDialog()
    }
  }
}
</script>