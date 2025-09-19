const minimumOpacity = 0.5;
const minimumOpacityAtProgress = 0.6;
const opacityRateOfChange = 100;
let twinkleBorderProgress = 0; // 0 to 1

export function animateTwinkleGradient(elements) {
  for (const element of elements) {
    twinkleBorderProgress += 0.001;

    if (twinkleBorderProgress >= 1) {
      twinkleBorderProgress = 0;
    }

    // opacity = 5(progress - 0.7)^2+0.7
    const opacity = opacityRateOfChange * Math.pow(twinkleBorderProgress - minimumOpacityAtProgress, 2) + minimumOpacity;
    setTwinkleGradient(element, opacity);
  }
}

function setTwinkleGradient(element, opacity) {
  element.style.borderImageSource
    = `conic-gradient(
    rgba(255, 255, 255, ${1}) 6%,
    rgba(255, 255, 255, ${opacity}) 22%,
    rgba(255, 255, 255, ${1}) 40%,
    rgba(255, 255, 255, ${opacity}) 51%,
    rgba(255, 255, 255, ${1}) 53%,
    rgba(255, 255, 255, ${opacity}) 64%,
    rgba(255, 255, 255, ${1}) 69%,
    rgba(255, 255, 255, ${1}) 81%,
    rgba(255, 255, 255, ${opacity}) 85%,
    rgba(255, 255, 255, ${1}) 90%
    )`;
}
