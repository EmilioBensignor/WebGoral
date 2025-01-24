<template>
    <section>
        <div class="columnAlignCenter">
            <h2 class="text-primary">{{ $t('variationsTitle') }}</h2>
            <div class="variationsContainer columnAlignCenter">
                <img src="/images/home/Granada3d.svg" alt="Granada">
                <div class="columnAlignCenter">
                    <div class="variations rowCenter">
                        <button v-for="variation in variationsList" :key="variation" class="secondaryButton"
                            :class="{ active: selectedVariation == variation }" @click="selectVariation(variation)">
                            {{ variation }}
                        </button>
                    </div>
                    <div class="featuresContainer columnAlignCenter">
                        <div class="features rowCenter">
                            <button v-for="(feature, index) in activeFeatures" :key="index" class="featureBtn allCenter"
                                :class="{ active: selectedFeatureIndex === index }"
                                @click="selectedFeatureIndex = index">
                                <div class="allCenter">
                                    <Icon :name="`mingcute:${feature.icon}`" />
                                </div>
                            </button>
                        </div>
                        <div class="w-full featureContent">
                            <p class="text-center">{{ $t(`${selectedVariation.toLowerCase()}.feature${selectedFeatureIndex + 1}`) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            selectedVariation: 'Acco',
            selectedFeatureIndex: 0,
            variationsList: ['Acco', 'Wonderful'],
            variations: {
                Acco: {
                    features: [
                        { icon: 'star-line' },
                        { icon: 'star-line' },
                        { icon: 'star-line' },
                        { icon: 'star-line' },
                        { icon: 'star-line' }
                    ]
                },
                Wonderful: {
                    features: [
                        { icon: 'star-line' },
                        { icon: 'star-line' },
                        { icon: 'star-line' },
                        { icon: 'star-line' },
                        { icon: 'star-line' }
                    ]
                }
            }
        }
    },
    computed: {
        activeFeatures() {
            return this.variations[this.selectedVariation].features
        }
    },
    methods: {
        selectVariation(variation) {
            this.selectedVariation = variation
            this.selectedFeatureIndex = 0;
        }
    }
}
</script>

<style>
.featureBtn span {
    color: var(--primary-color);
    transition: all 0.3s;
}

.featureBtn:hover span {
    color: var(--dark-color);
}

.featureBtn.active span {
    color: var(--white-color);
}
</style>

<style scoped>
.variationsContainer,
.variationsContainer>div,
.features {
    gap: 1.25rem;
}

.variations,
.featuresContainer {
    gap: 0.75rem;
}

.featureBtn {
    width: 2.5rem;
    height: 2.5rem;
    background: var(--primary-color);
    border: none;
    border-radius: 999px;
    padding: 1px;
    transition: all 0.3s;
    cursor: pointer;
}

.featureBtn:hover {
    background: var(--dark-color);
}

.featureBtn div {
    width: 100%;
    height: 100%;
    background: var(--white-color);
    border-radius: 999px;
    padding: 0.625rem;
}

.featureBtn.active,
.featureBtn.active div {
    background: var(--primary-gradient);
}

.featureContent p {
    font-size: 0.875rem;
}

@media (width >=1080px) {
    .variationsContainer {
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
    }

    .variationsContainer > img {
        width: 18.75rem;
    }

    .variationsContainer > div {
        gap: 2.5rem;
    }

    .variations button {
        font-size: 1.375rem;
    }

    .featuresContainer {
        gap: 2rem;
    }

    .features {
        gap: 3rem;
    }

    .featureBtn {
        width: 4.375rem;
        height: 4.375rem;
        transition: all 0.3s;
    }

    .featureBtn span {
        font-size: 1.5rem !important;
    }

    .featureContent p {
        font-size: 1.125rem;
    }
}
</style>