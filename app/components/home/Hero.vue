<template>
    <section class="heroSection bgCover">
        <div class="hero columnAlignCenter">
            <h1>{{ $t('title') }}</h1>
            <p class="text-center font-medium"><span class="text-primary font-bold">{{ $t('pomegranates') }}</span>{{
                $t('subtitle') }}</p>
            <div class="w-full columnAlignCenter">
                <button @click="$emit('open-dialog')" class="primaryButton">{{ $t('ctaHero') }}</button>
                <div class="rowCenter">
                    <NuxtImg src="/images/home/Logo-Global-GAP.svg" alt="Logo GLOBALG.A.P." width="30" height="30" />
                    <p class="text-dark-gray font-medium">{{ $t('globalGap') }}</p>
                </div>
            </div>
        </div>
        <HomeCanvasArilos />
        <DefaultContacto ref="dialog" />
    </section>
</template>

<script setup>
defineEmits(['open-dialog'])

// Preload de la imagen de hero correcta segun viewport.
// Mantiene LCP optimizado sin cambiar el background-image visual original.
useHead({
    link: [
        {
            rel: 'preload',
            as: 'image',
            href: '/images/home/Goral-Granadas-Mobile.webp',
            media: '(max-width: 479px)',
            fetchpriority: 'high',
        },
        {
            rel: 'preload',
            as: 'image',
            href: '/images/home/Goral-Granadas-Tablet.webp',
            media: '(min-width: 480px) and (max-width: 699px)',
            fetchpriority: 'high',
        },
        {
            rel: 'preload',
            as: 'image',
            href: '/images/home/Goral-Granadas-Desktop.webp',
            media: '(min-width: 700px) and (max-width: 1079px)',
            fetchpriority: 'high',
        },
    ],
})
</script>

<style scoped>
    .heroSection {
        background-image: url('/images/home/Goral-Granadas-Mobile.webp');
    }

.hero {
    gap: 0.75rem;
    z-index: 2;
    left: 0;
    right: 0;
    margin: 0 auto;
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

@media (width >=480px) {
    .heroSection {
        background-image: url('/images/home/Goral-Granadas-Tablet.webp');
    }
}

@media (width >=700px) {
    .heroSection {
        background-image: url('/images/home/Goral-Granadas-Desktop.webp');
    }

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
    .heroSection {
        height: 50vh;
        position: relative;
        background-image: none;
    }

    .hero {
        width: max-content;
        gap: 1.5rem;
        position: absolute;
        padding: 5rem 1rem 1rem 1rem;
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
