import * as THREE from 'three';
import { clearOutline, setOutlinedObject } from './postProcessing';
import { smoothlyMoveCamera, animating, sceneOriginPosition } from './cameraAnimation';
import { EVENTS } from '../constants';

export let followTarget = null; // The object that the camera will attempt to follow.
const targetPos = new THREE.Vector3(); // The global position of the target object
const cameraPos = new THREE.Vector3();
let cameraStartPos = null; // On focus, this is set to the current camera position
let targetStartPos = null; // On focus, this is set to a position the camera is currently pointing at

const focusMarginFactorConfig = { min: 2, max: 7, default: 3, wheelFactor: 1, pinchFactor: 0.2 };
let currentFocusMarginFactor = focusMarginFactorConfig.default; // Increase to increase the space around the planet.
const UNFOCUS_ANIMATION_DURATION = 1000;
const MIN_CAMERA_ASPECT_RATIO_FOR_FOCUS_SHIFT = 1.2;

const translateCamera = false;

let camera, controls;
/**
 * Sets up focussing for the camera.
 * @param camera_ the camera in the scene that will be focussing on objects.
 * @param controls_ the controls (ideally orbit control, arcball may work)
 */
export function setupFocusing(camera_, controls_) {
  if (!camera_) throw `Bad camera: ${camera_}`;
  if (!controls_) throw `Bad control: ${controls_}`;
  camera = camera_;
  controls = controls_;

  controls.addEventListener('change', updateFocus); // Fixes snapping issue
}

export function setupDoubleClickUnfocus() {
  // This works for both double click and double tap
  document.addEventListener('dblclick', () => {
    if (!followTarget) return;
    stopFollowing();
  });
}

/**
 * Checks if the object or its parent is valid, and starts following it if it is.
 * @param object the object to check.
 * @returns {boolean} false if a valid focus target was found, true if the object or its parents are valid.
 */
export function focusOnObjectIfValid(object) {
  if (!object || animating) return false; // Don't allow focus if animation is happening

  if (object && canObjectBeFocussedOn(object)) {
    startFollowing(object);
    return true;
  }
  return false;
}

/**
 * Returns true if the object can be followed.
 * @param object {THREE.Object3D} the 3D object to check.
 * @return {boolean} true if the object can be followed.
 */
function canObjectBeFocussedOn(object) {
  // If the object is selectable and the current target's UUID is different (null followTarget is implicitly handled)
  return object?.userData?.isSelectable && followTarget?.uuid !== object.uuid;
}

/**
 * Dims quasar, configures controls, and smoothly focuses on the object.
 * @param object {THREE.Object3D} the object to focus on.
 */
export function startFollowing(object) {
  if (!object) throw `Bad object ${object}`;
  const planetChanged = Boolean(followTarget);
  followTarget = object;
  const { planetConfig } = followTarget.userData;
  currentFocusMarginFactor = focusMarginFactorConfig.default;

  if (planetChanged) {
    document.dispatchEvent(new CustomEvent(EVENTS.PLANET_CHANGED, { detail: planetConfig }));
  }
  else {
    document.dispatchEvent(new CustomEvent(EVENTS.PLANET_FOCUSSED, { detail: planetConfig }));
  }
  document.dispatchEvent(new CustomEvent(EVENTS.SIDEBAR_CLOSED, { detail: planetConfig }));

  setOutlinedObject(object);

  // Save these for animation
  cameraStartPos = camera.position.clone();
  targetStartPos = getCameraDirectionAsPos();

  controls.safeEnablePan = false;
  controls.safeEnableZoom = false;
  updateFocus(false); // Get target values for animation, but don't apply them because it will snap to them
  smoothlyMoveCamera(cameraStartPos, targetStartPos, cameraPos, targetPos, false, 1000, false, true,
    () => { controls.safeEnableZoom = true; });
}

/**
 * Unfocuses and stops following the object that was currently being followed.
 * @param animate {boolean} if false, skip smoothly un-focussing.
 */
export function stopFollowing(animate = true) {
  document.dispatchEvent(new CustomEvent(EVENTS.PLANET_UNFOCUSSED, followTarget.userData.planetConfig));
  followTarget = null;
  clearOutline();

  if (animate) {
    smoothlyUnfocus(UNFOCUS_ANIMATION_DURATION);
    setTimeout(() => {
      controls.safeEnablePan = true;
      controls.safeEnableZoom = true;
    }, UNFOCUS_ANIMATION_DURATION);
  }
  else {
    controls.safeEnablePan = true;
    controls.safeEnableZoom = true;
  }
}

/**
 * Updates the position that the control should point to (its target), and applies it.
 * This should be part of the animation loop.
 */
export function updateFocus(applyNewValues = true) {
  if (followTarget === null) return;
  followTarget.getWorldPosition(targetPos);
  if (translateCamera) targetPos.copy(getTranslatedTargetPos());

  // Calculate camera position
  const targetDistance = followTarget.userData.planetSize * currentFocusMarginFactor;
  const currentDirection = new THREE.Vector3();
  camera.getWorldDirection(currentDirection);
  // Position camera at distance away from target, opposite to viewing direction
  cameraPos.copy(targetPos.clone().add(currentDirection.multiplyScalar(-targetDistance)));

  // Update, unless there's an animation running, or was specifically told not to update (such as if this was called before animation)
  if (applyNewValues && !animating) {
    controls.target.copy(targetPos);
    camera.position.copy(cameraPos);
    controls.update();
    camera.updateProjectionMatrix();
  }
}

/**
 * Calculates the position the controls should point to as a target,
 * such that the camera points just to the left of the planet.
 * Assumes that targetPos has been set to the world pos of target object.
 * @return {THREE.Vector3} the position the controls should point to.
 */
function getTranslatedTargetPos() {
  // Only translate if the aspect ratio is wide enough
  if (camera.aspect < MIN_CAMERA_ASPECT_RATIO_FOR_FOCUS_SHIFT) return targetPos;

  // The vector work is by Claude, so beware (structure was tweaked)
  const dir = new THREE.Vector3();
  dir.subVectors(targetPos, camera.position).normalize();
  const up = camera.up.clone().normalize(); // Get camera's up vector
  const right = new THREE.Vector3().crossVectors(dir, up).normalize(); // Calc right vector via cross product
  const left = right.clone().negate(); // Left is opposite of right
  return new THREE.Vector3().addVectors(targetPos, left.multiplyScalar(
    -followTarget.userData.planetSize, // How much to go left by
  ));
}

/**
 * Gets a position in the direction the camera is looking.
 * @return {*}
 */
export function getCameraDirectionAsPos(distance = 100) {
  return camera.getWorldDirection(new THREE.Vector3())
    .normalize()
    .multiplyScalar(distance)
    .add(camera.position);
}

/**
 * Smoothly unfocuses to look at the quasar.
 */
function smoothlyUnfocus(animationDuration = UNFOCUS_ANIMATION_DURATION) {
  const cameraDistanceFromCentre = camera.position.clone();
  cameraDistanceFromCentre.multiplyScalar(1.5);

  smoothlyMoveCamera(camera.position.clone(), controls.target.clone(),
    cameraDistanceFromCentre, sceneOriginPosition, true, animationDuration);
}

export function setupFocusZooming(threejsCanvas) {
  let lastTouchDistance;

  threejsCanvas.addEventListener('touchmove', (event) => {
    if (event.touches.length === 2) {
      const dx = event.touches[0].pageX - event.touches[1].pageX;
      const dy = event.touches[0].pageY - event.touches[1].pageY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (lastTouchDistance) {
        const difference = distance - lastTouchDistance;
        changeFocusZoom(-difference / 10 * focusMarginFactorConfig.pinchFactor);
      }
      lastTouchDistance = distance;
    }
  });

  threejsCanvas.addEventListener('touchend', () => {
    lastTouchDistance = null;
  });

  threejsCanvas.addEventListener('wheel', (event) => {
    changeFocusZoom(event.deltaY / 500 * focusMarginFactorConfig.wheelFactor);
  });
}

function changeFocusZoom(zoomChange) {
  if (!followTarget) return;
  currentFocusMarginFactor += zoomChange;
  const { min, max } = focusMarginFactorConfig;
  currentFocusMarginFactor = Math.max(Math.min(currentFocusMarginFactor, max), min); // clamp
  if (currentFocusMarginFactor === max) {
    stopFollowing(false);
  }
}
