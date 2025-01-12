<template>
    <section>
        <div class="columnAlignCenter">
            <h2 class="text-primary">El corazón de nuestro cultivo</h2>
            <p class="text-center font-medium">
                Ubicada en San Juan, Argentina, nuestra finca se encuentra en un entorno ideal para el cultivo de
                granadas de alta calidad.
            </p>
            <div class="w-full infosContainer">
                <button @click="selectInfo(info.name)" v-for="(info, index) in about" :key="index"
                    class="secondaryButton columnAlignCenter" :class="{ active: selectedInfo == info.name }">
                    <Icon :name="`mingcute:${info.icon}`" class="text-primary" />
                    {{ info.title }}
                </button>
            </div>
            <div class="videoContainer">
                {{ activeInfo }}
            </div>
            <NuxtLink to="#" class="primaryButton">Conocé más de Goral</NuxtLink>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            selectedInfo: 'Clima',
            selectedInfoIndex: 0,
            about: [
                {
                    name: 'Clima',
                    title: 'Clima ideal para el cultivo',
                    icon: 'sun-cloudy-line',
                    video: 'Video clima',
                },
                {
                    name: 'Calidad',
                    title: 'Calidad garantizada',
                    icon: 'diamond-2-line',
                    video: 'Video calidad',
                },
                {
                    name: 'Ubicacion',
                    title: 'Ubicación estratégica',
                    icon: 'location-line',
                    video: 'Video ubicación',
                }
            ],
        }
    },
    computed: {
        activeInfo() {
            return this.about.find(info => info.name === this.selectedInfo).video
        }
    },
    methods: {
        selectInfo(about) {
            this.selectedInfo = about
            this.selectedInfoIndex = 0;
        }
    }
}
</script>

<style scoped>
.infosContainer {
    display: flex;
    align-items: stretch;
    gap: 0.2rem;
}

.infosContainer button {
    width: 33%;
    gap: 0.375rem;
    font-size: 0.75rem;
    padding: 0.5rem;
}
</style>