import * as THREE from 'three';
import * as QUARKS from 'three.quarks';

import { Planet } from './3d/planet';
import { setupFocusing, updateFocus } from './3d/focus';
import { addBlackHole, setupAccretionDisk } from './3d/quasar/blackhole';
import { loadPlanets } from './loadPlanets';
import { addBlackholeOutline, addPostProcessing } from './3d/postProcessing';
import { runIntroAnimation, setupCameraInitialStateForIntroduction } from './3d/introAnimation';
import { setupCameraAnimation } from './3d/cameraAnimation';
import { addComponents } from './components/loader';
import { addLight, loadCubeMap, makeCamera, makeControls, makeRenderer, onWindowResized, setupPointer } from './3d/sceneSetup';

// Foundation
const scene = new THREE.Scene();
const renderer = makeRenderer();
const camera = makeCamera();
const controls = makeControls(scene, renderer, camera);

// Environment
loadCubeMap(scene);
addLight(scene);
const batchedRenderer = new QUARKS.BatchedRenderer();
setupAccretionDisk(scene, batchedRenderer);
loadPlanets(scene);
const blackHoleSphere = addBlackHole(scene, camera);
const composer = addPostProcessing(scene, camera, renderer); // Do post-processing last
addBlackholeOutline(scene, camera, composer, blackHoleSphere);

// UI
addComponents();
setupPointer(camera);
setupFocusing(camera, controls);
setupCameraAnimation(camera, controls);
setupCameraInitialStateForIntroduction(camera, controls);

// Handle window resizing
window.addEventListener('resize', () => {
  onWindowResized(renderer, camera);
});

// Main loop
runIntroAnimation();
function animate() {
  Planet.updateAllPlanets();
  updateFocus();
  batchedRenderer.update(0.016); // Update black hole particles
  composer.render(); // Render with post-processing
}

renderer.setAnimationLoop(animate);
