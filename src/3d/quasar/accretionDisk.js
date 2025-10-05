import { FontLoader } from 'three/addons';
import { createTextFlow, updateFlows } from './textBending';
import { consumeAccretionText } from './accretionText';
import { getMaterialForDistance } from './accretionConfig';

const loader = new FontLoader();

export function addTextAccretionDisk(scene) {
  loader.load('/SourceCodePro.json', (font) => {
    let radius = 6;
    const fontSize = 3;

    for (let i = 0; i < 10; i++) {
      const text = consumeAccretionText(radius, fontSize);
      const material = getMaterialForDistance(radius);

      createTextFlow(scene, text, font, fontSize, material, radius, 1);
      radius += fontSize;
    }
  });

  return updateFlows;
}
