<template>
    <section class="bg-gradient">
        <div class="columnAlignCenter">
            <h2>Calendario de cosecha</h2>
            <table class="harvestCalendar">
                <thead>
                    <tr>
                        <th></th>
                        <th v-for="(month, index) in months" :key="index">
                            <p>{{ month }}</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="variety">
                            <p>Acco</p>
                        </td>
                        <td v-for="(month, index) in months" :key="index" class="month"
                            :class="month === 'MAR' ? 'active' : ''">
                            <span v-if="month === 'MAR'" class="accoHarvest"></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="variety">
                            <p>Wonderful</p>
                        </td>
                        <td v-for="(month, index) in months" :key="index" class="month"
                            :class="month === 'ABR' ? 'active' : ''">
                            <span v-if="month === 'ABR'" class="wonderfulHarvest"></span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Barras de progreso -->
            <ClientOnly>
                <div class="w-full progressContainer column">
                    <div>
                        <p>Acco</p>
                        <div class="column">
                            <div class="progressBar">
                                <div class="progress" :style="{ width: accoProgress + '%' }"></div>
                            </div>
                            <p class="timeLeft">{{ accoTimeLeft }}</p>
                        </div>
                    </div>

                    <div>
                        <p>Wonderful</p>
                        <div class="column">
                            <div class="progressBar">
                                <div class="progress" :style="{ width: wonderfulProgress + '%' }"></div>
                            </div>
                            <p class="timeLeft">{{ wonderfulTimeLeft }}</p>
                        </div>
                    </div>
                </div>
            </ClientOnly>

            <button class="secondaryButton active">Pedí más información</button>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            months: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN-DIC'],
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
                timeLeft: `Faltan ${months} meses y ${days} días`,
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
    max-width: 400px;
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
    width: 15%;
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
    transform: translateX(-55%);
}

.progressContainer {
    width: 100%;
    max-width: 400px;
    gap: 1rem;
}

.progressContainer>div {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}

.progressContainer>div>p {
    width: max-content;
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
    background: var(--primary-gradient);
    border-radius: 999px;
}

.timeLeft {
    text-align: end;
    font-size: 0.625rem;
    font-weight: 500;
}

.secondaryButton:hover {
    border-bottom-width: 3px;
}

@media (width >=1080px) {
    .harvestCalendar {
        max-width: 750px;
    }

    .harvestCalendar th p {
        font-size: 1.125rem;
    }

    .variety {
        padding-right: 1.25rem;
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
        transform: translateX(-52%);
    }

    .progressContainer {
        max-width: 100%;
        flex-direction: row;
        justify-content: center;
        gap: 4.375rem;
    }

    .progressContainer>div {
        width: 50%;
    }

    .progressContainer>div>div {
        gap: 0.5rem;
    }

    .progressBar {
        height: 1.25rem;
        padding: 0 5px;
    }

    .progress {
        height: 0.75rem;
    }

    .timeLeft {
        font-size: 0.875rem;
    }
}
</style>