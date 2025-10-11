import * as THREE from 'three';
import { Planet } from './3d/planet';
import { loading } from './3d/loadingState';

export const planetDefinitions = [
  {
    name: 'Test planet 1',
    iconPath: 'img/test.svg',
    modelPath: 'models/test.glb',
    planetSize: 1.6,

    orbitRadius: 130,
    orbitStartingAngle: 0,
    orbitSpeed: 5,

    planetRotationSpeed: new THREE.Euler(50, 0, 0),
    orbitOrientation: new THREE.Euler(0, 0, 0),
    orbitCentre: new THREE.Vector3(0, 10, 0),
  },

  {
    name: 'Monkey',
    iconPath: 'img/test.svg',
    modelPath: 'models/monkey.glb',
    planetSize: 10,

    orbitRadius: 100,
    orbitStartingAngle: 180,
    orbitSpeed: 4,

    planetRotationSpeed: new THREE.Euler(20, 50, 10),
    orbitOrientation: new THREE.Euler(0, 0, 0),
    orbitCentre: new THREE.Vector3(0, 10, 0),
  },
];

const test = false;
if (test) {
  const duplicate = planetDefinitions[0];
  for (let i = 0; i < 10; i++) {
    planetDefinitions.push(duplicate);
  }
}

loading.planets.totalPlanets = planetDefinitions.length;

/**
 * Creates planet objects from the planet JSONs.
 * @param scene {THREE.Scene} the scene to add the planets to.
 */
export function addPlanets(scene) {
  for (const planetJson of planetDefinitions) {
    new Planet(scene, planetJson);
  }
}
