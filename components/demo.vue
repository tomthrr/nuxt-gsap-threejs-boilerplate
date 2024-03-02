<template>
  <div class="demo-container" ref="parentContainer">
    <div id="three-container" ref="threeContainer"></div>
  </div>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { onMounted } from 'vue';

const parentContainer = ref(null);
const threeContainer = ref(null);
console.log(threeContainer.value);

const sizes = {
  width: 0,
  height: 0
}

onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  // prends toute la taille dispo dans le container
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color('white'), 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  threeContainer.value.appendChild(renderer.domElement);

  const material = new THREE.MeshStandardMaterial()
  material.roughness = 0.4

  const boxGeometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
  const cube = new THREE.Mesh(boxGeometry, material);
  scene.add(cube);
  cube.position.x = -2;
  cube.position.y = -2;

  const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
  const sphere = new THREE.Mesh(sphereGeometry, material);
  scene.add(sphere);
  sphere.position.x = 2;
  sphere.position.y = -2;

  const torusGeometry = new THREE.TorusGeometry(0.6, 0.2, 16, 100);
  const torus = new THREE.Mesh(torusGeometry, material);
  scene.add(torus);
  torus.position.x = 0;
  torus.position.y = 2;

  camera.position.z = 5;

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true

  const clock = new THREE.Clock();

  /**
   * Lights
   */

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(3, 4, 4);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.camera.far = 15;
  scene.add(directionalLight);

  /**
   * Sizes
   */

  window.addEventListener('resize', () =>
  {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  })

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    cube.rotation.y = elapsedTime;

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };
  tick();
});
</script>
<style lang="scss" scoped>
.demo-container {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #86A7FC;

  .three-container {
    z-index: 0;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
}
</style>
