<template>
  <footer id="footer">
    <div class="rowSpaceBetween bg-secondary">
      <NuxtImg src="/images/Logo-Goral-Blanco.svg" alt="Logo Goral" class="logo" />
      <ul class="contact column">
        <li v-for="(item, index) in contact" :key="index">
          <a :href="item.link" class="rowCenter text-light font-miedum no-underline">
            <Icon :name="`mingcute:${item.icon}`" class="text-light" />
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>
    <div class="bg-dark">
      <p class="text-center text-light">© Goral 2024. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script>
import { menu } from '~/shared/menu';

export default {
  data() {
    return {
      menu: menu,
      contact: [
        {
          icon: "mail-line",
          text: "info@goral.com",
          link: "mailto:info@goral.com",
        },
      ],
    }
  }
}
</script>

<style scoped>
footer>div:first-of-type {
  gap: 0.75rem;
  padding: 1.5rem 1.25rem;
}

.logo {
  width: 5rem;
}

footer>div ul {
  gap: 0.75rem;
}

footer>div ul li a {
  font-family: "Urbanist", sans-serif;
}

footer>div:last-of-type {
  padding: 0.5rem;
}

footer>div .contact {
  gap: 0.5rem;
}

.contact li a {
  flex-direction: row-reverse;
  gap: 0.375rem;
}
</style>