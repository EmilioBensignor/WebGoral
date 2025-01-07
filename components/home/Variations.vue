<template>
    <section>
        <div class="columnAlignCenter">
            <h2 class="text-primary">Nuestras variedades</h2>
            <img src="/images/home/Granada3d.svg" alt="Granada">
            <div class="variations rowCenter">
                <button class="secondaryButton" :class="{ noActive: selectedVariation !== 'Acco' }"
                    @click="selectVariation('Acco')">
                    Acco
                </button>
                <button class="secondaryButton" :class="{ noActive: selectedVariation !== 'Wonderful' }"
                    @click="selectVariation('Wonderful')">
                    Wonderful
                </button>
            </div>
            <div class="features rowCenter">
                <button v-for="(feature, index) in activeFeatures" :key="index" class="featureBtn allCenter"
                    :class="{ active: selectedFeatureIndex === index }" @click="selectedFeatureIndex = index">
                    <div class="allCenter">
                        <Icon :name="`mingcute:${feature.icon}`" />
                    </div>
                </button>
            </div>
            <div class="w-full featureContent">
                <p class="text-center">{{ activeFeatures[selectedFeatureIndex].descripcion }}</p>
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
            variations: {
                Acco: {
                    features: [
                        { icon: 'star-line', descripcion: 'Característica 1 de Acco' },
                        { icon: 'star-line', descripcion: 'Característica 2 de Acco' },
                        { icon: 'star-line', descripcion: 'Característica 3 de Acco' },
                        { icon: 'star-line', descripcion: 'Característica 4 de Acco' },
                        { icon: 'star-line', descripcion: 'Característica 5 de Acco' }
                    ]
                },
                Wonderful: {
                    features: [
                        { icon: 'star-line', descripcion: 'Característica 1 de Wonderful' },
                        { icon: 'star-line', descripcion: 'Característica 2 de Wonderful' },
                        { icon: 'star-line', descripcion: 'Característica 3 de Wonderful' },
                        { icon: 'star-line', descripcion: 'Característica 4 de Wonderful' },
                        { icon: 'star-line', descripcion: 'Característica 5 de Wonderful' }
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
}

.featureBtn.active span {
    color: var(--white-color);
}
</style>

<style scoped>
.variations {
    gap: 0.75rem;
}

.secondaryButton.noActive {
    border-color: var(--white-color);
    color: var(--dark-color);
}

.features {
    gap: 1.25rem;
}

.featureBtn {
    width: 2.5rem;
    height: 2.5rem;
    background: var(--primary-color);
    border: none;
    border-radius: 999px;
    padding: 1px;
    cursor: pointer;
    transition: all 0.3s;
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
</style>