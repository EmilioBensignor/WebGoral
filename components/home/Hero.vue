<template>
    <section>
        <div class="hero columnAlignCenter">
            <h1>Calidad. Frescura. Consistencia.</h1>
            <p class="text-center font-medium"><span class="text-primary font-bold">Granadas</span> seleccionadas con
                entregas
                rápidas y consistentes.</p>
            <div class="w-full columnAlignCenter">
                <button class="primaryButton">Reservá tus granadas</button>
                <div class="rowCenter">
                    <NuxtImg src="/images/home/Logo-Global-GAP.svg" />
                    <p class="text-dark-gray font-medium">Certificados por Global GAP</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.hero {
    gap: 0.75rem;
}

.hero>div {
    gap: 0.625rem;
}

.hero>div>div {
    gap: 0.375rem;
}

.hero>div img {
    width: 1.35rem;
}

@media (width >=1080px) {
    .hero {
        gap: 1.5rem;
    }

    .hero>div {
        gap: 1.25rem;
    }

    .hero>p {
        max-width: 290px;
    }

    .hero>div img {
        width: 1.875rem;
    }
}
</style>