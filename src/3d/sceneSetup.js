import * as THREE from 'three';
import { ArcballControls } from 'three/addons/controls/ArcballControls';
import { Planet } from './planet';
import { focusOnObjectIfValid, followTarget } from './focus';
import { MINIMUM_DISTANCE_FROM_PLANET_TO_FOCUS, PATHS } from '../constants';

export async function addCubeMap(scene) {
  // Background (made with https://jaxry.github.io/panorama-to-cubemap/ and https://www.spacespheremaps.com/silver-and-gold-nebulae-spheremaps/)
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  cubeTextureLoader.setPath(PATHS.CUBEMAP);
  const textureCube = await cubeTextureLoader.loadAsync([
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png',
  ]);
  scene.background = textureCube;
}

export function makeRenderer() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.classList.add('prevent-select');
  renderer.domElement.id = 'threejs-canvas';
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
    const { closestModel, closestDistance } = findClosestPlanet(raycaster.ray);
    if (closestDistance > MINIMUM_DISTANCE_FROM_PLANET_TO_FOCUS) return;
    focusOnObjectIfValid(closestModel);
  };

  document.addEventListener('mouseup', onInteraction);
  document.addEventListener('touchend', onInteraction);
}

/**
 * Finds the closest planet to a ray from a raycaster, allowing for the planet size,
 * excluding the already focussed planet.
 * @param ray {THREE.Ray} the ray from a raycaster
 * @return {{closestModel: object, closestDistance: number | null}} the closest planet and the distance from its edge to the ray
 */
function findClosestPlanet(ray) {
  let closestModel = null;
  let closestDistance = Infinity;

  for (const model of Planet.models) {
    if (model === followTarget) continue;
    const distanceFromFromPlanetEdgeToRay = ray.distanceToPoint(model.position) - model.userData.planetSize;
    if (distanceFromFromPlanetEdgeToRay > closestDistance) continue;

    closestDistance = distanceFromFromPlanetEdgeToRay;
    closestModel = model;
  }

  return { closestModel, closestDistance };
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
