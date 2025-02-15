<template>
    <div ref="container" class="granadaViewer">
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
    camera.position.set(0, 0, 2); // Aumentamos la distancia de la cámara

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
    controls.minDistance = 12; // Aumentamos la distancia mínima
    controls.maxDistance = 20; // Aumentamos la distancia máxima
    controls.enablePan = false;
    controls.rotateSpeed = 0.8;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;
    controls.minPolarAngle = Math.PI / 2.2; // Ajustamos el ángulo mínimo
    controls.maxPolarAngle = Math.PI / 1.9; // Ajustamos el ángulo máximo

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
            let scale = 3.5;
            if (window.innerWidth > 480) {
                scale = 6;
            } else if (window.innerWidth > 700) {
                scale = 8;
            } else if (window.innerWidth > 992) {
                scale = 10;
            } else if (window.innerWidth > 1440) {
                scale = 12;
            } else if (window.innerWidth >= 1920) {
                scale = 14;
            }

            model.scale.setScalar(scale);
            model.position.copy(center).multiplyScalar(-scale);
            model.position.y -= 0.1;

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
        width: 350px;
        height: 350px;
    }
}

@media (width >=1280px) {
    .granadaViewer {
        width: 400px;
        height: 400px;
    }
}

@media (width >=1440px) {
    .granadaViewer {
        width: 425px;
        height: 425px;
    }
}

@media (width >=1920px) {
    .granadaViewer {
        width: 440px;
        height: 440px;
    }
}
</style>