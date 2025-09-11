import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import * as THREE from 'three';

const loader = new GLTFLoader();
const timePageLoaded = performance.now();

/**
 * Handles loading the model of the planet and orbit calculations
 */
export class Planet {
  // Key config options
  modelPath; // Path to the model of the planet.
  orbitRadius; // The radius of the orbit.
  orbitStartingAngle; // The starting angle of the planet in the orbit in degrees.
  orbitSpeed; // The speed of the orbit in degrees per second.
  planetSize; // The diameter of the planet, manually defined.
  planetRotationSpeed; // The speed that the planet rotates, as an Euler in degrees.
  orbitOrientation; // The orientation of the orbit, as an Euler in degrees.
  orbitCentre; // The point that the orbit moves around, as a Vector3.
  planetConfig; // The full JSON used to construct the planet.

  static planets = []; // List of the planet objects created.
  static models = []; // List of all the models that have been loaded, as part of a planet.

  /**
   * @param {THREE.Scene} scene the scene to add the planet to
   * @param {object} config planet configuration options.
   */
  constructor(scene, config) {
    // Initial assignment
    Object.assign(this, { ...Planet.defaultConfig, ...config });
    this.scene = scene;
    this.planetConfig = config;
    if (!this.isValid()) throw `Invalid arguments for planet.`;

    this.planetRotationSpeedRadians = radiansEulerFromDegreesEuler(this.planetRotationSpeed);
    this.orbitOrientationRadians = radiansEulerFromDegreesEuler(this.orbitOrientation);
    Planet.planets.push(this);

    // Placeholder parent to store, position, and orient both the planet and its orbit. This is at the centre of the orbit.
    this.centreParent = new THREE.Object3D();
    this.centreParent.position.set(...this.orbitCentre);
    this.centreParent.rotation.set(...this.orbitOrientationRadians);

    // Add orbit line
    this.orbitLine = this.makeOrbitLine();
    this.orbitLine.position.y = -this.planetSize;
    this.centreParent.add(this.orbitLine);

    // Load model
    loader.load(this.modelPath, gltf => this.onPlanetModelLoaded(gltf), undefined, console.error);
  }

  static get defaultConfig() {
    return {
      orbitRadius: 10,
      orbitStartingAngle: 0,
      orbitSpeed: 5,
      planetSize: 3,
      planetRotationSpeed: new THREE.Euler(0, 0.1, 0),
      orbitOrientation: new THREE.Euler(0, 0, 0),
      orbitCentre: new THREE.Vector3(0, 0, 0),
    };
  }

  isValid() {
    let errorMessage = '';
    if (!this.scene) errorMessage += 'Bad scene.\n';
    if (this.orbitRadius <= 0) errorMessage += 'Bad orbit radius.\n';
    if (this.planetSize <= 0) errorMessage += 'Bad planet size.\n';
    if (!this.planetRotationSpeed?.isEuler) errorMessage += 'Bad planet rotation speed.\n';
    if (!this.orbitOrientation?.isEuler) errorMessage += 'Bad orbit orientation.\n';
    if (!this.orbitCentre?.isVector3) errorMessage += 'Bad orbit centre.\n';

    if (errorMessage.length > 0) {
      console.error(`For planet '${this.name}':\n` + errorMessage);
      return false;
    }
    return true;
  }

  onPlanetModelLoaded(gltf) {
    this.model = gltf.scene;
    this.model.userData = {
      isSelectable: true,
      planetSize: this.planetSize,
      planetConfig: this.planetConfig,
    };
    Planet.models.push(this.model);
    this.centreParent.add(this.model);

    // Update orbit and add to scene
    this.updatePlanet();
    this.scene.add(this.centreParent);
  }

  // Updates the orbit position and rotation
  updatePlanet() {
    // If model hasn't loaded
    if (!this.model) return;

    const time = getElapsedTimeSeconds();

    // Update orbit
    let angle = radians(this.orbitStartingAngle + this.orbitSpeed * time);
    this.model.position.x = this.orbitRadius * Math.cos(angle) + this.orbitCentre.x;
    this.model.position.z = this.orbitRadius * Math.sin(angle) + this.orbitCentre.z;

    // Update rotation
    this.model.rotation.x = this.planetRotationSpeedRadians.x * time;
    this.model.rotation.y = this.planetRotationSpeedRadians.y * time;
    this.model.rotation.z = this.planetRotationSpeedRadians.z * time;
  }

  static orbitLineWidth = 0.08;
  makeOrbitLine() {
    const geometry = new THREE.TorusGeometry(this.orbitRadius, Planet.orbitLineWidth, 10, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xdddddd, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    return mesh;
  }

  static updateAllPlanets() {
    for (const planet of Planet.planets) {
      planet.updatePlanet();
    }
  }
}

// Util
function getElapsedTimeSeconds() {
  return (performance.now() - timePageLoaded) / 1000;
}

function radians(degrees) {
  return (degrees * Math.PI) / 180.0;
}

function radiansEulerFromDegreesEuler(euler) {
  return new THREE.Euler(radians(euler.x), radians(euler.y), radians(euler.z));
}
