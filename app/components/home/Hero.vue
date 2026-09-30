<template>
    <section class="heroSection">
        <!-- asumo: >=1080 el hero no lleva imagen (antes background-image: none), el gif vacío evita descargarla -->
        <picture class="heroBg">
            <source media="(min-width: 1080px)" srcset="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
            <source media="(min-width: 700px)" srcset="/images/home/Goral-Granadas-Desktop.webp" width="1080" height="280" />
            <source media="(min-width: 480px)" srcset="/images/home/Goral-Granadas-Tablet.webp" width="700" height="280" />
            <img src="/images/home/Goral-Granadas-Mobile.webp" alt="" width="480" height="280" fetchpriority="high" loading="eager" />
        </picture>
        <div class="hero columnAlignCenter">
            <h1>{{ $t('title') }}</h1>
            <p class="text-center font-medium"><span class="text-primary font-bold">{{ $t('pomegranates') }}</span>{{
                $t('subtitle') }}</p>
            <div class="w-full columnAlignCenter">
                <button @click="$emit('open-dialog')" class="primaryButton">{{ $t('ctaHero') }}</button>
                <div class="rowCenter">
                    <NuxtImg src="/images/home/Logo-Global-GAP.svg" alt="" width="30" height="30" />
                    <p class="text-dark-gray font-medium">{{ $t('globalGap') }}</p>
                </div>
            </div>
        </div>
        <HomeCanvasArilos />
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
    position: relative;
}

.heroBg img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.hero {
    position: relative;
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
    .heroSection {
        height: 50vh;
    }

    .heroBg {
        display: none;
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
