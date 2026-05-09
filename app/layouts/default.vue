<template>
  <div class="layout">
    <DefaultHeader />
    <slot />
    <DefaultFooter />
  </div>
</template>

<script setup>
// hreflang + lang + dir reactivos por locale
const head = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
})

useHead({
  htmlAttrs: computed(() => head.value.htmlAttrs ?? {}),
  link: computed(() => head.value.link ?? []),
  meta: computed(() => head.value.meta ?? []),
})

// Schema.org base — Organization + WebSite (válido para todas las páginas)
useSchemaOrg([
  defineOrganization({
    name: 'Goral',
    url: 'https://goral.com.ar',
    logo: 'https://goral.com.ar/images/Logo-Goral.svg',
    description: 'Productores y exportadores de granadas premium Acco y Wonderful desde San Juan, Argentina. Certificación GLOBALG.A.P.',
    email: 'info@goral.com.ar',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AR',
      addressRegion: 'San Juan',
    },
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'GGN',
      value: '4069453583276',
    },
  }),
  defineWebSite({
    name: 'Goral',
    url: 'https://goral.com.ar',
    inLanguage: ['es-AR', 'en-US', 'pt-BR', 'fr-FR', 'ru-RU'],
  }),
])
</script>
