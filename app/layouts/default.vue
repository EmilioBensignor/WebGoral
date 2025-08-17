<template>
  <div class="layout">
    <ClientOnly>
      <DefaultHeader />
    </ClientOnly>
    <slot />
    <DefaultFooter />
  </div>
</template>