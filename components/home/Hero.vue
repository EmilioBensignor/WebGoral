<template>
    <section>
        <div class="hero columnAlignCenter">
            <h1>{{ $t('title') }}</h1>
            <p class="text-center font-medium"><span class="text-primary font-bold">{{ $t('pomegranates') }}</span>{{
                $t('subtitle') }}</p>
            <div class="w-full columnAlignCenter">
                <button @click="$emit('open-dialog')" class="primaryButton">{{ $t('ctaHero') }}</button>
                <div class="rowCenter">
                    <NuxtImg src="/images/home/Logo-Global-GAP.svg" />
                    <p class="text-dark-gray font-medium">{{ $t('globalGap') }}</p>
                </div>
            </div>
        </div>
        <DefaultContacto ref="dialog" />
    </section>
</template>

<script>
export default {
    emits: ['open-dialog']
}
</script>

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

@media (width >=700px) {
    .hero {
        gap: 1rem;
    }

    .hero>div {
        gap: 0.875rem;
    }

    .hero>div img {
        width: 1.625rem;
    }
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

@media (width >=1440px) {
    .hero {
        gap: 2.25rem;
    }

    .hero>div {
        gap: 1.75rem;
    }

    .hero>div>div {
        gap: 0.75rem;
    }

    .hero>div p {
        font-size: 1rem;
    }

    .hero>div img {
        width: 2.25rem;
    }
}
</style>