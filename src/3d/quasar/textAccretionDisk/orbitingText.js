import { TextGeometry } from 'three/addons';
import * as THREE from 'three';
import { Flow } from 'three/addons/modifiers/CurveModifier';
import { BLACK_HOLE_RADIUS } from '../quasarConfig';

const rad = deg => (deg * Math.PI) / 180.0;
const flows = [];

const warpedDisksParent = new THREE.Object3D();
export function setupWarpedDisks(scene) {
  scene.add(warpedDisksParent);
}

const baseRotationSpeed = 0.1;

/**
 * Updates the positions of all generated disks.
 * @param delta the time since the last frame.
 * @param camera
 */
export function updateFlows(delta, camera) {
  const rotationMatrix = new THREE.Matrix4();
  rotationMatrix.lookAt(new THREE.Vector3(), camera.position, new THREE.Vector3(0, 1, 0));

  flows.forEach((flow) => {
    flow.moveAlongCurve(flow.orbitSpeed * delta);
    if (flow.isWarpedDisk) {
      pointFlowTowardsCamera(flow, rotationMatrix);
    }
  });
}

function pointFlowTowardsCamera(flow, cameraRotationMatrix) {
  const curve = flow.curveArray[0];
  curve.originalCurve.points.forEach((point, index) => {
    curve.points[index] = point.clone().applyMatrix4(cameraRotationMatrix);
  });
  flow.updateCurve(0, curve);
}

const NUM_CIRCLE_POINTS = 16;
const RIGHT_ANGLE_IN_RADIANS = rad(90);

/**
 * Creates a circular text flow; this is a path that text follows.
 * @param scene
 * @param text {string} the text to show.
 * @param font {Font} a loaded font.
 * @param fontSize {number} the size of the font; this appears to be in scene units, not font px.
 * @param fontMaterial {MeshBasicMaterial} the material of the font.
 * @param radius {number} the distance from the centre the closest edge of the text should be.
 * @param fontDepth {number} the deep th e font is.
 * @param orbitSpeed {number} a fast text orbits around the black hole.
 */
export function createTextFlow(scene, text, font, fontSize, fontMaterial, radius, fontDepth = 1, orbitSpeed = baseRotationSpeed, warpedDisk = false) {
  const scaleFactor = radius / warpedDiskWidestWidth * 2; // For warped disks
  const geometry = new TextGeometry(text, {
    font: font,
    size: warpedDisk ? fontSize * scaleFactor : fontSize,
    depth: fontDepth,
    curveSegments: 3,
  });

  const textMesh = new THREE.Mesh(geometry, fontMaterial);
  geometry.rotateX(RIGHT_ANGLE_IN_RADIANS);
  geometry.translate(0, fontDepth / 2, 0);

  // Curve for path
  let curve;
  if (warpedDisk) {
    curve = new THREE.CatmullRomCurve3(generateWarpedPointPositions(NUM_CIRCLE_POINTS));
  }
  else {
    curve = new THREE.CatmullRomCurve3(generateCirclePointPositions(NUM_CIRCLE_POINTS, radius));
  }
  curve.curveType = 'centripetal';
  curve.closed = true;

  // Flow for movement
  const flow = new Flow(textMesh);
  flow.orbitSpeed = orbitSpeed;
  flow.updateCurve(0, curve);
  flow.isWarpedDisk = warpedDisk;
  scene.add(flow.object3D);
  flows.push(flow);

  if (warpedDisk) {
    flow.object3D.scale.set(scaleFactor, scaleFactor, 1);
    warpedDisksParent.add(flow.object3D);
    curve.originalCurve = curve.clone();
  }

  return flow;
}

/**
 * Generates Vector3 positions in a circular pattern.
 * @param numPoints {number} how many points to generate.
 * @param radius {number} how far the points should be from the centre.
 * @return {THREE.Vector3[]}
 */
function generateCirclePointPositions(numPoints, radius) {
  const pointPositions = [];
  const segmentAngle = 2 * Math.PI / numPoints;
  for (let i = 0; i < numPoints; i++) {
    pointPositions.push(
      new THREE.Vector3(
        radius * Math.cos(i * segmentAngle),
        0,
        radius * Math.sin(i * segmentAngle)),
    );
  }
  return pointPositions;
}

const warpedDiskScale = { xScale: 5, yScale: 3, offsetScale: 1.5 };
const warpedDiskShape = drawWarpedAccretionShape(warpedDiskScale);
let warpedDiskWidestWidth = warpedDiskScale.xScale * BLACK_HOLE_RADIUS;

function generateWarpedPointPositions(numPoints) {
  return warpedDiskShape.getPoints(numPoints).map((v2) => {
    return new THREE.Vector3(v2.x, v2.y, 0);
  });
}

/**
 * Creates a shape consisting of points to form the warped accretion disk shape.
 * @param xScale how much larger relative to the black hole radius that the shape should be.
 * @param yScale same as xScale, but for height.
 * @param offsetScale how 'squished' the shape should be.
 */
function drawWarpedAccretionShape({ xScale = 5, yScale = 2.5, offsetScale = 1 }) {
  const shape = new THREE.Shape();
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
  return shape;
}
