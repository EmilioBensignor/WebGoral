<template>
    <section>
        <div class="columnAlignCenter">
            <h2 class="text-primary">{{ $t('services.title') }}</h2>
            <HomeServiceAccordion :servicesList="servicesList" />
            <div class="servicesContainer">
                <div v-for="(service, key) in servicesList" :key="key" class="service rowSpaceBetweenCenter">
                    <div class="column">
                        <h3>{{ $t(`services.items.${key}.title`) }}</h3>
                        <p v-html="formatText($t(`services.items.${key}.text`))"></p>
                    </div>
                    <video :src="`/videos/home/${service.video}.mp4`" :alt="$t(`services.items.${key}.title`)" class="serviceAnimation" autoplay
                        muted playsinline></video>
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
            servicesList: {
                globalGap: {
                    video: "certificacion-global-GAP",
                    zIndex: 0,
                },
                consistency: {
                    video: "consistencia-en-tus-pedidos",
                    zIndex: 1,
                },
                export: {
                    video: "exporta-granadas-al-mundo",
                    zIndex: 2,
                },
                harvest: {
                    video: "cosechas-en-marzo-abril",
                    zIndex: 3,
                }
            }
        }
    },
    methods: {
        formatText(text) {
            return text.replace(/\*(.*?)\*/g, '<span>$1</span>')
        },
    }
}
</script>

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

    .service .serviceAnimation {
        width: 100%;
        max-width: 360px;
    }
}
</style>