import { Vector3, Quaternion } from 'three';
import { allowUserToControlCamera, smoothlyMoveCamera } from './cameraAnimation';
import { EVENTS } from '../constants';

const cameraTrackerEnabled = false;

const initialCameraPos = new Vector3(8.5, 26, -29.6);
const introTarget = new Vector3(0.1, 0.1, 0.1);
const finalCameraPos = new Vector3(72.8, 25.6, -203);
const finalTarget = new Vector3().copy(introTarget);

export function runIntroAnimation() {
  allowUserToControlCamera(false);
  document.addEventListener(EVENTS.LOADING_COMPLETE, () => {
    setTimeout(() => {
      smoothlyMoveCamera(initialCameraPos, introTarget,
        finalCameraPos, finalTarget,
        true, 4000, true, false,
        () => {
          document.dispatchEvent(new Event(EVENTS.INTRO_COMPLETE));
        });
    }, 1500);
  });
}

const axis = { x: 'x', y: 'y', z: 'z' };
export function setupCameraInitialStateForIntroduction(camera, controls) {
  rollCamera(camera, controls, axis.x, -30);
  rollCamera(camera, controls, axis.z, 0);
}

/**
 * Rotate a camera controlled by an arcball controller.
 * From https://discourse.threejs.org/t/camera-rotation-with-arcballcontrols/50024/7
 * @param camera the camera to rotate.
 * @param controls arcball controls that manage the camera.
 * @param axis {axis} the axis to rotate around.
 * @param degrees how many degrees to rotate the camera around the given axis.
 */
function rollCamera(camera, controls, axis, degrees) {
  const radians = (degrees * Math.PI) / 180.0;
  const axisVector = new Vector3(0, 0, 0);
  axisVector[axis] = 1;

  // Get the vector from the camera to the target (controls.target)
  const cameraDirection = new Vector3().subVectors(camera.position, controls.target).normalize();

  // Create a quaternion representing the rotation and apply to the camera direction
  const quaternion = new Quaternion().setFromAxisAngle(axisVector, radians);
  cameraDirection.applyQuaternion(quaternion);

  // Calculate the new position of the camera
  const distance = camera.position.distanceTo(controls.target);
  const newPosition = new Vector3().addVectors(controls.target, cameraDirection.multiplyScalar(distance));

  // Apply the new position and up vector to the camera
  camera.position.copy(newPosition);
  camera.up.applyQuaternion(quaternion);
  camera.lookAt(controls.target);

  camera.updateMatrixWorld();
  controls.update();
}

export function logCameraPosAndRotation(camera) {
  if (!cameraTrackerEnabled) return;
  setInterval(() => {
    console.log(`Position x: ${camera.position.x}, y: ${camera.position.y}, z: ${camera.position.z}`);
    console.log(`Rotation x: ${camera.rotation.x}, y: ${camera.rotation.y}, z: ${camera.rotation.z}`);
  }, 1000);
}
