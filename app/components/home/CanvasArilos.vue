<template>
    <ClientOnly>
        <div ref="container" class="canvasWrapper">
            <canvas ref="canvas"></canvas>
        </div>
    </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const container = ref(null)
const canvas = ref(null)
let particles = []
const cursor = { x: 9999, y: 9999 }
let animationFrameId = null

const getResponsiveDimensions = () => {
    if (typeof window === 'undefined') {
        return {
            CANVAS_WIDTH: 1920,
            CANVAS_HEIGHT: window?.innerWidth >= 1440 ? 500 : 300,
            VISIBLE_HEIGHT: window?.innerWidth >= 1440 ? 400 : 300,
            BASE_PARTICLE_SIZE: 8,
            SIDE_COLS: 25,
            BOTTOM_COLS: 22,
            SIDE_ROWS: 6,
            BOTTOM_ROWS: 8,
            SIDE_MARGIN: 50,
            CENTER_GAP: 1000
        }
    }

    const width = Math.min(window.innerWidth, 1920)
    const particleSize = 6.5 + ((width - 1080) / (1920 - 1080)) * 1.5
    const gapPercentage = 0.60 - ((width - 1080) / (1920 - 1080)) * 0.1

    return {
        CANVAS_WIDTH: width,
        CANVAS_HEIGHT: width >= 1440 ? 500 : 500,
        VISIBLE_HEIGHT: width >= 1440 ? 400 : 300,
        BASE_PARTICLE_SIZE: particleSize,
        SIDE_COLS: width < 1200 ? 18 : 25,
        BOTTOM_COLS: width < 1200 ? 16 : 22,
        SIDE_ROWS: 6,
        BOTTOM_ROWS: 8,
        SIDE_MARGIN: 50,
        CENTER_GAP: width * gapPercentage
    }
}

let dimensions = getResponsiveDimensions()

class Particle {
    constructor({ x, y, radius, minDist, pushFactor, pullFactor, dampFactor }) {
        this.x = x
        this.y = y
        this.ix = x
        this.iy = y
        this.ax = 0
        this.ay = 0
        this.vx = 0
        this.vy = 0
        this.radius = radius
        this.minDist = minDist
        this.pushFactor = pushFactor
        this.pullFactor = pullFactor
        this.dampFactor = dampFactor

        this.scaleX = 0.9 + Math.random() * 0.2
        this.scaleY = 0.9 + Math.random() * 0.2
        this.rotation = Math.random() * Math.PI * 2

        const ariloImages = [
            '/images/arilos/Goral-Granada-Arilo.png',
            '/images/arilos/Goral-Granada-Arilo-2.png'
        ]
        const randomImage = ariloImages[Math.floor(Math.random() * ariloImages.length)]

        this.image = new Image()
        this.image.src = randomImage
        this.imageLoaded = false
        this.image.onload = () => {
            this.imageLoaded = true
        }
    }

    update() {
        let dx, dy, dd, distDelta

        dx = this.ix - this.x
        dy = this.iy - this.y
        dd = Math.sqrt(dx * dx + dy * dy)

        this.ax = dx * this.pullFactor
        this.ay = dy * this.pullFactor

        dx = this.x - cursor.x
        dy = this.y - cursor.y
        dd = Math.sqrt(dx * dx + dy * dy)

        distDelta = this.minDist - dd

        if (dd < this.minDist) {
            this.ax += (dx / dd) * distDelta * this.pushFactor
            this.ay += (dy / dd) * distDelta * this.pushFactor
        }

        this.vx += this.ax
        this.vy += this.ay

        this.vx *= this.dampFactor
        this.vy *= this.dampFactor

        this.x += this.vx
        this.y += this.vy
    }

    draw(context) {
        if (!this.imageLoaded) return

        context.save()
        context.translate(this.x, this.y)
        context.rotate(this.rotation)
        context.scale(this.scaleX, this.scaleY)

        const size = this.radius * 2
        context.drawImage(
            this.image,
            -size,
            -size,
            size * 2,
            size * 2
        )

        context.restore()
    }
}

const initParticles = () => {
    dimensions = getResponsiveDimensions()
    const canvasEl = canvas.value
    if (!canvasEl) return

    const particleRadius = (dimensions.BASE_PARTICLE_SIZE * dimensions.CANVAS_WIDTH) / 1000
    const randomPosition = particleRadius * 2
    particles = []

    const createParticle = (x, y, forceCreate = false) => {
        if (forceCreate || Math.random() > 0.3) {
            const randX = Math.random() * randomPosition * 3 - randomPosition * 1.5
            const randY = Math.random() * randomPosition * 3 - randomPosition * 1.5
            return new Particle({
                x: x + randX,
                y: y + randY,
                radius: dimensions.BASE_PARTICLE_SIZE * (0.8 + Math.random() * 0.4),
                minDist: 80 + Math.random() * 40,
                pushFactor: 0.03 + Math.random() * 0.04,
                pullFactor: 0.03,
                dampFactor: 0.80 + Math.random() * 0.01
            })
        }
        return null
    }

    const verticalMargin = dimensions.BASE_PARTICLE_SIZE * 4
    const verticalOffset = (dimensions.CANVAS_HEIGHT - dimensions.VISIBLE_HEIGHT) / 2 + verticalMargin
    const sideWidth = (dimensions.CANVAS_WIDTH - dimensions.CENTER_GAP) / 2

    const leftColSpacing = sideWidth / (dimensions.SIDE_COLS - 1)
    const sideRowSpacing = (dimensions.VISIBLE_HEIGHT - verticalMargin * 2) / (dimensions.SIDE_ROWS - 1)

    for (let i = 0; i < dimensions.SIDE_ROWS; i++) {
        for (let j = 0; j < dimensions.SIDE_COLS; j++) {
            const x = dimensions.SIDE_MARGIN + (j * leftColSpacing)
            const y = verticalOffset + (i * sideRowSpacing)
            const particle = createParticle(x, y)
            if (particle) particles.push(particle)
        }
    }

    const rightStart = dimensions.CANVAS_WIDTH - sideWidth
    for (let i = 0; i < dimensions.SIDE_ROWS; i++) {
        for (let j = 0; j < dimensions.SIDE_COLS; j++) {
            const x = rightStart + (j * leftColSpacing)
            const y = verticalOffset + (i * sideRowSpacing)
            const particle = createParticle(x, y)
            if (particle) particles.push(particle)
        }
    }

    const bottomStart = dimensions.CANVAS_HEIGHT - (dimensions.VISIBLE_HEIGHT / 2) - verticalMargin
    const bottomColSpacing = dimensions.CANVAS_WIDTH / (dimensions.BOTTOM_COLS - 1)
    const bottomRowSpacing = (dimensions.VISIBLE_HEIGHT / 3) / (dimensions.BOTTOM_ROWS - 1)

    for (let j = 0; j < Math.floor(dimensions.BOTTOM_COLS / 2); j++) {
        const x = (dimensions.CANVAS_WIDTH / 4) + (j * bottomColSpacing * 2)
        const y = bottomStart
        const particle = createParticle(x, y)
        if (particle) particles.push(particle)
    }

    for (let i = 1; i < dimensions.BOTTOM_ROWS; i++) {
        for (let j = 0; j < dimensions.BOTTOM_COLS * 1.2; j++) {
            const x = (j * bottomColSpacing * 0.8)
            const y = bottomStart + (i * bottomRowSpacing * 1.2)
            if (Math.random() > 0.3) {
                const particle = createParticle(x, y, true)
                if (particle) particles.push(particle)
            }
        }
    }
}

const animate = () => {
    const canvasEl = canvas.value
    if (!canvasEl) return

    const context = canvasEl.getContext('2d', {
        alpha: false,
        desynchronized: true
    })
    if (!context) return

    context.fillStyle = '#FDF9F9'
    context.fillRect(0, 0, dimensions.CANVAS_WIDTH, dimensions.CANVAS_HEIGHT)

    particles.forEach(particle => {
        particle.update()
        particle.draw(context)
    })

    animationFrameId = requestAnimationFrame(animate)
}

const updateCursorPosition = (clientX, clientY) => {
    const canvasEl = canvas.value
    if (!canvasEl) return

    const rect = canvasEl.getBoundingClientRect()

    const scaleX = dimensions.CANVAS_WIDTH / rect.width
    const scaleY = dimensions.CANVAS_HEIGHT / rect.height

    const x = (clientX - rect.left) * scaleX
    const y = (clientY - rect.top) * scaleY

    cursor.x = Math.min(Math.max(0, x), dimensions.CANVAS_WIDTH)
    cursor.y = Math.min(Math.max(0, y), dimensions.CANVAS_HEIGHT)
}

const handleTouch = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    if (touch) {
        updateCursorPosition(touch.clientX, touch.clientY)
    }
}

const handleMouseMove = (e) => {
    if (e.touches) return
    e.preventDefault()
    updateCursorPosition(e.clientX, e.clientY)
}

const handleEnd = () => {
    cursor.x = 9999
    cursor.y = 9999
}

const resizeCanvas = () => {
    dimensions = getResponsiveDimensions()
    const canvasEl = canvas.value
    const containerEl = container.value
    if (!canvasEl || !containerEl) return

    canvasEl.width = dimensions.CANVAS_WIDTH
    canvasEl.height = dimensions.CANVAS_HEIGHT

    containerEl.style.height = `${dimensions.CANVAS_HEIGHT}px`

    const containerWidth = containerEl.clientWidth
    const scale = Math.min(containerWidth / dimensions.CANVAS_WIDTH, 1)

    canvasEl.style.transform = `translateX(-50%) scale(${scale})`

    const context = canvasEl.getContext('2d', {
        alpha: false,
        desynchronized: true
    })
    if (context) {
        context.imageSmoothingEnabled = true
        context.imageSmoothingQuality = 'high'
    }
}

onMounted(() => {
    nextTick(() => {
        dimensions = getResponsiveDimensions()
        resizeCanvas()
        initParticles()
        animate()

        window.addEventListener('resize', () => {
            resizeCanvas()
            initParticles()
        })

        const canvasEl = canvas.value
        if (canvasEl) {
            canvasEl.addEventListener('mousemove', handleMouseMove, { passive: false })
            canvasEl.addEventListener('mouseleave', handleEnd)
            canvasEl.addEventListener('touchstart', handleTouch, { passive: false })
            canvasEl.addEventListener('touchmove', handleTouch, { passive: false })
            canvasEl.addEventListener('touchend', handleEnd)
            canvasEl.addEventListener('touchcancel', handleEnd)
        }
    })
})

onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas)

    const canvasEl = canvas.value
    if (canvasEl) {
        canvasEl.removeEventListener('mousemove', handleMouseMove)
        canvasEl.removeEventListener('mouseleave', handleEnd)
        canvasEl.removeEventListener('touchstart', handleTouch)
        canvasEl.removeEventListener('touchmove', handleTouch)
        canvasEl.removeEventListener('touchend', handleEnd)
        canvasEl.removeEventListener('touchcancel', handleEnd)
    }
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
    }
})
</script>

<style scoped>
.canvasWrapper {
    display: none;
    width: 100%;
    max-width: 1920px;
    height: 400px !important;
    position: absolute;
    top: 5rem;
    left: 50%;
    transform: translateX(-50%);
    background: transparent;
    overflow: hidden;
}

canvas {
    position: absolute;
    top: 0;
    left: 50%;
    transform-origin: top center;
    pointer-events: auto;
}

@media (min-width: 1080px) {
    .canvasWrapper {
        height: 500px !important;
        display: block;
    }
}

@media (min-width: 1440px) {
    .canvasWrapper {
        height: 600px !important;
        top: 10rem;
    }
}

@media (min-width: 1600px) {
    .canvasWrapper {
        height: 700px !important;
    }
}
</style>