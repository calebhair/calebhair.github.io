import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer';
import { RenderPass } from 'three/addons/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass';

let focusOutlinePass = null;
let planetsOutlinePass = null;

/**
 * @return {EffectComposer} the post-processing effect composer, so that it can be updated in the main animation loop.
 */
export function addPostProcessing(scene, camera, renderer) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = getBloom();
  composer.addPass(bloomPass);

  focusOutlinePass = getFocusOutlinePass(scene, camera);
  composer.addPass(focusOutlinePass);

  planetsOutlinePass = getPlanetsOutlinePass(scene, camera);
  composer.addPass(planetsOutlinePass);

  const antialiasing = new SMAAPass();
  composer.addPass(antialiasing);

  window.addEventListener('resize', () => {
    const resolution = getScreenResolution();
    composer.setSize(resolution.x, resolution.y);
    bloomPass.resolution.copy(resolution);
    focusOutlinePass.resolution.copy(resolution);
  });

  return composer;
}

export function addBlackholeOutline(scene, camera, composer, blackholeSphere) {
  const blackHoleOutline = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
  blackHoleOutline.edgeStrength = 10;
  blackHoleOutline.edgeGlow = 10;
  blackHoleOutline.edgeThickness = 7;
  blackHoleOutline.visibleEdgeColor = new THREE.Color(0xffcc77);
  blackHoleOutline.hiddenEdgeColor = new THREE.Color(0x000000); // Hide when eclipsed
  blackHoleOutline.selectedObjects = [blackholeSphere];
  composer.addPass(blackHoleOutline);
}

/**
 * Sets the outline post-processing to only be applied to the provided object.
 * @param object {THREE.Object3D} the object to apply the outline to.
 */
export function setOutlinedObject(object) {
  focusOutlinePass.selectedObjects = [object];
}

export function clearOutline() {
  focusOutlinePass.selectedObjects = [];
}

/**
 * @return {THREE.Vector2} the current screen resolution, width then height.
 */
function getScreenResolution() {
  return new THREE.Vector2(window.innerWidth, window.innerHeight);
}

function getBloom() {
  return new UnrealBloomPass(
    getScreenResolution(),
    0.3,
    0.1,
    0.5,
  );
}

function getFocusOutlinePass(scene, camera) {
  const outlinePass = new OutlinePass(getScreenResolution(), scene, camera);
  outlinePass.edgeStrength = 3;
  outlinePass.edgeGlow = 1;
  outlinePass.edgeThickness = 2;
  outlinePass.visibleEdgeColor = new THREE.Color(0xffffff);
  outlinePass.hiddenEdgeColor = new THREE.Color(0xffffff);
  return outlinePass;
}

function getPlanetsOutlinePass(scene, camera) {
  const outlinePass = new OutlinePass(getScreenResolution(), scene, camera);
  outlinePass.edgeStrength = 2;
  outlinePass.edgeGlow = 0;
  outlinePass.edgeThickness = 0.2;
  outlinePass.visibleEdgeColor = new THREE.Color(0xaaaaaa);
  outlinePass.hiddenEdgeColor = new THREE.Color(0x000000);
  return outlinePass;
}

/**
 * Adds an outline to all planets
 * @param {[Planet]} planets Planet objects
 */
export function setPlanetsOutline(planets) {
  planetsOutlinePass.selectedObjects = planets.map(planet => planet.model);
}
