import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer';
import { RenderPass } from 'three/addons/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass';

export let outlinePass = null; // Expose outline pass for focus

/**
 * @return {EffectComposer} the post-processing effect composer, so that it can be updated in the main animation loop.
 */
export function addPostProcessing(scene, camera, renderer) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = getBloom();
  composer.addPass(bloomPass);

  outlinePass = getOutlinePass(scene, camera);
  composer.addPass(outlinePass);

  const antialiasing = new SMAAPass();
  composer.addPass(antialiasing);

  window.addEventListener('resize', () => {
    const resolution = getScreenResolution();
    composer.setSize(resolution.x, resolution.y);
    bloomPass.resolution.copy(resolution);
    outlinePass.resolution.copy(resolution);
  });

  return composer;
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
    0.1,
    0.1,
    0.5,
  );
}

function getOutlinePass(scene, camera) {
  const outlinePass = new OutlinePass(getScreenResolution(), scene, camera);
  outlinePass.edgeStrength = 3;
  outlinePass.edgeGlow = 1;
  outlinePass.edgeThickness = 2;
  outlinePass.visibleEdgeColor = new THREE.Color(0xffffff);
  outlinePass.hiddenEdgeColor = new THREE.Color(0xffffff);
  return outlinePass;
}
