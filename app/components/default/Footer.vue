<template>
  <footer id="footer">
    <div class="bg-secondary">
      <div class="upperFooter rowSpaceBetween">
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
    </div>
    <div class="bg-dark">
      <div class="rights">
        <p class="text-center text-light">© Goral {{ new Date().getFullYear() }}. {{ $t('footer.rights') }}</p>
      </div>
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
          text: "info@goral.com.ar",
          link: "mailto:info@goral.com.ar",
        },
      ],
    }
  }
}
</script>

<style scoped>
.upperFooter {
  gap: 0.75rem;
  padding: 1.5rem 1.25rem;
}

.logo {
  width: 5rem;
}

footer ul {
  gap: 0.75rem;
}

footer ul li a {
  font-family: "Urbanist", sans-serif;
}

footer .contact {
  gap: 0.5rem;
}

.contact li a {
  flex-direction: row-reverse;
  gap: 0.375rem;
}

.rights {
  padding: 0.5rem;
}

@media (width >=700px) {
  .upperFooter {
    padding: 2.25rem 2.5rem;
  }

  .rights {
    padding: 0.75rem;
  }

  .contact li a {
    gap: 0.75rem;
    font-size: 1.125rem;
  }

  .contact li a span {
    font-size: 1.125rem !important;
  }

  .rights p {
    font-size: 0.875rem;
  }
}

@media (width >=1080px) {
  .upperFooter {
    padding: 2.5rem 5rem;
  }

  .logo {
    width: 7.5rem;
  }

  .rights {
    padding: 1rem;
  }

  .contact li a {
    font-size: 1.25rem;
  }

  .contact li a span {
    font-size: 1.375rem !important;
  }

  .rights p {
    font-size: 1rem;
  }
}

@media (width >=1440px) {
  .upperFooter {
    padding: 3.25rem 5.75rem;
  }

  .logo {
    width: 10rem;
  }

  .rights {
    padding: 1.25rem;
  }

  .contact li a {
    font-size: 1.375rem;
  }

  .contact li a span {
    font-size: 1.5rem !important;
  }
}
</style>