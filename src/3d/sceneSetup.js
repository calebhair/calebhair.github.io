import * as THREE from 'three';
import { Planet } from './planet';
import { focusOnObjectIfValid, followTarget, setupFocusZooming } from './focus';
import { EVENTS, MINIMUM_DISTANCE_FROM_PLANET_TO_FOCUS, PATHS } from '../constants';
import { loading } from './loadingState';
import { CustomArcballControls } from './controller';
import { getClientCoords } from '../common';

export async function addCubeMap(scene) {
  // Background (made with https://jaxry.github.io/panorama-to-cubemap/ and https://www.spacespheremaps.com/silver-and-gold-nebulae-spheremaps/)
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  cubeTextureLoader.setPath(PATHS.CUBEMAP);
  cubeTextureLoader.load(
    [
      'px.png', 'nx.png',
      'py.png', 'ny.png',
      'pz.png', 'nz.png',
    ],
    (cubeTexture) => {
      scene.background = cubeTexture;
      loading.background.progress = 1;
    },
    undefined, console.error);
}

export function makeRenderer() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true });
  }
  catch (error) {
    alert('Could not create WebGL renderer. '
      + 'Please ensure your browser supports WebGL and that it is enabled. '
      + 'You may need to use a different browser, or restart your device.');
    throw error;
  }
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.classList.add('prevent-select');
  renderer.domElement.id = 'threejs-canvas';
  document.body.appendChild(renderer.domElement);
  renderer.capabilities.logarithmicDepthBuffer = true;

  // Error handling for context loss
  renderer.domElement.addEventListener('webglcontextlost', () => {
    alert('WebGL context lost. Please restart your browser. Consider zooming out less.');
  }, { once: true });

  setupFocusZooming(renderer.domElement);
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
  return new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1, 200000);
}

export function makeControls(scene, renderer, camera) {
  const controls = new CustomArcballControls(camera, renderer.domElement, scene);
  controls.cursorZoom = true;
  controls.setGizmosVisible(false);
  controls.enableFocus = false;
  controls.update();

  return controls;
}

export function addLight(scene) {
  const blackHoleLight = new THREE.PointLight(0xffffff, 2, 0, 0);
  blackHoleLight.position.set(0, 0, 0);
  scene.add(blackHoleLight);

  const ambientLight = new THREE.AmbientLight(0xaaaaaa);
  scene.add(ambientLight);
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
    const { closestPlanet, closestDistance } = findClosestPlanet(raycaster.ray);
    const leniency = Math.sqrt(camera.position.distanceTo(closestPlanet.model.position) / closestPlanet.planetSize);
    if (closestDistance - leniency > MINIMUM_DISTANCE_FROM_PLANET_TO_FOCUS) return;
    focusOnObjectIfValid(closestPlanet.model);
  };

  document.addEventListener(EVENTS.PLANETS_LOADED, () => {
    const canvas = document.querySelector('#threejs-canvas');
    canvas.addEventListener('mousedown', onInteraction);
    canvas.addEventListener('touchstart', onInteraction);
  }, { once: true });
}

/**
 * Finds the closest planet to a ray from a raycaster, allowing for the planet size,
 * excluding the already focussed planet.
 * @param ray {THREE.Ray} the ray from a raycaster
 * @return {{closestPlanet: Planet, closestDistance: number | null}} the closest planet and the distance from its edge to the ray
 */
function findClosestPlanet(ray) {
  let closestPlanet = null;
  let closestDistance = Infinity;

  for (const planet of Planet.planets) {
    const { model } = planet;
    if (model === followTarget) continue;
    const distanceFromFromPlanetEdgeToRay = ray.distanceToPoint(model.position) - model.userData.planetSize;
    if (distanceFromFromPlanetEdgeToRay > closestDistance) continue;

    closestDistance = distanceFromFromPlanetEdgeToRay;
    closestPlanet = planet;
  }

  return { closestPlanet, closestDistance };
}
