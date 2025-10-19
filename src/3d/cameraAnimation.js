import * as THREE from 'three';
import { getCameraDirectionAsPos } from './focus';

const overviewAnimationDuration = 2000;

let camera, controls;
export function setupCameraAnimation(camera_, controls_) {
  if (!camera_) throw `Bad camera: ${camera_}`;
  if (!controls_) throw `Bad control: ${controls_}`;
  camera = camera_;
  controls = controls_;
}

export let animating = false;
/**
 * Smoothly focuses on an object, by changing the camera position control target
 * @param cameraStartPos {THREE.Vector3} the camera position to animate from.
 * @param targetStartPos {THREE.Vector3} the position the camera is looking at.
 * @param cameraEndPos {THREE.Vector3} the camera position to animate to.
 * @param targetEndPos {THREE.Vector3} the position the camera should look to.
 * @param updateControls {boolean} if true, the controls will be updated throughout the animation,
 * otherwise they wll only be updated at the end of the animation. Disabling can prevent sudden jumps when the animation ends.
 * @param disableAllControls {boolean} if true, completely prevents the user from controlling the camera during the animation,
 * otherwise just disables rotating.
 * @param duration {number} how long to take in milliseconds.
 * @param stabilise {boolean} if controls are being updated, level the camera.
 * @param onComplete {CallableFunction} a function called once the animation is complete.
 */
export function smoothlyMoveCamera(cameraStartPos, targetStartPos,
  cameraEndPos, targetEndPos, updateControls, duration = 1000,
  disableAllControls = false, stabilise = true, onComplete = null) {
  if (!cameraStartPos) throw `Bad cameraStartPos: ${cameraStartPos}`;
  if (!targetStartPos) throw `Bad targetStartPos: ${targetStartPos}`;
  if (!cameraEndPos) throw `Bad cameraEndPos: ${cameraEndPos}`;
  if (!targetEndPos) throw `Bad targetEndPos: ${targetEndPos}`;

  // If an animation is already playing, don't play another (it'll snap and look weird)
  if (animating) return;
  animating = true;

  if (disableAllControls) allowUserToControlCamera(false);
  else controls.safeEnableRotate = false; // Must disable rotation

  const startTime = performance.now();
  function animate() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOut(progress);

    // Update camera and controls; change target control to look at planet, change camera position to zoom in
    camera.position.lerpVectors(cameraStartPos, cameraEndPos, easeProgress);
    controls.target.lerpVectors(targetStartPos, targetEndPos, easeProgress);

    camera.updateProjectionMatrix();
    if (updateControls) {
      if (stabilise) camera.up.lerp(new THREE.Vector3(0, 1, 0), easeProgress);
      controls.update();
    }

    // Loop via recursion, updating the frame
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
    // When the animation ends
    else {
      animating = false;
      controls.update();
      if (disableAllControls) allowUserToControlCamera(true); // Re-enable
      else controls.safeEnableRotate = true;
      if (onComplete) onComplete();
    }
  }

  animate();
}

export function allowUserToControlCamera(state) {
  controls.safeEnablePan = controls.safeEnableRotate = controls.safeEnableZoom = state;
}

/**
 * Copied from https://stackoverflow.com/questions/30007853/simple-easing-function-in-javascript
 * @param t progress, from 0 to 1 inclusive.
 * @return {number} a different value from 0 to 1 inclusive that follows the pattern of easing in and out.
 */
function easeInOut(t) {
  return t > 0.5 ? 4 * Math.pow((t - 1), 3) + 1 : 4 * Math.pow(t, 3);
}

const overviewPosition = new THREE.Vector3(0, 25, -200);
export const sceneOriginPosition = new THREE.Vector3(0.01, 0.01, 0.01);
// Pinching or panning when the target is 0, 0, 0 breaks things (gets replaced by NaN values, potential div by 0)

/**
 * Moves the camera from the current position to a defined overview position.
 */
export function moveToOverviewPos() {
  const camPos = camera.position.clone();
  const target = getCameraDirectionAsPos();

  controls.safeEnablePan = false;
  controls.safeEnableZoom = false;

  smoothlyMoveCamera(camPos, target,
    overviewPosition, sceneOriginPosition,
    true, overviewAnimationDuration, true, true);
}
