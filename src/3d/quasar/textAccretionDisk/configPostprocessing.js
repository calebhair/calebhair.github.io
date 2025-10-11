import { WIDTH_SCALE_FACTOR } from '../quasarConfig';

/**
 * Scales the middle values of the given gradient; the start should not be scaled, and the final is scaled separately.
 * @param gradient
 */
function scaleGradientMiddleValues(gradient) {
  if (WIDTH_SCALE_FACTOR === 1) return;

  const distances = Object.keys(gradient);
  for (let i = 1; i < distances.length; i++) {
    const oldDistance = distances[i];
    const newDistance = Math.floor(distances[i] * WIDTH_SCALE_FACTOR);

    if (gradient[newDistance] !== undefined) console.warn(`Gradient distance ${newDistance} already used for ${gradient}`);

    // Replace keys as described here: https://stackoverflow.com/questions/4647817/javascript-object-rename-key
    Object.defineProperty(gradient, newDistance,
      Object.getOwnPropertyDescriptor(gradient, oldDistance));
    delete gradient[oldDistance];
  }
}

export function postprocessGradient(gradent) {
  scaleGradientMiddleValues(gradent);
}
