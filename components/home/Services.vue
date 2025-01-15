<template>
    <section>
        <div class="columnAlignCenter">
            <h2 class="text-primary">Impulsá tu negocio con productos de calidad</h2>
            <Accordion :value="activePanel" @update:activeIndex="activePanel = $event" class="w-full servicesAccordion">
                <AccordionPanel v-for="(service, index) in services" :key="index" :value="index"
                    :class="getPanelBackgroundClass(index)">
                    <AccordionHeader>
                        <h3>{{ service.title }}</h3>
                    </AccordionHeader>
                    <AccordionContent>
                        <div class="columnAlignCenter">
                            <p v-html="service.text"></p>
                            <img :src="`/images/home/${service.video}`" alt="">
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
            <buton class="primaryButton">Consultá ahora</buton>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            activePanel: 0,
            services: [
                {
                    title: "Certificados por Global GAP",
                    text: "<span>Cumplimos con los más altos estándares.</span> Nuestras prácticas agrícolas están certificadas por Global GAP, garantizando productos seguros y responsables.",
                    video: "Video-Service.png",
                    zIndex: 0,
                },
                {
                    title: "Consistencia en tus pedidos",
                    text: "Granadas con el mismo estándar, siempre. Garantizamos que cada lote tenga la <span>misma calidad y tamaño</span> siempre recibas el producto que esperas.",
                    video: "Video-Service.png",
                    zIndex: 1,
                },
                {
                    title: "Importa granadas a tu país",
                    text: "<span>Desde San Juan al mundo.</span> Proveemos un servicio de exportación confiable para que puedas importar el mejor producto a tu mercado.",
                    video: "Video-Service.png",
                    zIndex: 2,
                },
                {
                    title: "Asistencia personalizada",
                    text: "Nuestro equipo te acompaña en cada etapa con <span>atención personalizada</span>, para que nunca estés solo en el proceso.",
                    video: "Video-Service.png",
                    zIndex: 3,
                },
            ],
        }
    },
    methods: {
        getPanelBackgroundClass(index) {
            if (index === this.activePanel) {
                return 'bg-light'
            }

            const backgroundMap = {
                0: {
                    1: 'bg-secondary',
                    2: 'bg-terciary',
                    3: 'bg-dark'
                },
                1: {
                    0: 'bg-secondary',
                    2: 'bg-terciary',
                    3: 'bg-dark'
                },
                2: {
                    0: 'bg-secondary',
                    1: 'bg-terciary',
                    3: 'bg-dark'
                },
                3: {
                    0: 'bg-secondary',
                    1: 'bg-terciary',
                    2: 'bg-dark'
                }
            }

            return backgroundMap[this.activePanel]?.[index] || ''
        }
    }
}
</script>

<style>
.servicesAccordion .p-accordionpanel {
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-radius: 18px 18px 0 0;
    padding: 0.75rem 1rem 1.5rem 1rem;
    margin-bottom: -1rem;
    transition: background-color 0.3s;
}

.servicesAccordion .p-accordionpanel * {
    transition: all 0.3s ease-in-out;
}

.servicesAccordion .p-accordionpanel:first-of-type  {
    border-color: var(--secondary-color);
}

.servicesAccordion .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled):first-of-type>.p-accordionheader:hover {
    color: var(--dark-color);
}

.servicesAccordion .p-accordionpanel:last-child {
    border-radius: 18px;
    padding: 1rem;
    margin-bottom: 0;
}

.servicesAccordion .p-accordionpanel:not(.p-disabled).p-accordionpanel-active {
    border-color: var(--secondary-color);
}

.servicesAccordion .p-accordionheader,
.servicesAccordion .p-accordioncontent-content {
    border: none;
}

.servicesAccordion .p-accordionheader {
    justify-content: center;
}

.servicesAccordion .p-accordionheader h3 {
    font-weight: 300;
    font-size: 0.75rem;
}

.servicesAccordion .p-accordionpanel:not(.bg-light) .p-accordionheader {
    color: var(--white-color);
}

.servicesAccordion .p-accordionpanel:not(.p-disabled).p-accordionpanel-active>.p-accordionheader,
.servicesAccordion .p-accordionpanel:not(.p-disabled).p-accordionpanel-active>.p-accordionheader {
    color: var(--secondary-color) !important;
}

.servicesAccordion .p-accordionpanel:not(.p-disabled).p-accordionpanel-active>.p-accordionheader h3 {
    font-size: 1rem;
}

.servicesAccordion .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled)>.p-accordionheader:hover {
    color: var(--white-color);
}

.servicesAccordion .p-accordionheader-toggle-icon {
    display: none;
}

.servicesAccordion .p-accordioncontent {
    padding: 0.75rem 0 0.5rem 0;
}

.servicesAccordion .p-accordioncontent-content div {
    gap: 1rem;
}

.servicesAccordion .p-accordioncontent-content div p {
    text-align: center;
    font-weight: 500;
    font-size: 0.875rem;
}

.servicesAccordion .p-accordioncontent-content div p span {
    font-weight: bold;
}
</style>