import * as THREE from 'three';
import * as QUARKS from 'three.quarks';
import {
  accretionDisKConfig1,
  accretionDisKConfig2,
  accretionDiskConfig3,
  accretionDiskConfig4,
  accretionDiskConfig5,
  accretionDiskConfig6,
  defaultSettings, jetConfig, textDebrisConfig, textDebrisConfigurations,
} from './configurations';

const particleSystems = [];
const accretionDiskBaseY = 0;

/**
 * Creates a black sphere and adds it to the scene.
 * @param scene the scene to add the black hole to.
 * @param camera the camera, for adding post-processing.
 */
export function addBlackHole(scene, camera) {
  if (!scene) throw `Bad scene: ${scene}`;
  if (!camera) throw `Bad camera: ${scene}`;

  const geometry = new THREE.SphereGeometry(6, 32, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  return sphere;
}

/**
 * Creates the particle systems for the accretion disk and adds them to the scene and batched renderer.
 * @param scene
 * @param batchedRenderer {QUARKS.BatchedRenderer}
 */
export async function setupAccretionDisk(scene, batchedRenderer) {
  // Accretion disk
  makeParticleSystem(accretionDisKConfig1, 50, batchedRenderer, scene, -0.5);
  makeParticleSystem(accretionDisKConfig2, 50, batchedRenderer, scene, -0.8);
  makeParticleSystem(accretionDiskConfig3, 50, batchedRenderer, scene, -1);
  makeParticleSystem(accretionDiskConfig4, 50, batchedRenderer, scene, -0.6);
  makeParticleSystem(accretionDiskConfig5, 50, batchedRenderer, scene, -0.4);
  makeParticleSystem(accretionDiskConfig6, 50, batchedRenderer, scene);

  // Jets
  const rightAngleRadians = 1.5708;
  const topJet = makeParticleSystem(jetConfig, 100, batchedRenderer, scene);
  topJet.rotation.set(-rightAngleRadians, 0, 0);
  const bottomJet = makeParticleSystem(jetConfig, 100, batchedRenderer, scene);
  bottomJet.rotation.set(rightAngleRadians, 0, 0);

  await setupTextDebris(scene, batchedRenderer);
  scene.add(batchedRenderer);
}

/**
 * Helper for creating particle systems from the default settings.
 * @param overwrittenSettings JSON object the particle system settings to overwrite the defaults with.
 * @param length the length of trails, if enabled (this must be done separately due to what I think is a bug in quarks).
 * @param batchedRenderer the batched renderer instance to add the system to.
 * @param scene the scene to add the emitter to.
 * @param y the y position to set the emitter to.
 * @return {QUARKS.ParticleEmitter<>} the emitter, for further configuration as needed.
 */
function makeParticleSystem(overwrittenSettings, length, batchedRenderer, scene, y = 0) {
  const particleSystem = new QUARKS.ParticleSystem({
    ...defaultSettings,
    ...overwrittenSettings,
  });
  particleSystem.rendererEmitterSettings.startLength = new QUARKS.ConstantValue(length);
  particleSystems.push(particleSystem);

  // Add the particle system to the batched renderer
  batchedRenderer.addSystem(particleSystem);

  // Add the particle system to the scene
  const emitter = particleSystem.emitter;
  emitter.position.y = y + accretionDiskBaseY;
  scene.add(emitter);
  return emitter;
}

/**
 * Adds 0 and 1 "text debris" to the accretion disk.
 * @param scene the scene to add the particle systems to.
 * @param batchedRenderer the batched renderer instance to add the particle systems to.
 */
export async function setupTextDebris(scene, batchedRenderer) {
  // Load in materials
  const zeroMaterial = new THREE.MeshBasicMaterial({
    map: await new THREE.TextureLoader().loadAsync('/img/zero.png'),
    color: 0x09C405,
    transparent: true,
    opacity: 1,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
  });
  const oneMaterial = new THREE.MeshBasicMaterial({
    map: await new THREE.TextureLoader().loadAsync('/img/one.png'),
    color: 0x09C405,
    transparent: true,
    opacity: 1,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
  });

  // For each configuration, make a system for 1 and 0 textures
  for (const configuration of textDebrisConfigurations) {
    makeParticleSystem({ ...textDebrisConfig, ...configuration, material: zeroMaterial }, 0, batchedRenderer, scene);
    makeParticleSystem({ ...textDebrisConfig, ...configuration, material: oneMaterial }, 0, batchedRenderer, scene);
  }
}

export function dimParticles() {
  for (const system of particleSystems) {
    system.startColor.color.w = 0.1;
  }
}

export function undimParticles() {
  for (const system of particleSystems) {
    system.startColor.color.w = 1;
  }
}
