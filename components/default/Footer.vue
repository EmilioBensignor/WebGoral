<template>
  <footer>
    <div class="column bg-secondary">
      <NuxtImg src="/images/Logo-Goral-Blanco.svg" alt="Logo Goral" class="logo" />
      <div class="rowSpaceBetween">
        <nav class="w-full h-full navMenu columnSpaceBetween">
          <ul class="column">
            <li v-for="(item, index) in menu" :key="index">
              <NuxtLink :to="item.route" class="text-light font-semibold no-underline">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="w-full">
          <ul class="contact column">
            <li v-for="(item, index) in contact" :key="index">
              <a :href="item.link" class="rowCenter text-light font-miedum no-underline">
                <Icon :name="`mingcute:${item.icon}`" class="text-light" />
                {{ item.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>
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
          icon: "whatsapp-line",
          text: "+54 9 11 1234 5678",
          link: "#",
        },
        {
          icon: "mail-line",
          text: "info@goral.com",
          link: "#",
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

footer > div ul {
  gap: 0.75rem;
}

footer > div ul li a {
  font-family: "Urbanist", sans-serif;
}

footer>div:last-of-type {
  padding: 0.5rem;
}

footer > div .contact {
  gap: 0.5rem;
}

.contact li a {
  flex-direction: row-reverse;
  gap: 0.375rem;
}
</style>