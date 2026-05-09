import PrimeVue from 'primevue/config'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Drawer from 'primevue/drawer'
import Menu from 'primevue/menu'
import Accordion from 'primevue/accordion'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import AccordionPanel from 'primevue/accordionpanel'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue)
  nuxtApp.vueApp.use(ToastService)

  nuxtApp.vueApp.component('Toast', Toast)
  nuxtApp.vueApp.component('Drawer', Drawer)
  nuxtApp.vueApp.component('Menu', Menu)
  nuxtApp.vueApp.component('Accordion', Accordion)
  nuxtApp.vueApp.component('AccordionHeader', AccordionHeader)
  nuxtApp.vueApp.component('AccordionContent', AccordionContent)
  nuxtApp.vueApp.component('AccordionPanel', AccordionPanel)
})
