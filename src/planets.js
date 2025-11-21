import * as THREE from 'three';
import { Planet } from './3d/planet';
import { loading } from './3d/loadingState';

export const planetDefinitions = [
  {
    name: 'Test planet 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum mollis mauris, nec porttitor metus faucibus a. Integer egestas mauris in porttitor vehicula. Quisque ullamcorper sem sit amet finibus porta. Vestibulum tincidunt est nec lectus luctus, eget condimentum diam dapibus. Donec tempus tellus sit amet lorem ultricies, vitae pharetra ex egestas. Quisque scelerisque erat at ex sollicitudin, sollicitudin finibus mi dapibus. Phasellus ullamcorper tellus non tortor suscipit varius. Vestibulum leo est, laoreet id neque ut, feugiat facilisis enim. Sed non euismod erat. Quisque finibus a lectus tristique rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum mollis mauris, nec porttitor metus faucibus a. Integer egestas mauris in porttitor vehicula. Quisque ullamcorper sem sit amet finibus porta. Vestibulum tincidunt est nec lectus luctus, eget condimentum diam dapibus. Donec tempus tellus sit amet lorem ultricies, vitae pharetra ex egestas. Quisque scelerisque erat at ex sollicitudin, sollicitudin finibus mi dapibus. Phasellus ullamcorper tellus non tortor suscipit varius. Vestibulum leo est, laoreet id neque ut, feugiat facilisis enim. Sed non euismod erat. Quisque finibus a lectus tristique rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum mollis mauris, nec porttitor metus faucibus a. Integer egestas mauris in porttitor vehicula. Quisque ullamcorper sem sit amet finibus porta. Vestibulum tincidunt est nec lectus luctus, eget condimentum diam dapibus. Donec tempus tellus sit amet lorem ultricies, vitae pharetra ex egestas. Quisque scelerisque erat at ex sollicitudin, sollicitudin finibus mi dapibus. Phasellus ullamcorper tellus non tortor suscipit varius. Vestibulum leo est, laoreet id neque ut, feugiat facilisis enim. Sed non euismod erat. '
      + 'Quisque finibus a lectus tristique rhoncus.',

    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Necker_cube.svg/250px-Necker_cube.svg.png',
        altText: 'Test image 1' },
      { url: 'https://toytheater.com/wp-content/uploads/cube.gif',
        altText: 'Test image 2' },
      { url: 'https://t4.ftcdn.net/jpg/05/70/07/89/360_F_570078904_cVFitnrIQifQcltWMVTuxTfX67uZy0Av.jpg',
        altText: 'Test image 3' },
    ],

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
    description: 'A 3D model of a monkey\'s head, one of the preconfigured meshes in Blender.<br><br>The canonical name of the monkey is Suzanne.',

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
