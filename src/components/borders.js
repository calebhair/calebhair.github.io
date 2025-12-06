import { EVENTS } from '../constants';
import { getClientCoords } from '../common';

let borderedElementsToUpdate = [];
let lastPointerDownEvent;
function updateBorderedElements() {
  borderedElementsToUpdate = Array.from(document.getElementsByClassName('border'));
  if (lastPointerDownEvent) updateFromPointerEvent(lastPointerDownEvent);
  else borderedElementsToUpdate.forEach(element => setBorderAngle(element, Math.PI / 4));
}
document.addEventListener(EVENTS.UPDATE_BORDERS, updateBorderedElements);

export function setupBorders() {
  document.addEventListener('mousemove', updateFromPointerEvent);
  document.addEventListener('touchmove', updateFromPointerEvent);
  document.addEventListener('mousedown', event => lastPointerDownEvent = event);
  document.addEventListener('touchstart', event => lastPointerDownEvent = event);
  setInterval(updateBorderedElements, 500); // todo TEMPORARY
}

function updateFromPointerEvent(event) {
  const { clientX, clientY } = getClientCoords(event);
  borderedElementsToUpdate.forEach((element) => {
    const clientRect = element.getBoundingClientRect();
    const centerX = clientRect.left + clientRect.width / 2;
    const centerY = clientRect.top + clientRect.height / 2;
    let angle = Math.atan2(clientX - centerX, centerY - clientY) + Math.PI;
    if (angle < 0) angle += 2 * Math.PI;
    setBorderAngle(element, angle);
  });
}

function setBorderAngle(element, angleRad) {
  element.style.setProperty('--border-angle', `${angleRad}rad`);
}
