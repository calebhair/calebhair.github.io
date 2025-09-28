import { TextGeometry } from 'three/addons';
import * as THREE from 'three';
import { Flow } from 'three/addons/modifiers/CurveModifier';

const rad = deg => (deg * Math.PI) / 180.0;
const flows = [];

const baseRotationSpeed = 0.1;

/**
 * Updates the positions of all generated disks.
 * @param delta the time since the last frame.
 */
export function updateFlows(delta) {
  flows.forEach(flow => flow.moveAlongCurve(delta * baseRotationSpeed));
}

const NUM_CIRCLE_POINTS = 16;
const RIGHT_ANGLE_IN_RADIANS = rad(90);

/**
 * Creates a circular text flow; this is a path that text follows.
 * @param scene
 * @param text {string} the text to show.
 * @param font {THREE.Font} a loaded font.
 * @param fontSize {number} the size of the font; this appears to be in scene units, not font px.
 * @param fontMaterial {THREE.MeshBasicMaterial} the material of the font.
 * @param radius {number} the distance from the centre the closest edge of the text should be.
 * @param fontDepth {number} the deep th e font is.
 */
export function createTextFlow(scene, text, font, fontSize, fontMaterial, radius, fontDepth = 1) {
  const geometry = new TextGeometry(text, {
    font: font,
    size: fontSize,
    depth: fontDepth,
    curveSegments: 3,
  });

  const textMesh = new THREE.Mesh(geometry, fontMaterial);
  geometry.rotateX(RIGHT_ANGLE_IN_RADIANS);
  geometry.translate(0, fontDepth / 2, 0);

  // Curve for path
  const curve = new THREE.CatmullRomCurve3(generateCirclePointPositions(NUM_CIRCLE_POINTS, radius));
  curve.curveType = 'centripetal';
  curve.closed = true;

  // Flow for movement
  const flow = new Flow(textMesh);
  flow.updateCurve(0, curve);
  scene.add(flow.object3D);
  flows.push(flow);
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
