// Materials greater than or equal to the distance specified by the key are configured according to the value at that key.
import { MeshBasicMaterial } from 'three';

const materialGradient = {
  6: new MeshBasicMaterial({ color: 0xaaffaa }),
  12: new MeshBasicMaterial({ color: 0xaaaaff }),
};

/**
 * Finds the material from the gradient for an element at this distance.
 * @param distance
 * @return {*}
 */
export function getMaterialForDistance(distance) {
  return getPropertyFromDistance(distance, materialGradient);
}

/**
 * Finds the value for the highest value below the queried distance.
 * @param distance the distance being queried.
 * @param gradient an object where the keys are numbers in ascending order.
 * @return {*}
 */
function getPropertyFromDistance(distance, gradient) {
  const distanceThresholds = Object.keys(gradient);
  let highestLowerDistance = distanceThresholds[0];
  for (const distanceThreshold of distanceThresholds) {
    if (distance < distanceThreshold) break;
    highestLowerDistance = distanceThreshold;
  }

  return gradient[Math.min(highestLowerDistance, distance)];
}
