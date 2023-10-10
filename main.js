import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Color, AxesHelper } from "three";
// Scene
const scene = new THREE.Scene();
scene.background = new Color("lightgray");
const axesHelper = new AxesHelper(5);
scene.add(axesHelper);

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(5,10,10);
camera.lookAt(0, 0, 0);
camera.rotation.x = -Math.PI / 4;
// camera.rotation.x = degrees_to_radians(45);

// Render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0x404040, 8); //color, intensity
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);
// const spotLight = new THREE.SpotLight(0xffffff);
// spotLight.position.set(100, 1000, 100);

// glTF Loader
const loader = new GLTFLoader();
loader.load(
  "./old_wooden_house.glb",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enablePan = true;

controls.update();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
