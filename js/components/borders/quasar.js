let quasarBorderProgress = 0; // Note that this doesn't have any particular unit or upper limit
let quasarBorderDirection = 0;

export function animateQuasarGradients(elements) {
  for (const element of elements) {
    quasarBorderProgress += 0.2e-5; // Increase to speed up
    quasarBorderDirection += Math.abs(5 * Math.sin(2 * quasarBorderProgress));
    if (quasarBorderDirection >= 360) {
      quasarBorderDirection = 0;
      quasarBorderProgress = 0;
    }

    setQuasarGradient(element, quasarBorderDirection);
  }
}

function setQuasarGradient(element, direction) {
  element.style.borderImageSource
    = `linear-gradient(${direction}deg,
        rgba(0, 0, 0, 1) ${0}px,
        rgba(255, 255, 43, 1) ${5}%,
        rgba(0, 255, 30, 1) ${17}%,
        rgba(227, 227, 227, 1) ${24}%,
        rgba(224, 224, 224, 1) ${88}%,
        rgba(66, 66, 66, 1) ${94}%)`;
}
