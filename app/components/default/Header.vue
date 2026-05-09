<template>
  <header>
    <div class="rowCenter">
      <button class="hamburger" @click="toggleDrawer" :aria-label="$t('a11y.toggleMenu')">
        <Icon size="1.25rem" name="mingcute:menu-line" />
      </button>
      <NuxtLinkLocale :to="routes.HOME">
        <NuxtImg class="logo" src="/images/Logo-Goral.svg" alt="Goral" width="200" height="44" />
      </NuxtLinkLocale>
      <div class="desktopMenu">
        <nav class="navMenu" :aria-label="$t('a11y.mainNav')">
          <ul class="rowCenter">
            <li v-for="(item, index) in menu" :key="index">
              <button @click="openContact" class="contact-link">{{ $t(item.translationKey) }}</button>
            </li>
          </ul>
        </nav>
        <button @click="toggleLanguages($event)" :aria-label="$t('a11y.toggleLanguages')" class="allCenter languages">
          <Icon :name="`circle-flags:${selectedLanguage.icon}`" />
        </button>
        <ClientOnly>
          <Menu ref="languagesMenu" id="account_menu" :model="languagesMenu" :popup="true">
            <template #item="{ item }">
              <NuxtLink :to="item.to" hreflang="item.hreflang" @click="onLanguageClick">
                <Icon :name="`circle-flags:${item.icon}`" />
                {{ item.label }}
              </NuxtLink>
            </template>
          </Menu>
        </ClientOnly>
      </div>
    </div>
    <ClientOnly>
      <Drawer :visible="drawerMenu" :modal="true" :dismissable="true" :closeOnEscape="true" class="column"
        @hide="closeDrawer">
        <template #header>
          <button @click="closeDrawer" class="closeButton allCenter" :aria-label="$t('a11y.closeMenu')">
            <Icon size="1.25rem" name="mingcute:close-line" class="text-primary" />
          </button>
        </template>
        <nav class="w-full h-full navMenu columnSpaceBetween" :aria-label="$t('a11y.mainNav')">
          <ul class="column">
            <li v-for="(item, index) in menu" :key="index">
              <button @click="openContact(); closeDrawer()" class="contact-link">{{ $t(item.translationKey) }}</button>
            </li>
          </ul>
        </nav>
      </Drawer>
    </ClientOnly>
  </header>
</template>

<script>
import { ROUTES_NAMES } from "~/constants/ROUTES_NAMES";
import { menu } from '~/shared/menu';

export default {
  data() {
    return {
      drawerMenu: false,
      routes: ROUTES_NAMES,
      menu: menu,
      languages: [
        { code: 'es', label: 'Español', icon: 'ar', hreflang: 'es-AR' },
        { code: 'en', label: 'English', icon: 'us', hreflang: 'en-US' },
        { code: 'pt', label: 'Português', icon: 'br', hreflang: 'pt-BR' },
        { code: 'fr', label: 'Français', icon: 'fr', hreflang: 'fr-FR' },
        { code: 'ru', label: 'Русский', icon: 'ru', hreflang: 'ru-RU' }
      ],
      selectedLanguage: { icon: 'ar' },
    }
  },
  computed: {
    languagesMenu() {
      const switchLocalePath = useSwitchLocalePath()
      return this.languages.map(lang => ({
        label: lang.label,
        icon: lang.icon,
        hreflang: lang.hreflang,
        to: switchLocalePath(lang.code),
      }))
    }
  },
  watch: {
    $route() {
      this.closeDrawer();
      const currentLang = this.languages.find(lang => lang.code === this.$i18n.locale);
      this.selectedLanguage = { icon: currentLang?.icon || 'ar' };
    }
  },
  mounted() {
    const currentLang = this.languages.find(lang => lang.code === this.$i18n.locale);
    this.selectedLanguage = { icon: currentLang?.icon || 'ar' };
    document.addEventListener("click", this.handleOutsideClick);
    document.addEventListener("keydown", this.handleKeyDown);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
    document.removeEventListener("keydown", this.handleKeyDown);
  },
  methods: {
    openContact() {
      window.dispatchEvent(new CustomEvent('open-contact-modal'));
    },
    onLanguageClick() {
      this.$refs.languagesMenu?.hide()
    },
    toggleDrawer() {
      this.drawerMenu = !this.drawerMenu;
    },
    closeDrawer() {
      this.drawerMenu = false;
    },
    handleKeyDown(event) {
      if (event.key === "Escape" && this.drawerMenu) {
        this.closeDrawer();
      }
    },
    handleOutsideClick(event) {
      const drawer = document.querySelector(".p-drawer");
      const hamburger = document.querySelector(".hamburger");
      if (
        this.drawerMenu &&
        drawer &&
        !drawer.contains(event.target) &&
        event.target !== hamburger &&
        !hamburger.contains(event.target)
      ) {
        this.closeDrawer();
      }
    },
    toggleLanguages(event) {
      this.$refs.languagesMenu.toggle(event);
    },
  },
}
</script>

<style>
.p-drawer {
  width: 9.25rem !important;
  background: var(--white-color) !important;
  box-shadow: 0px 5px 5px 0px var(--dark-color) !important;
  padding: 0 1.25rem !important;
}

.p-drawer-header {
  display: flex;
  justify-content: flex-end !important;
  padding: 1.125rem 0 !important;
}

.p-drawer-header .p-icon {
  display: none;
}

.p-drawer .closeButton {
  background: none;
  border: none;
  cursor: pointer;
}

.p-drawer-content {
  padding: 1.25rem 0 !important;
}

.p-menu {
  background: var(--white-color) !important;
  border: 1px solid var(--dark-color) !important;
  border-radius: 10px !important;
  min-width: 10rem !important;
  padding: 0.5rem !important;
  margin-top: 0.5rem;
}

.p-menu a {
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  background: none !important;
  border: none !important;
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--dark-color);
  text-decoration: none;
  transition: background-color 0.3s !important;
  cursor: pointer !important;
  padding: 0.5rem 1rem !important;
}

.p-menu a:hover {
  background-color: #f0f0f0 !important;
}

.p-menu a span {
  border: 1px solid var(--dark-color);
  border-radius: 999px;
  font-size: 1.8755rem !important;
}

.p-menu-list {
  padding: 0 !important;
  margin: 0 !important;
  list-style: none !important;
}

.p-menuitem {
  margin-bottom: 0.25rem !important;
}

.p-menuitem:last-child {
  margin-bottom: 0 !important;
}

@media (width >=1080px) {
  .p-menu a {
    gap: 1rem !important;
    font-size: 1rem;
  }

  .p-menu a span {
    font-size: 2rem !important;
  }
}
</style>

<style scoped>
.hamburger {
  display: none;
  position: absolute;
  left: 1.125rem;
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
}

.logo {
  width: 8rem;
}

.languages {
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 50%;
  right: 1.125rem;
  background: none;
  border: 1px solid var(--dark-color);
  border-radius: 999px;
  transform: translateY(-50%);
  cursor: pointer;
}

.languages span {
  font-size: 1.875rem !important;
}

.desktopMenu .navMenu {
  display: none;
}

.navMenu ul {
  gap: 2rem;
}

.navMenu ul li a, .contact-link {
  background: none;
  border: none;
  text-decoration: none;
  color: var(--primary-color);
  font-size: 1rem;
  cursor: pointer;
}

.contact-link:hover, .contact-link:hover {
  color: var(--primary-color) !important;
}

@media (width >=1080px) {
  header>div {
    justify-content: space-between;
  }

  .hamburger {
    display: none;
  }

  .logo {
    width: 100%;
    height: 2.5rem;
  }

  .desktopMenu {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .desktopMenu .navMenu {
    display: flex;
  }

  .navMenu ul li a, .contact-link {
    font-size: 1.375rem;
  }

  .languages {
    width: 2.5rem;
    height: 2.5rem;
    position: static;
    transform: none;
  }

  .languages span {
    font-size: 2.5rem !important;
  }
}

@media (width >=1440px) {
  .logo {
    height: 3.125rem;
  }

  .desktopMenu {
    gap: 3.25rem;
  }

  .navMenu ul li a, .contact-link {
    font-size: 1.5rem;
  }

  .languages {
    width: 3rem;
    height: 3rem;
  }

  .languages span {
    font-size: 3rem !important;
  }
}
</style>
