import * as THREE from 'three';
import { BLACK_HOLE_RADIUS } from './quasarConfig';

let mesh;
export function addSideAccretionDiskShape(scene) {
  const distortionShape = new THREE.Shape();
  drawAccretionShape(distortionShape, 5, 2.5, 1);
  const extrudeSettings = {
    depth: 4,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1,
  };
  const geometry = new THREE.ExtrudeGeometry(distortionShape, extrudeSettings);
  mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
}

function drawAccretionShape(shape, xScale, yScale, offsetScale) {
  const curveWidth = BLACK_HOLE_RADIUS * xScale;
  const curveHeight = BLACK_HOLE_RADIUS * yScale;
  const xOffset = BLACK_HOLE_RADIUS * offsetScale;

  const halfWidth = curveWidth / 2;
  const halfHeight = curveHeight / 2;

  shape.moveTo(-halfWidth, 0);
  shape.bezierCurveTo(-halfWidth + xOffset, 0, -xOffset, halfHeight, 0, halfHeight);
  shape.bezierCurveTo(xOffset, halfHeight, halfWidth - xOffset, 0, halfWidth, 0);
  shape.bezierCurveTo(halfWidth - xOffset, 0, xOffset, -halfHeight, 0, -halfHeight);
  shape.bezierCurveTo(-xOffset, -halfHeight, xOffset - halfWidth, 0, -halfWidth, 0);
}

// const baseScale = new Vector3(1, 1, 1);
export function updateSideAccretionDisk(camera) {
  mesh.lookAt(camera.position);
  // const scaleFactor = Math.abs(mesh?.rotation.y) / Math.PI;
  // mesh.scale.copy(baseScale.clone().multiplyScalar(scaleFactor));
}
