// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { EVENTS } from '../../constants';
import { Title } from './title';
import { ProjectDescription } from './projectDescription';
import { ScrollArrow } from './scrollArrow';
import { ConditionalScrollSystem } from '../../conditionalScrollSystem';

export function Infoboxes() {
  const [visible, setVisible] = useState(false);
  addEventListeners(setVisible);

  return (
    <>
      <div className="spacer"></div>

      <div className="scrollable">
        <Title />
        <ScrollArrow visible={visible} />
        <ProjectDescription visible={visible} />
      </div>
    </>
  );
}

let eventListenersAdded = false;
function addEventListeners(setVisible) {
  if (eventListenersAdded) return;
  eventListenersAdded = true;

  document.addEventListener(EVENTS.PLANET_FOCUSSED, () => {
    setVisible(true);
  });
  document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => {
    setVisible(false);
  });
}

const scrollSystem = new ConditionalScrollSystem(event => event?.changedTouches?.[0].clientY || event.clientY < 300);
let scroll = 0;
scrollSystem.addListener(console.warn);
scrollSystem.addListener((change) => {
  console.warn('scroll: ', scroll);
  scroll += change;
  document.querySelector('.scrollable').style.marginTop = `${scroll}vh`;
});
