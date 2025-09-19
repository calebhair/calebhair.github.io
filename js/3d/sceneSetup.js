import * as THREE from 'three';
import { ArcballControls } from 'three/addons/controls/ArcballControls';
import { Planet } from './planet';
import { focusOnObjectIfValid } from './focus';

export async function loadCubeMap(scene) {
  // Background (made with https://jaxry.github.io/panorama-to-cubemap/ and https://www.spacespheremaps.com/silver-and-gold-nebulae-spheremaps/)
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  cubeTextureLoader.setPath('img/cubemap_images/');
  const textureCube = await cubeTextureLoader.loadAsync([
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png',
  ]);
  scene.background = textureCube;
}

export function makeRenderer() {
  const renderer = new THREE.WebGLRenderer();
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.classList.add('prevent-select');
  document.body.appendChild(renderer.domElement);
  renderer.capabilities.logarithmicDepthBuffer = false;
  return renderer;
}

export function onWindowResized(renderer, camera) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

export function makeCamera() {
  const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1, 1000);
  camera.frustumCulled = false;

  return camera;
}

export function makeControls(scene, renderer, camera) {
  const controls = new ArcballControls(camera, renderer.domElement, scene);
  controls.cursorZoom = true;
  controls.setGizmosVisible(false);
  controls.enableFocus = false;
  controls.update();

  return controls;
}

export function addLight(scene) {
  const light = new THREE.PointLight(0xffffff, 4, 0, 0);
  light.position.set(0, 0, 0);
  scene.add(light);

  return light;
}

export function setupPointer(camera) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const onInteraction = (event) => {
    const { clientX, clientY } = getClientCoords(event);
    // Normalise to -1 and +1
    pointer.x = (clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(Planet.models, true);

    // Find the first (ie closest) object that is a valid selectable target
    for (const intersection of intersects) {
      if (focusOnObjectIfValid(intersection?.object?.parent)) return;
    }
  };

  document.addEventListener('mouseup', onInteraction);
  document.addEventListener('touchend', onInteraction);
}

function getClientCoords(event) {
  let clientX, clientY;
  if (event.changedTouches) {
    clientX = event.changedTouches[0].clientX;
    clientY = event.changedTouches[0].clientY;
  }
  else {
    clientX = event.clientX;
    clientY = event.clientY;
  }
  return { clientX, clientY };
}
