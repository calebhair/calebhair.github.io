import { MeshBasicMaterial, Color } from 'three';
import { depthGradient, fontSizeGradient, materialGradient, orbitSpeedGradient } from '../quasarConfig';

/**
 * Finds the material from the gradient for an element at this distance.
 * @param distance
 * @return {MeshBasicMaterial}
 */
export function getMaterialForDistance(distance) {
  return new MeshBasicMaterial(getInterpolatedValueFromDistance(distance, materialGradient, interpolateMaterialConfig));
}

export function getOrbitSpeedForDistance(distance) {
  return getInterpolatedValueFromDistance(distance, orbitSpeedGradient, lerp);
}

export function getFontSizeForDistance(distance) {
  return getInterpolatedValueFromDistance(distance, fontSizeGradient, lerp);
}

export function getDepthForDistance(distance) {
  return getInterpolatedValueFromDistance(distance, depthGradient, interpolateDepth);
}

/**
 * Interpolates between two material configurations.
 * @param mat1Config {object}
 * @param mat2Config {object}
 * @param alpha {number} between 0 and 1, closer to 0 returns a material config closer to mat1, closer to 1 is closer to mat2.
 */
function interpolateMaterialConfig(mat1Config, mat2Config, alpha) {
  const color = new Color().lerpColors(
    new Color(mat1Config.color),
    new Color(mat2Config.color),
    alpha);

  const transparent = Boolean(mat2Config.opacity);
  const opacity = mat2Config.opacity || 0;

  return { color, transparent, opacity };
}

function interpolateDepth(depthConfig1, depthConfig2, alpha) {
  return lerp(depthConfig1.depth, depthConfig2.depth, alpha);
}

/**
 * Linearly interpolates a value for the provided distance, depending on the gradient.
 * @param distance
 * @param gradient an object with a 'lerp' function.
 * @param lerpFunc a function that takes in two values from the gradient and an alpha value.
 * @return {*}
 */
function getInterpolatedValueFromDistance(distance, gradient, lerpFunc) {
  const { lowerBound, upperBound } = getGradientBoundariesFromDistance(distance, gradient);
  const lowerBoundValue = lowerBound.value;
  let alpha = invlerp(lowerBound.distance, upperBound.distance, distance);
  if (isNaN(alpha)) alpha = 0;
  if (lowerBoundValue.easeFunction) {
    alpha = lowerBoundValue.easeFunction(alpha);
  }
  return lerpFunc(lowerBoundValue, upperBound.value, alpha);
}

/**
 * Given some distance and a gradient, finds the closest upper and lower boundaries of a gradient at that point.
 * @param distance
 * @param gradient an object where the keys are numbers in ascending order.
 * @return {*} the lower and upper boundaries closest to the distance provided, with their values.
 */
function getGradientBoundariesFromDistance(distance, gradient) {
  const distanceThresholds = Object.keys(gradient);
  let highestLowerDistance;

  let i = 0;
  for (; i < distanceThresholds.length; i++) {
    const distanceThreshold = distanceThresholds[i];
    if (distance < distanceThreshold) break;
    highestLowerDistance = distanceThreshold;
  }

  // If distance is lower than the lowest threshold, return the lowest threshold for both lower and upper boundaries
  if (highestLowerDistance === undefined) {
    return getBoundsWithValues(distanceThresholds[0], distanceThresholds[0], gradient);
  }

  // Get upper boundary
  const upperBound = distanceThresholds[i];
  // If the lower boundary is the highest boundary, return that for both upper and lower
  if (upperBound === undefined) {
    return getBoundsWithValues(highestLowerDistance, highestLowerDistance, gradient);
  }

  return getBoundsWithValues(highestLowerDistance, upperBound, gradient);
}

function getBoundsWithValues(lowerBound, upperBound, gradient) {
  return {
    lowerBound: { distance: lowerBound, value: gradient[lowerBound] },
    upperBound: { distance: upperBound, value: gradient[upperBound] },
  };
}

// https://www.trysmudford.com/blog/linear-interpolation-functions/
const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
