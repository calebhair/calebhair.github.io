import * as THREE from 'three';
import { BLACK_HOLE_RADIUS } from './quasarConfig';
import {loading} from "../loadingState";

/**
 * Creates a black sphere and adds it to the scene.
 * @param scene the scene to add the black hole to.
 * @param camera the camera, for adding post-processing.
 */
export function addBlackHole(scene, camera) {
  if (!scene) throw `Bad scene: ${scene}`;
  if (!camera) throw `Bad camera: ${scene}`;

  const geometry = new THREE.SphereGeometry(BLACK_HOLE_RADIUS, 48, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  loading.blackHole.eventHorizon = 1;

  return sphere;
}
