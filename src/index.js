import * as THREE from 'three';
import * as QUARKS from 'three.quarks';

import { Planet } from './3d/planet';
import { setupFocusing, updateFocus } from './3d/focus';
import { addBlackHole } from './3d/quasar/blackhole';
import { addPlanets } from './planets';
import { addBlackholeOutline, addPostProcessing } from './3d/postProcessing';
import { runIntroAnimation, setupCameraInitialStateForIntroduction } from './3d/introAnimation';
import { setupCameraAnimation } from './3d/cameraAnimation';
import { setupComponents } from './components/componentLoader';
import { addLight, addCubeMap, makeCamera, makeControls, makeRenderer, onWindowResized, setupPointer } from './3d/sceneSetup';
import { addTextAccretionDisk } from './3d/quasar/textBending';

// Foundation
const scene = new THREE.Scene();
const renderer = makeRenderer();
const camera = makeCamera();
const controls = makeControls(scene, renderer, camera);

// Environment
addCubeMap(scene);
addLight(scene);
const batchedRenderer = new QUARKS.BatchedRenderer();
const updateAccretionDiskFlows = addTextAccretionDisk(scene);
addPlanets(scene);
const blackHoleSphere = addBlackHole(scene, camera);
const composer = addPostProcessing(scene, camera, renderer); // Do post-processing last
addBlackholeOutline(scene, camera, composer, blackHoleSphere);

// UI
setupComponents();
setupPointer(camera);
setupFocusing(camera, controls);
setupCameraAnimation(camera, controls);
setupCameraInitialStateForIntroduction(camera, controls);

// Handle window resizing
window.addEventListener('resize', () => {
  onWindowResized(renderer, camera);
});

const clock = new THREE.Clock();
let delta;

// Main loop
runIntroAnimation();
function animate() {
  delta = clock.getDelta();
  Planet.updateAllPlanets();
  updateFocus();
  updateAccretionDiskFlows(delta);
  batchedRenderer.update(delta); // Update black hole particles
  composer.render(delta); // Render with post-processing
}

renderer.setAnimationLoop(animate);
