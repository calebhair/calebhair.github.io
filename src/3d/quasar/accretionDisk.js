import * as THREE from 'three';
import { FontLoader } from 'three/addons';
import { createTextFlow, updateFlows } from './textBending';
import { consumeAccretionText } from './accretionText';
import { getMaterialForDistance } from './accretionConfig';

const loader = new FontLoader();

export function addTextAccretionDisk(scene) {
  loader.load('/SourceCodePro.json', (font) => {
    const radius = 10;
    const fontSize = 3;
    const x = getMaterialForDistance(radius);
    console.log(x);
    createTextFlow(scene, consumeAccretionText(radius, fontSize), font, fontSize,
      x, radius, 1);
  });

  return updateFlows;
}
