<template>
    <section>
        <div class="hero columnAlignCenter">
            <h1>Calidad. Frescura. Consistencia.</h1>
            <p class="text-center font-medium"><span class="text-primary font-bold">Granadas</span> seleccionadas con
                entregas
                rápidas y consistentes.</p>
            <div class="w-full columnAlignCenter">
                <NuxtLink to="#" class="primaryButton">Hacé tu pedido ahora</NuxtLink>
                <div class="rowCenter">
                    <NuxtImg src="/images/home/Logo-Global-GAP.svg" />
                    <p class="text-dark-gray font-medium">Certificados por Global GAP</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .hero > div {
        gap: 0.625rem;
    }

    .hero > div > div {
        gap: 0.375rem;
    }

    .hero > div img {
        width: 1.35rem;
    }
</style>