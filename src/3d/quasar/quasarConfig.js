import { postprocessGradient } from './textAccretionDisk/configPostprocessing';

export const BLACK_HOLE_RADIUS = 40;
export const WIDTH_SCALE_FACTOR = 1;
export const ACCRETION_WIDTH = 200;

// WARNING: distances that are not round are ignored TODO fix

/**
 * Values greater than or equal to the distance specified by the key
 * are configured according to the value at that key.
 * Special configuration fields:
 * @param easeFunction {CallableFunction} a function that takes in a single parameter, such as one from https://easings.net/#
 *    that describes how to transition to the next value.
 */

// export const materialGradient = {
//   [BLACK_HOLE_RADIUS]: { color: 0xaaffaa },
//   50: { color: 0x77bb38 },
//   [ACCRETION_WIDTH]: { color: 0xEEEEEE },
// };

export const materialGradient = {
  [BLACK_HOLE_RADIUS]: { color: 0xffffff },
  30: { color: 0xffff99 },
  80: { color: 0xffaa00 },
  95: { color: 0x884411 },
  120: { color: 0xaaaaaa },
  [ACCRETION_WIDTH]: { color: 0x111111 },
};

export const orbitSpeedGradient = {
  [BLACK_HOLE_RADIUS]: 1,
  100: 0.04,
  [ACCRETION_WIDTH]: 0.001,
};

export const fontSizeGradient = {
  [BLACK_HOLE_RADIUS]: 4,
  100: 5,
  [ACCRETION_WIDTH]: 5,
};

export const depthGradient = {
  [BLACK_HOLE_RADIUS]: { depth: 20, easeFunction: easeOutExpo },
  // 100: { depth: 0.2 },
  [ACCRETION_WIDTH]: { depth: 0.2 },
};

function easeInOutQuint(x) {
  return (x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2);
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

[materialGradient, orbitSpeedGradient, fontSizeGradient, depthGradient]
  .forEach(postprocessGradient);
