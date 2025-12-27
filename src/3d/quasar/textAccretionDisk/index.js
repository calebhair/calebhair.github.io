import { FontLoader } from 'three/addons';
import { createTextFlow, updateFlows } from './orbitingText';
import { consumeAccretionText } from './text';
import {
  getDepthForDistance,
  getFontSizeForDistance,
  getMaterialForDistance,
  getOrbitSpeedForDistance,
} from './gradientSystem';
import { ACCRETION_WIDTH, BLACK_HOLE_RADIUS, WIDTH_SCALE_FACTOR } from '../quasarConfig';
import { loading } from '../../loadingState';

const loader = new FontLoader();

export function addTextAccretionDisk(scene) {
  loader.load('/SourceCodePro.json', (font) => {
    let radius = BLACK_HOLE_RADIUS + 2;
    loading.blackHole.accretionDiskSize = ACCRETION_WIDTH - BLACK_HOLE_RADIUS;

    while (radius < ACCRETION_WIDTH * WIDTH_SCALE_FACTOR) {
      const fontSize = getFontSizeForDistance(radius);
      const text = consumeAccretionText(radius, fontSize);
      const material = getMaterialForDistance(radius);
      const orbitSpeed = getOrbitSpeedForDistance(radius);
      const depth = getDepthForDistance(radius);

      const flow = createTextFlow(scene, text, font, fontSize, material, radius, depth, orbitSpeed);
      flow.object3D.frustumCulled = false;

      if (radius <= 110) {
        const warpedFlow = createTextFlow(scene, text.repeat(2), font, fontSize, material, radius, depth, orbitSpeed, true);
        warpedFlow.object3D.frustumCulled = false;
      }

      radius += fontSize;
      loading.blackHole.accretionDiskDistanceLoaded += fontSize;
    }
  });

  return updateFlows;
}
