import * as THREE from 'three';
import { ArcballControls } from 'three/addons/controls/ArcballControls';

import { Planet } from './3d/planet';
import {
  focusOnObjectIfValid,
  setupFocusing,
  updateFocus,
} from './3d/focus';
import { addBlackHole, setupAccretionDisk } from './3d/blackhole';
import { loadPlanets } from './loadPlanets';
import { addPostProcessing } from './3d/postProcessing';
import { addSidebar } from './components/sidebar';
import { addProjectInfoElements } from './components/projectinfo';
import { runIntroAnimation, setupCameraInitialStateForIntroduction } from './3d/introAnimation';
import {setupCameraAnimation} from "./3d/cameraAnimation";

const scene = new THREE.Scene();

// Background (made with https://jaxry.github.io/panorama-to-cubemap/ and https://www.spacespheremaps.com/silver-and-gold-nebulae-spheremaps/)
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('img/cubemap_images/');
const textureCube = await cubeTextureLoader.loadAsync([
  'px.png', 'nx.png',
  'py.png', 'ny.png',
  'pz.png', 'nz.png',
]);
scene.background = textureCube;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.classList.add('prevent-select');
document.body.appendChild(renderer.domElement);
renderer.capabilities.logarithmicDepthBuffer = false;

// Handle window resizing
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});

// Camera and controls
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.frustumCulled = false;

const controls = new ArcballControls(camera, renderer.domElement, scene);
controls.cursorZoom = true;
controls.setGizmosVisible(false);
controls.enableFocus = false;
controls.update();

setupCameraInitialStateForIntroduction(camera, controls);

// Lighting
const light = new THREE.PointLight(0xffffff, 4, 0, 0);
light.position.set(0, 0, 0);
scene.add(light);

// Pointer setup (for detecting clicked objects etc.)
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
document.onmouseup = document.ontouchend = (event) => {
  let clientX, clientY;
  if (event.touches) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  }
  else {
    clientX = event.clientX;
    clientY = event.clientY;
  }
  // Normalise to -1 and +1
  pointer.x = (clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  let intersects = raycaster.intersectObjects(Planet.models, true);

  // Find the first (ie closest) object that is a valid selectable target
  for (const intersection of intersects) {
    if (focusOnObjectIfValid(intersection.object)) return;
  }
};

// Do post-processing last
const composer = addPostProcessing(scene, camera, renderer);

// Other setup
setupFocusing(camera, controls);
setupCameraAnimation(camera, controls);
addBlackHole(scene, composer, camera);
const batchedRenderer = await setupAccretionDisk(scene); // For particles
loadPlanets(scene);
addSidebar();
addProjectInfoElements();

// Main loop
runIntroAnimation();
function animate() {
  Planet.updateAllPlanets();
  updateFocus();
  batchedRenderer.update(0.016); // Update black hole particles
  composer.render(); // Render with post processing
}

renderer.setAnimationLoop(animate);
