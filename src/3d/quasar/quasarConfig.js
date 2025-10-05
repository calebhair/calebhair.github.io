import { postprocessGradient } from './textAccretionDisk/configPostprocessing';

export const BLACK_HOLE_RADIUS = 10;
export const WIDTH_SCALE_FACTOR = 1;
export const ACCRETION_WIDTH = 100;

// WARNING: distances that are not round are ignored TODO fix

/**
 * Values greater than or equal to the distance specified by the key
 * are configured according to the value at that key.
 * Special configuration fields:
 * @param easeFunction {CallableFunction} a function that takes in a single parameter, such as one from https://easings.net/#
 *    that describes how to transition to the next value.
 */

export const materialGradient = {
  [BLACK_HOLE_RADIUS]: { color: 0x00ff00 },
  50: { color: 0xff0000 },
  [ACCRETION_WIDTH]: { color: 0x0000ff },
};

export const orbitSpeedGradient = {
  [BLACK_HOLE_RADIUS]: 0.7,
  [ACCRETION_WIDTH]: 0.0001,
};

export const fontSizeGradient = {
  [BLACK_HOLE_RADIUS]: 2,
  [ACCRETION_WIDTH]: 5,
};

export const depthGradient = {
  [BLACK_HOLE_RADIUS]: { depth: 6, easeFunction: easeInOutQuint },
  [ACCRETION_WIDTH]: { depth: 0.2 },
};

function easeInOutQuint(x) {
  return (x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2);
}

[materialGradient, orbitSpeedGradient, fontSizeGradient, depthGradient]
  .forEach(postprocessGradient);
