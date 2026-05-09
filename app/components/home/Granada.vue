<template>
    <div ref="container" class="granadaViewer" aria-hidden="true">
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const container = ref(null)
let camera, scene, renderer, controls
let model
let animationId = null
let intersectionObserver = null
let isVisible = false
let prefersReducedMotion = false
let initialized = false
let THREE = null

onMounted(async () => {
    if (typeof window === 'undefined') return

    if (window.matchMedia) {
        prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }

    // Lazy load three.js: solo cuando el viewer es visible
    if ('IntersectionObserver' in window && container.value) {
        intersectionObserver = new IntersectionObserver(async (entries) => {
            for (const entry of entries) {
                isVisible = entry.isIntersecting
                if (isVisible && !initialized) {
                    await initThree()
                    initialized = true
                    startAnimation()
                } else if (isVisible && initialized) {
                    startAnimation()
                } else {
                    stopAnimation()
                }
            }
        }, { rootMargin: '200px' })
        intersectionObserver.observe(container.value)
    } else {
        await initThree()
        initialized = true
        startAnimation()
    }
})

onUnmounted(() => {
    stopAnimation()
    if (intersectionObserver) intersectionObserver.disconnect()
    if (renderer) renderer.dispose()
    if (controls) controls.dispose()
})

async function initThree() {
    const threeModule = await import('three')
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
    const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')
    THREE = threeModule

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xFDF9F9)

    camera = new THREE.PerspectiveCamera(
        35,
        container.value.clientWidth / container.value.clientHeight,
        0.1,
        1000
    )
    camera.position.set(0, 0, 2)

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        alpha: true
    })

    if (container.value) {
        renderer.setSize(container.value.clientWidth, container.value.clientHeight, false)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        container.value.appendChild(renderer.domElement)
    }

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.minDistance = 12
    controls.maxDistance = 20
    controls.enablePan = false
    controls.rotateSpeed = 0.8
    controls.autoRotate = !prefersReducedMotion
    controls.autoRotateSpeed = 2.0
    controls.minPolarAngle = Math.PI / 2.2
    controls.maxPolarAngle = Math.PI / 1.9

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
    fillLight.position.set(-5, -5, -5)
    scene.add(fillLight)

    const loader = new GLTFLoader()
    loader.load(
        '/models/Granada-Goral.glb',
        (gltf) => {
            model = gltf.scene

            const box = new THREE.Box3().setFromObject(model)
            const center = box.getCenter(new THREE.Vector3())
            let scale = 3
            if (window.innerWidth >= 1440) {
                scale = 3.25
            } else if (window.innerWidth >= 992) {
                scale = 3
            } else if (window.innerWidth >= 700) {
                scale = 3
            }

            model.scale.setScalar(scale)
            model.position.copy(center).multiplyScalar(-scale)
            model.position.y -= 0.1

            model.rotation.x = THREE.MathUtils.degToRad(-10)
            model.rotation.y = THREE.MathUtils.degToRad(25)

            scene.add(model)
        }
    )
}

function animate() {
    if (!isVisible) {
        animationId = null
        return
    }
    animationId = requestAnimationFrame(animate)
    if (controls) controls.update()
    if (renderer && scene && camera) {
        renderer.render(scene, camera)
    }
}

function startAnimation() {
    if (animationId || !initialized) return
    animationId = requestAnimationFrame(animate)
}

function stopAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
    }
}
</script>

<style scoped>
.granadaViewer {
    position: relative;
    height: 300px;
    width: 100%;
    max-width: 90vw;
    overflow: hidden;
    touch-action: none;
    background: #FDF9F9;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
    touch-action: none;
}

@media (width >=700px) {
    .granadaViewer {
        width: 350px;
        height: 350px;
        margin: 0;
    }
}

@media (width >=992px) {
    .granadaViewer {
        width: 400px;
        height: 400px;
    }
}

@media (width >=1280px) {
    .granadaViewer {
        width: 450px;
        height: 450px;
    }
}

@media (width >=1440px) {
    .granadaViewer {
        width: 520px;
        height: 520px;
    }
}

@media (width >=1920px) {
    .granadaViewer {
        width: 580px;
        height: 580px;
    }
}
</style>
