<template>
    <div ref="container" class="granada-viewer" :style="{ width, height }"></div>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const container = ref(null);
let camera, scene, renderer, controls;
let model;

const props = defineProps({
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '500px'
    }
});

onMounted(() => {
    init();
    animate();
});

onUnmounted(() => {
    if (renderer) {
        renderer.dispose();
    }
    window.removeEventListener('resize', onWindowResize);
});

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera
    camera = new THREE.PerspectiveCamera(
        60,
        container.value.clientWidth / container.value.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 4;
    camera.position.y = 0.5;

    // Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance"
    });

    // Importante: asegurarse de que el contenedor tenga dimensiones
    if (container.value) {
        renderer.setSize(container.value.clientWidth, container.value.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.value.appendChild(renderer.domElement);
    }

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.5;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, -5, -5);
    scene.add(fillLight);

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
        '/models/Granada-Goral.glb',
        (gltf) => {
            model = gltf.scene;
            scene.add(model);

            // Centra el modelo
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            // Ajusta la escala
            const scale = 3.5;
            model.scale.set(scale, scale, scale);

            // Rotación inicial
            model.rotation.x = 0.1;
        },
        undefined,
        (error) => {
            console.error('Error loading GLB:', error);
        }
    );

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    if (container.value && camera && renderer) {
        camera.aspect = container.value.clientWidth / container.value.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.y += 0.005;
    }

    if (controls) controls.update();
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Observar cambios en las props
watch(() => [props.width, props.height], () => {
    if (container.value) {
        onWindowResize();
    }
});
</script>

<style scoped>
.granada-viewer {
    position: relative;
    min-height: 300px;
    display: block;
    overflow: hidden;
    touch-action: none;
    background: #f0f0f0;
}

canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
}
</style>