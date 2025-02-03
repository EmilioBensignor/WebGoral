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

const CANVAS_WIDTH = 1920
const CANVAS_HEIGHT = 550
const VISIBLE_HEIGHT = 300
const BASE_PARTICLE_SIZE = 5
const SIDE_COLS = 30
const BOTTOM_COLS = 14
const SIDE_ROWS = 8
const BOTTOM_ROWS = 2
const SIDE_MARGIN = 50
const CENTER_GAP = 900

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
    const canvasEl = canvas.value
    if (!canvasEl) return

    const particleRadius = (BASE_PARTICLE_SIZE * CANVAS_WIDTH) / 1000
    const randomPosition = particleRadius * 2
    particles = []

    const createParticle = (x, y) => {
        if (Math.random() > 0.3) {
            return new Particle({
                x: x + (Math.random() * randomPosition * 2 - randomPosition),
                y: y + (Math.random() * randomPosition * 2 - randomPosition),
                radius: particleRadius * (0.8 + Math.random() * 0.4),
                minDist: (CANVAS_WIDTH / 20) + Math.random() * (CANVAS_WIDTH / 40),
                pushFactor: 0.03 + Math.random() * 0.04,
                pullFactor: 0.03,
                dampFactor: 0.80 + Math.random() * 0.01
            })
        }
        return null
    }

    const verticalOffset = (CANVAS_HEIGHT - VISIBLE_HEIGHT) / 2
    const sideWidth = (CANVAS_WIDTH - CENTER_GAP) / 2

    // Arilos laterales izquierdos
    const leftColSpacing = sideWidth / (SIDE_COLS - 1)
    const sideRowSpacing = VISIBLE_HEIGHT / (SIDE_ROWS - 1)

    for (let i = 0; i < SIDE_ROWS; i++) {
        for (let j = 0; j < SIDE_COLS; j++) {
            const x = SIDE_MARGIN + (j * leftColSpacing)
            const y = verticalOffset + (i * sideRowSpacing)
            const particle = createParticle(x, y)
            if (particle) particles.push(particle)
        }
    }

    // Arilos laterales derechos
    const rightStart = CANVAS_WIDTH - sideWidth
    for (let i = 0; i < SIDE_ROWS; i++) {
        for (let j = 0; j < SIDE_COLS; j++) {
            const x = rightStart + (j * leftColSpacing)
            const y = verticalOffset + (i * sideRowSpacing)
            const particle = createParticle(x, y)
            if (particle) particles.push(particle)
        }
    }

    // Arilos inferiores
    const bottomStart = CANVAS_HEIGHT - verticalOffset - (VISIBLE_HEIGHT / 4)
    const bottomColSpacing = CANVAS_WIDTH / (BOTTOM_COLS - 1)
    const bottomRowSpacing = (VISIBLE_HEIGHT / 4) / (BOTTOM_ROWS - 1)

    for (let i = 0; i < BOTTOM_ROWS; i++) {
        for (let j = 0; j < BOTTOM_COLS; j++) {
            const x = (j * bottomColSpacing)
            const y = bottomStart + (i * bottomRowSpacing)
            const particle = createParticle(x, y)
            if (particle) particles.push(particle)
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
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

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
    
    // Calculamos la escala actual del canvas
    const scaleX = CANVAS_WIDTH / rect.width
    const scaleY = CANVAS_HEIGHT / rect.height
    
    // Ajustamos las coordenadas considerando la escala
    const x = (clientX - rect.left) * scaleX
    const y = (clientY - rect.top) * scaleY

    cursor.x = Math.min(Math.max(0, x), CANVAS_WIDTH)
    cursor.y = Math.min(Math.max(0, y), CANVAS_HEIGHT)
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
    const canvasEl = canvas.value
    const containerEl = container.value
    if (!canvasEl || !containerEl) return

    canvasEl.width = CANVAS_WIDTH
    canvasEl.height = CANVAS_HEIGHT

    // Calculamos la escala basada en el ancho del contenedor
    const containerWidth = containerEl.clientWidth
    const scale = Math.min(containerWidth / CANVAS_WIDTH, 1)
    
    // Aplicamos la transformación manteniendo el tamaño original
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
        if (window.innerWidth >= 1080) {
            resizeCanvas()
            initParticles()
            animate()
            
            window.addEventListener('resize', resizeCanvas)
            
            const canvasEl = canvas.value
            if (canvasEl) {
                canvasEl.addEventListener('mousemove', handleMouseMove, { passive: false })
                canvasEl.addEventListener('mouseleave', handleEnd)
                canvasEl.addEventListener('touchstart', handleTouch, { passive: false })
                canvasEl.addEventListener('touchmove', handleTouch, { passive: false })
                canvasEl.addEventListener('touchend', handleEnd)
                canvasEl.addEventListener('touchcancel', handleEnd)
            }
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
    height: 600px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: transparent;
    overflow: hidden;
}

canvas {
    position: absolute;
    bottom: -150px;
    left: 50%;
    transform-origin: center center;
    pointer-events: auto;
}

@media (min-width: 1080px) {
    .canvasWrapper {
        display: block;
    }
}
</style>