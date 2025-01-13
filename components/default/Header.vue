<template>
  <header>
    <div class="rowCenter">
      <button class="hamburger" @click="toggleDrawer" aria-label="Open or close menu">
        <Icon size="1.25rem" name="mingcute:menu-line" />
      </button>
      <NuxtLink :to="routes.HOME">
        <NuxtImg class="logo" src="/images/Logo-Goral.svg" alt="Logo Infosystema" />
      </NuxtLink>
      <div class="menuSidebar">
        <Drawer :visible="drawerMenu" :modal="true" :dismissable="true" :closeOnEscape="true" class="column"
          @hide="closeDrawer">
          <template #header>
            <button @click="closeDrawer" class="closeButton allCenter">
              <Icon size="1.25rem" name="mingcute:close-line" class="text-primary" />
            </button>
          </template>
          <nav class="w-full h-full navMenu columnSpaceBetween">
            <ul class="column">
              <li v-for="(item, index) in menu" :key="index">
                <NuxtLink :to="item.route">{{ item.label }}</NuxtLink>
              </li>
            </ul>
          </nav>
        </Drawer>
      </div>
      <div class="allCenter languages">
        <NuxtImg src="/images/arg.svg" class="w-full" />
      </div>
    </div>
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
    }
  },
  watch: {
    $route() {
      this.closeDrawer();
    }
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
    document.addEventListener("keydown", this.handleKeyDown);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
    document.removeEventListener("keydown", this.handleKeyDown);
  },
  methods: {
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
</style>

<style scoped>
.hamburger {
  position: absolute;
  left: 1.125rem;
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
}

.logo {
  width: 5rem;
}

.languages {
  width: 1rem;
  height: 1rem;
  position: absolute;
  right: 1.125rem;
  border: 1px solid var(--dark-color);
  border-radius: 999px;
  cursor: pointer;
}

.navMenu ul {
  gap: 2rem;
}

.navMenu ul li a {
  text-decoration: none;
  color: var(--primary-color);
  font-size: 1rem;
}
</style>