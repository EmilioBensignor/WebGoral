<template>
    <section>
        <div class="columnAlignCenter">
            <h2 class="text-primary">{{ $t('services.title') }}</h2>
            <Accordion :value="activePanel" @update:activeIndex="activePanel = $event" class="w-full servicesAccordion">
                <AccordionPanel v-for="(service, key, index) in servicesList" :key="key" :value="index"
                    :class="[getPanelBackgroundClass(index), { 'p-accordionpanel-active': activePanel === index }]">
                    <AccordionHeader>
                        <h3>{{ $t(`services.items.${key}.title`) }}</h3>
                    </AccordionHeader>
                    <AccordionContent>
                        <div class="columnAlignCenter">
                            <p v-html="formatText($t(`services.items.${key}.text`))"></p>
                            <img :src="`/images/home/${service.video}`" :alt="$t(`services.items.${key}.title`)">
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
            <div class="servicesContainer">
                <div v-for="(service, key) in servicesList" :key="key" class="service rowSpaceBetweenCenter">
                    <div class="column">
                        <h3>{{ $t(`services.items.${key}.title`) }}</h3>
                        <p v-html="formatText($t(`services.items.${key}.text`))"></p>
                    </div>
                    <img :src="`/images/home/${service.video}`" :alt="$t(`services.items.${key}.title`)">
                </div>
            </div>
            <button @click="$emit('open-dialog')" class="primaryButton">{{ $t('services.cta') }}</button>
        </div>
    </section>
</template>

<script>
export default {
    emits: ['open-dialog'],
    data() {
        return {
            activePanel: 0,
            servicesList: {
                globalGap: {
                    video: "Video-Service.png",
                    zIndex: 0,
                },
                consistency: {
                    video: "Video-Service.png",
                    zIndex: 1,
                },
                import: {
                    video: "Video-Service.png",
                    zIndex: 2,
                },
                assistance: {
                    video: "Video-Service.png",
                    zIndex: 3,
                }
            }
        }
    },
    methods: {
        formatText(text) {
            return text.replace(/\*(.*?)\*/g, '<span>$1</span>')
        },
        getPanelBackgroundClass(index) {
            if (index === this.activePanel) {
                return 'bg-light'
            }

            const backgroundClasses = {
                0: ['bg-light', 'bg-secondary', 'bg-terciary', 'bg-dark'],
                1: ['bg-secondary', 'bg-light', 'bg-terciary', 'bg-dark'],
                2: ['bg-secondary', 'bg-terciary', 'bg-light', 'bg-dark'],
                3: ['bg-secondary', 'bg-terciary', 'bg-dark', 'bg-light']
            }

            return backgroundClasses[this.activePanel]?.[index] || ''
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
    transition: all 0.5s;
}

.servicesAccordion .p-accordionpanel:first-of-type {
    border-color: var(--secondary-color);
}

.servicesAccordion .p-accordionpanel:last-child {
    border-radius: 18px;
    padding: 1rem;
    margin-bottom: 0;
}

.servicesAccordion .p-accordionpanel:not(.p-disabled).p-accordionpanel-active {
    border-color: var(--secondary-color);
    transition: all 1.5s;
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
    transition: font-size 0.3s ease-in-out;
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

.servicesAccordion .p-accordionpanel:first-of-type:not(.p-accordionpanel-active):not(.p-disabled)>.p-accordionheader:hover {
    color: var(--dark-color);
}

.servicesAccordion .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled):not(.bg-light)>.p-accordionheader:hover {
    color: var(--white-color);
}

.servicesAccordion .p-accordionheader-toggle-icon {
    display: none;
}

.servicesAccordion .p-accordioncontent {
    height: 0;
    interpolate-size: allow-keywords;
    overflow: hidden;
    opacity: 0;
    padding: 0;
    transition: all 1s;
}

.servicesAccordion .p-accordionpanel-active .p-accordioncontent {
    height: auto;
    interpolate-size: allow-keywords;
    opacity: 1;
    padding: 0.75rem 0 0.5rem 0;
    transition: all 1s;
}

.servicesAccordion .p-accordioncontent-content {
    transition: transform 0.3s ease-in-out;
    transform-origin: top;
}

.servicesAccordion .p-accordioncontent-content div {
    gap: 1rem;
}

.servicesAccordion .p-accordioncontent-content div p {
    text-align: center;
    font-weight: 500;
    font-size: 0.875rem;
}

.servicesAccordion .p-accordioncontent-content div p span,
.service div p span {
    font-weight: bold;
}

@media (width >=700px) {
    .servicesAccordion .p-accordionpanel {
        padding: 1rem 1.5rem 2rem 1.5rem;
    }

    .servicesAccordion .p-accordionpanel:not(.p-disabled).p-accordionpanel-active>.p-accordionheader h3 {
        font-size: 1.25rem;
    }

    .servicesAccordion .p-accordionheader h3 {
        font-size: 0.875rem;
    }

    .servicesAccordion .p-accordionpanel-active .p-accordioncontent {
        padding: 1.25rem 0 0.75rem 0;
    }

    .servicesAccordion .p-accordioncontent-content div {
        flex-direction: row;
        gap: 2rem;
    }

    .servicesAccordion .p-accordioncontent-content div p {
        text-align: start;
        font-size: 1rem;
    }
}

@media (width >=1080px) {
    .servicesAccordion {
        display: none;
    }
}
</style>

<style scoped>
.servicesContainer {
    display: none;
}

@media (width >=1080px) {
    .servicesContainer {
        display: flex;
        flex-direction: column;
        gap: 5rem;
    }

    .service {
        gap: 3.5rem;
    }

    .service div {
        gap: 0.75rem;
    }

    .service h3 {
        text-align: start;
    }

    .service img {
        width: 100%;
        max-width: 360px;
    }
}
</style>