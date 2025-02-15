<template>
    <div ref="container" class="granadaViewer" @wheel.prevent>
    </div>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onMounted, onUnmounted, ref } from 'vue';

const container = ref(null);
let camera, scene, renderer, controls;
let model;

onMounted(() => {
    init();
    animate();
});

onUnmounted(() => {
    if (renderer) renderer.dispose();
    if (controls) controls.dispose();
});

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFDF9F9);

    camera = new THREE.PerspectiveCamera(
        35,
        container.value.clientWidth / container.value.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 12);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        alpha: true
    });

    if (container.value) {
        renderer.setSize(container.value.clientWidth, container.value.clientHeight, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.value.appendChild(renderer.domElement);
    }

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.minDistance = 8;
    controls.maxDistance = 15;
    controls.enablePan = false;
    controls.rotateSpeed = 0.8;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;
    controls.minPolarAngle = Math.PI / 2.5;
    controls.maxPolarAngle = Math.PI / 1.8;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, -5, -5);
    scene.add(fillLight);

    const loader = new GLTFLoader();
    loader.load(
        '/models/Granada-Goral.glb',
        (gltf) => {
            model = gltf.scene;

            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            const viewportHeight = container.value.clientHeight;
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = (viewportHeight * 0.016);
            model.scale.setScalar(scale);

            model.position.copy(center).multiplyScalar(-scale);
            model.position.y -= 0.2;

            model.rotation.x = THREE.MathUtils.degToRad(-10);
            model.rotation.y = THREE.MathUtils.degToRad(25);

            scene.add(model);
        },
        undefined,
        (error) => {
            console.error('Error loading GLB:', error);
        }
    );
}

function animate() {
    requestAnimationFrame(animate);
    if (controls) controls.update();
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}
</script>

<style scoped>
.granadaViewer {
    position: relative;
    height: 300px;
    width: 100%;
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
</style>