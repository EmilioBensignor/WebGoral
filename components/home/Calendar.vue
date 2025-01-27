<template>
    <section class="bg-gradient">
        <div class="columnAlignCenter">
            <h2>{{ $t("calendar.title") }}</h2>
            <table class="harvestCalendar">
                <thead>
                    <tr>
                        <th></th>
                        <th v-for="i in 6" :key="i">
                            <p>{{ $t(`calendar.months.${i}`) }}</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="variety">
                            <p>Acco</p>
                        </td>
                        <td v-for="i in 6" :key="i" class="month" :class="$t(`calendar.months.${i}`) === $t('calendar.harvestMonth.acco')
                            ? 'active'
                            : ''
                            ">
                            <span v-if="
                                $t(`calendar.months.${i}`) ===
                                $t('calendar.harvestMonth.acco')
                            " class="accoHarvest"></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="variety">
                            <p>Wonderful</p>
                        </td>
                        <td v-for="i in 6" :key="i" class="month" :class="$t(`calendar.months.${i}`) ===
                            $t('calendar.harvestMonth.wonderful')
                            ? 'active'
                            : ''
                            ">
                            <span v-if="
                                $t(`calendar.months.${i}`) ===
                                $t('calendar.harvestMonth.wonderful')
                            " class="wonderfulHarvest"></span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <ClientOnly>
                <div class="w-full progressContainer column">
                    <div>
                        <p>Acco</p>
                        <div class="column">
                            <div class="progressBar">
                                <div class="progress" :style="{ width: accoProgress + '%' }">
                                    <div class="fluidAnimation"></div>
                                </div>
                            </div>
                            <p class="timeLeft">{{ accoTimeLeft }}</p>
                        </div>
                    </div>

                    <div>
                        <p>Wonderful</p>
                        <div class="column">
                            <div class="progressBar">
                                <div class="progress" :style="{ width: wonderfulProgress + '%' }">
                                    <div class="fluidAnimation"></div>
                                </div>
                            </div>
                            <p class="timeLeft">{{ wonderfulTimeLeft }}</p>
                        </div>
                    </div>
                </div>
            </ClientOnly>

            <button @click="$emit('open-dialog')" class="secondaryButton active">{{ $t("calendar.cta") }}</button>
            <DefaultContacto ref="dialog" />
        </div>
    </section>
</template>

<script>
export default {
    emits: ['open-dialog'],
    data() {
        return {
            accoHarvestDate: new Date('2025-02-20'),
            wonderfulHarvestDate: new Date('2025-03-25')
        }
    },

    computed: {
        accoData() {
            return this.calculateTimeLeft(this.accoHarvestDate)
        },

        wonderfulData() {
            return this.calculateTimeLeft(this.wonderfulHarvestDate)
        },

        accoTimeLeft() {
            return this.accoData.timeLeft
        },

        wonderfulTimeLeft() {
            return this.wonderfulData.timeLeft
        },

        accoProgress() {
            return this.accoData.progress
        },

        wonderfulProgress() {
            return this.wonderfulData.progress
        }
    },

    methods: {
        calculateTimeLeft(targetDate) {
            const now = new Date()
            const totalDays = (targetDate - now) / (1000 * 60 * 60 * 24)
            const months = Math.floor(totalDays / 30)
            const days = Math.floor(totalDays % 30)

            // Calcular el progreso (asumiendo 6 meses como período total)
            const totalPeriod = 360 // 6 meses en días
            const progress = 100 - ((totalDays / totalPeriod) * 100)

            return {
                timeLeft: this.$t("calendar.timeLeftText", { months, days }),
                progress: Math.min(Math.max(progress, 0), 100),
            }
        }
    }
}
</script>

<style scoped>
section {
    color: var(--white-color);
}

.harvestCalendar {
    width: 100%;
    border-collapse: collapse;
}

.harvestCalendar tbody {
    margin-top: 0.25rem;
}

.harvestCalendar th p {
    font-size: 0.625rem;
    font-weight: 500;
    padding-bottom: 0.25rem;
}

.variety {
    width: 10%;
    text-align: right;
    padding-right: 1rem;
}

.month {
    border: 1px solid var(--gray-color);
    padding: 3px;
}

.month.active span {
    height: 0.625rem;
    width: 100%;
    display: block;
    position: relative;
    z-index: 1;
    background-color: var(--white-color);
    border-radius: 999px;
}

.accoHarvest {
    transform: translateX(-60%);
}

.month.active .wonderfulHarvest {
    width: 250%;
    transform: translateX(-60%);
}

.progressContainer {
    width: 100%;
    gap: 1rem;
}

.progressContainer>div {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}

.progressContainer>div>p {
    width: 20%;
    text-align: end;
}

.progressContainer>div>div {
    width: 80%;
    gap: 0.25rem;
}

.progressBar {
    width: 100%;
    height: 0.625rem;
    display: flex;
    align-items: center;
    background-color: var(--white-color);
    border-radius: 999px;
    padding: 0 2px;
    overflow: hidden;
}

.progress {
    height: 0.375rem;
    position: relative;
    background: linear-gradient(90deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.1) 100%), var(--primary-gradient);
    border-radius: 999px;

    overflow: hidden;
}

.fluidAnimation {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%);
    animation: fluid 3s ease-in-out infinite;
    transform: translateX(-100%);
}

@keyframes fluid {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

.timeLeft {
    text-align: end;
    font-size: 0.625rem;
    font-weight: 500;
}

@media (width >=700px) {
    .variety {
        padding-right: 1.25rem;
    }

    .variety p {
        font-size: 1.25rem;
        font-weight: 600;
    }

    .harvestCalendar th p {
        font-size: 1rem;
        padding-bottom: 1rem;
    }

    .month {
        width: 5.25rem;
        height: 2.625rem;
    }

    .month.active span {
        height: 1.5rem;
    }

    .month.active .wonderfulHarvest {
        width: 220%;
        transform: translateX(-52%);
    }

    .progressContainer {
        max-width: 440px;
    }

    .progressContainer>div>p {
        font-size: 1.25rem;
    }

    .progressBar {
        height: 1.25rem;
        padding: 0 0.25rem;
    }

    .progress {
        height: 0.875rem;
    }

    .timeLeft {
        font-size: 0.875rem;
        font-weight: 600;
    }
}

@media (width >=1080px) {
    .harvestCalendar {
        max-width: 750px;
    }

    .harvestCalendar th p {
        font-size: 1.125rem;
    }

    .variety p,
    .progressContainer>div>p {
        font-size: 1.375rem;
    }

    .month {
        width: 6.25rem;
        height: 3.125rem;
    }

    .month.active span {
        height: 1.625rem;
    }

    .month.active .wonderfulHarvest {
        width: 215%;
    }

    .progressContainer {
        max-width: 100%;
        flex-direction: row;
        justify-content: center;
        gap: 4.375rem;
    }

    .progressContainer>div {
        width: 50%;
        gap: 1rem;
    }

    .progressContainer>div>div {
        gap: 0.5rem;
    }

    .progressContainer>div>p {
        width: 30%;
    }

    .progressBar {
        height: 1.5rem;
        padding: 0 5px;
    }

    .progress {
        height: 0.875rem;
    }

    .fluidAnimation {
        animation-duration: 4s;
    }
}
</style>