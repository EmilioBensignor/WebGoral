<template>
    <div ref="container" class="granadaViewer" :style="{ width }"></div>
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
    scene.background = new THREE.Color(0xFDF9F9);

    // Camera
    camera = new THREE.PerspectiveCamera(
        40, // FOV más reducido para mejor vista
        container.value.clientWidth / container.value.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0.5, 8); // Ajustada posición y distancia

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
    const ambientLight = new THREE.AmbientLight(0xFDF9F9, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFDF9F9, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xFDF9F9, 0.3);
    fillLight.position.set(-5, -5, -5);
    scene.add(fillLight);

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
        '/models/Granada-Goral.glb',
        (gltf) => {
            model = gltf.scene;

            // Centra el modelo
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            // Ajusta la escala para llenar el espacio disponible
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3.5 / maxDim; // Ajustamos la escala
            model.scale.setScalar(scale);

            // Centra el modelo en el origen
            model.position.copy(center).multiplyScalar(-1);
            model.position.y = 0; // Eliminamos el offset vertical

            scene.add(model);

            // Ajustamos los límites de rotación vertical
            controls.minPolarAngle = Math.PI / 3; // 60 grados
            controls.maxPolarAngle = Math.PI / 1.5; // 120 grados
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
canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
}

.granadaViewer {
    height: 300px;
    overflow: hidden;
    touch-action: none;
    background: #FDF9F9;
}

/* Diseño responsivo */
@media (min-width: 768px) {
    .granadaViewer {
        height: 400px;
    }
}

@media (min-width: 1024px) {
    .granadaViewer {
        height: 500px;
    }
}

@media (min-width: 1440px) {
    .granadaViewer {
        height: 600px;
    }
}
</style>