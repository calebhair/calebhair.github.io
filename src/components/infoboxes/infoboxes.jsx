// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { EVENTS } from '../../constants';
import { Title } from './title';
import { ProjectDescription } from './projectDescription';
import { ScrollArrow } from './scrollArrow';

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
