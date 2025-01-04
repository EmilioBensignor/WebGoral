<template>
    <section>
        <div class="columnAlignCenter">
            <h2 class="text-primary">Nuestras variedades</h2>
            <img src="/images/home/Granada3d.svg" alt="">
            <div class="variedades rowCenter">
                <button class="secondaryButton">Acco</button>
                <button class="secondaryButton noActive">Wonderful</button>
            </div>
            <div>
                <button v-for="(caracteristica, index) in caracteristicas" :key="index"></button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            caracteristicas: [],
        }
    }
}
</script>

<style scoped>
    .variedades {
        gap: 0.75rem;
    }

    .secondaryButton.noActive {
        border-color: var(--white-color);
        color: var(--dark-color);
    }
</style>