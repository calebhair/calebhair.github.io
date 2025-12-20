import * as THREE from 'three';
import * as QUARKS from 'three.quarks';

import { Planet } from './3d/planet';
import { setupDoubleClickUnfocus, setupFocusing, updateFocus } from './3d/focus';
import { addBlackHole } from './3d/quasar/blackHole';
import { addPlanets } from './planets';
import { addBlackholeOutline, addPostProcessing } from './3d/postProcessing';
import { logCameraPosAndRotation, runIntroAnimation, setupCameraInitialStateForIntroduction } from './3d/introAnimation';
import { setupCameraAnimation } from './3d/cameraAnimation';
import { setupComponents } from './components/componentLoader';
import { addLight, addCubeMap, makeCamera, makeControls, makeRenderer, onWindowResized, setupPointer } from './3d/sceneSetup';
import { addTextAccretionDisk } from './3d/quasar/textAccretionDisk';
import { loading } from './3d/loadingState';
import { ConditionalScrollSystem } from './components/scrollSystem/conditionalScrollSystem';
import { setupBorders } from './components/globalstyles/borders';

// Prioritised
const scrollSystem = new ConditionalScrollSystem();
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
else onDOMContentLoaded();

function onDOMContentLoaded() {
  setupComponents(scrollSystem);
  setupBorders();
}

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
setupPointer(camera);
setupFocusing(camera, controls);
setupDoubleClickUnfocus();
setupCameraAnimation(camera, controls);
setupCameraInitialStateForIntroduction(camera, controls);

// Handle window resizing
window.addEventListener('resize', () => {
  onWindowResized(renderer, camera);
});

const clock = new THREE.Clock();
let delta;

logCameraPosAndRotation(camera); // For testing; must be enabled from variable

loading.sceneSetup.progress = 1;

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
