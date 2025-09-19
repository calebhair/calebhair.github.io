import { animateQuasarGradients } from './borders/quasar';
import { animateTwinkleGradient } from './borders/twinkle';

document.addEventListener('DOMContentLoaded', () => {
  const updateRate = 30; // times per second
  const quasarBorderElements = document.getElementsByClassName('quasar-border');
  const twinkleBorderElements = document.getElementsByClassName('twinkle-border');

  setInterval(() => {
    animateQuasarGradients(quasarBorderElements);
  }, 1 / updateRate);
  setInterval(() => {
    animateTwinkleGradient(twinkleBorderElements);
  }, 1 / updateRate);
});
