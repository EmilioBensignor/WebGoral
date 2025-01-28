<template>
    <section>
        <div class="aboutContainer columnAlignCenter">
            <h2 class="text-primary">{{ $t('about.title') }}</h2>
            <p class="text-center font-medium">{{ $t('about.description') }}</p>
            <div class="infosVideo columnAlignCenter">
                <div class="w-full infosContainer">
                    <button v-for="type in infoTypes" :key="type"
                        class="secondaryButton columnAlignCenter" 
                        :class="{ active: selectedInfo === type }"
                        @click="selectInfo(type)">
                        <Icon :name="`mingcute:${icons[type]}`" class="text-primary" />
                        {{ $t(`about.info.${type}.title`) }}
                    </button>
                </div>
                <div class="imageContainer allCenter">
                    <img :src="`/images/home/${images[selectedInfo]}.webp`" :alt="$t(`about.info.${selectedInfo}.title`)" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            selectedInfo: 'climate',
            icons: {
                climate: 'sun-cloudy-line',
                quality: 'diamond-2-line',
                location: 'location-line'
            },
            images: {
                climate: 'clima-ideal-cultivo',
                quality: 'calidad-garantizada',
                location: 'ubicacion-estrategica'
            }
        }
    },
    computed: {
        infoTypes() {
            return ['climate', 'quality', 'location']
        }
    },
    methods: {
        selectInfo(type) {
            this.selectedInfo = type;
        }
    }
}
</script>

<style scoped>
.aboutContainer > p {
    max-width: 330px;
}

.infosVideo {
    max-width: 442px;
    gap: 1.25rem;
}

.infosContainer {
    display: flex;
    align-items: stretch;
    gap: 0.2rem;
}

.infosContainer button {
    width: 33%;
    justify-content: space-evenly;
    gap: 0.375rem;
    font-size: 0.75rem;
    padding: 0.5rem;
}

.imageContainer {
    width: 100%;
    overflow: hidden;
}

.imageContainer img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@media (width >=700px) {
    .aboutContainer>p {
        max-width: 524px;
    }

    .infosVideo {
        max-width: 550px;
        gap: 2rem;
    }

    .infosContainer {
        gap: 1.5rem;
    }

    .infosContainer button {
        gap: 0.75rem;
        font-size: 0.875rem;
        padding: 0.75rem 0.5rem;
    }

    .infosContainer button span {
        font-size: 1.25rem !important;
    }
}

@media (width >=1080px) {
    .aboutContainer>p {
        max-width: 570px;
    }

    .infosVideo {
        width: 100%;
        max-width: 922px;
        flex-direction: row;
        justify-content: center;
        gap: 2.75rem;
    }

    .infosContainer {
        max-width: 160px;
        flex-direction: column;
        gap: 2rem;
    }

    .infosContainer button {
        width: 100%;
        justify-content: center;
        font-size: 1.125rem;
        padding: 1rem 1.25rem;
    }

    .infosContainer button:hover {
        border-bottom-width: 3px;
    }

    .infosContainer button span {
        font-size: 1.375rem !important;
    }
}

@media (width >=1440px) {
    .infosVideo {
        max-width: 980px;
        gap: 3.875rem;
    }
    
    .infosContainer {
        max-width: 200px;
    }

    .infosContainer button {
        font-size: 1.25rem;
    }

    .infosContainer button span {
        font-size: 1.5rem !important;
    }
}
</style>