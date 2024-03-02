// plugins/Engine.js
import * as THREE from 'three';

class Engine {
  constructor(ref) {
    const canvas = ref.current;

    this.scene = new THREE.Scene();
    this.textureLoader = new THREE.TextureLoader();
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);

    this.controls = new THREE.OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.clock = new THREE.Clock();
  }

  init() {
    this.camera.position.z = 5;

    const geometry = this.getGeometry();
    this.scene.add(geometry);

    this.update();
  }

  update() {
    const elapsedTime = this.clock.getElapsedTime();

    this.controls.update();

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(this.update.bind(this));
  }

  getGeometry() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(geometry, material);
  }
}
