import { FontLoader } from 'three/addons';
import { createTextFlow, updateFlows } from './orbitingText';
import { consumeAccretionText } from './text';
import {
  getDepthForDistance,
  getFontSizeForDistance,
  getMaterialForDistance,
  getOrbitSpeedForDistance,
} from './gradientSystem';
import { ACCRETION_WIDTH, BLACK_HOLE_RADIUS } from '../quasarConfig';

const loader = new FontLoader();

export function addTextAccretionDisk(scene) {
  loader.load('/SourceCodePro.json', (font) => {
    let radius = BLACK_HOLE_RADIUS;

    while (radius < ACCRETION_WIDTH) {
      const fontSize = getFontSizeForDistance(radius);
      const text = consumeAccretionText(radius, fontSize);
      const material = getMaterialForDistance(radius);
      const orbitSpeed = getOrbitSpeedForDistance(radius);
      const depth = getDepthForDistance(radius);

      createTextFlow(scene, text, font, fontSize, material, radius, depth, orbitSpeed);
      radius += fontSize;
    }
  });

  return updateFlows;
}
