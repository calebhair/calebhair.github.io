import { animateQuasarGradients } from './quasar';
import { animateTwinkleGradient } from './twinkle';
import { ENABLE_ANIMATED_GRADIENTS } from '../../constants';

document.addEventListener('DOMContentLoaded', () => {
  if (!ENABLE_ANIMATED_GRADIENTS) return;

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
