<template>
    <section>
        <div class="columnAlignCenter">
            <h2 class="text-primary">{{ $t('services.title') }}</h2>
            <ClientOnly>
                <HomeServiceAccordion :servicesList="servicesList" />
            </ClientOnly>
            <div class="servicesContainer">
                <div class="contentWrapper">
                    <div class="textColumn">
                        <div v-for="(service, key) in servicesList" :key="key" class="serviceText rowCenter"
                            :class="{ inactive: currentService !== key }" :id="`service-${key}`"
                            @intersect="handleIntersect">
                            <div class="column">
                                <h3>{{ $t(`services.items.${key}.title`) }}</h3>
                                <p v-html="formatText($t(`services.items.${key}.text`))"></p>
                            </div>
                        </div>
                    </div>
                    <div class="videoColumn">
                        <div class="stickyWrapper center">
                            <video v-for="(service, key) in servicesList" :key="key"
                                :src="`/videos/home/${service.video}.mp4`" :alt="$t(`services.items.${key}.title`)"
                                :ref="`video-${key}`" class="serviceAnimation"
                                :class="{ active: currentService === key }" preload="auto" muted playsinline></video>
                        </div>
                    </div>
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
                // globalGap: {
                //     video: "certificacion-global-GAP",
                //     zIndex: 0,
                // },
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
            },
            currentService: null,
            previousService: null
        }
    },
    watch: {
        currentService(newValue, oldValue) {
            if (!newValue) return

            this.previousService = oldValue
            this.$nextTick(() => {
                const currentVideo = this.$refs[`video-${newValue}`]?.[0]
                if (currentVideo) {
                    currentVideo.currentTime = 0.5
                    currentVideo.play()
                }

                if (oldValue) {
                    const previousVideo = this.$refs[`video-${oldValue}`]?.[0]
                    if (previousVideo) {
                        previousVideo.pause()
                        previousVideo.currentTime = 0
                    }
                }
            })
        }
    },
    mounted() {
        this.setupIntersectionObserver()
    },
    methods: {
        formatText(text) {
            return text.replace(/\*(.*?)\*/g, '<span>$1</span>')
        },
        setupIntersectionObserver() {
            const options = {
                root: null,
                rootMargin: '-45% 0px -45% 0px',
                threshold: 0.1
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const serviceId = entry.target.id.replace('service-', '')
                        this.currentService = serviceId
                    }
                })
            }, options)

            Object.keys(this.servicesList).forEach(key => {
                const element = document.getElementById(`service-${key}`)
                if (element) observer.observe(element)
            })
        }
    }
}
</script>

<style scoped>
.servicesContainer {
    display: none;
}

@media (width >=1080px) {
    .servicesContainer {
        display: block;
    }

    .contentWrapper {
        display: flex;
        gap: 3.5rem;
    }

    .textColumn {
        flex: 1;
        padding-bottom: 5rem;
    }

    .videoColumn {
        flex: 1;
        position: relative;
        padding-top: 12.5rem;
    }

    .stickyWrapper {
        position: sticky;
        top: 50%;
        transform: translateY(-50%);
    }

    .serviceText {
        min-height: 40vh;
        transition: opacity 0.3s ease;
    }

    .serviceText.inactive {
        opacity: 0.3;
    }

    .serviceText div {
        gap: 0.75rem;
    }

    .serviceText h3 {
        text-align: start;
        color: var(--secondary-color);
    }

    .serviceAnimation {
        width: 100%;
        max-width: 400px;
        display: none;
    }

    .serviceAnimation.active {
        display: block;
    }
}

@media (width >=1080px) {
    .serviceAnimation {
        max-width: 450px;
    }
}

@media (width >=1440px) {
    .videoColumn {
        padding-top: 10rem;
    }
}
</style>