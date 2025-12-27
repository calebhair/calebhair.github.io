export const BLACK_HOLE_RADIUS = 40;
export const WIDTH_SCALE_FACTOR = 1;
export const ACCRETION_WIDTH = 200;

// WARNING: distances that are not round are ignored TODO fix
// TODO make configurations consistent

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
  120: { color: 0xaaaaaa, easeFunction: easeOutExpo },
  185: { color: 0x666666 },
  [ACCRETION_WIDTH]: { color: 0x333333 },
};

export const orbitSpeedGradient = {
  [BLACK_HOLE_RADIUS]: 1,
  100: 0.04,
  [ACCRETION_WIDTH]: 0.001,
};

export const fontSizeGradient = {
  [BLACK_HOLE_RADIUS]: 4,
  100: 5,
  180: 5,
  [ACCRETION_WIDTH]: 3,
};

export const depthGradient = {
  [BLACK_HOLE_RADIUS]: { depth: 20, easeFunction: easeOutExpo },
  // 100: { depth: 0.2 },
  [ACCRETION_WIDTH]: { depth: 0.2 },
};

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

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

[materialGradient, orbitSpeedGradient, fontSizeGradient, depthGradient]
  .forEach((gradient) => {
    scaleGradientMiddleValues(gradient);
  });
