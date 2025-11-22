// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { EVENTS } from '../../constants';
import { ScrollSystemListener } from '../scrollSystem/scrollSystemListener';

export function ProjectDescription({ visible, scrollSystem }) {
  const [description, setDescription] = useState('placeholder');
  addEventListeners(setDescription);

  return (
    <ScrollSystemListener className={`infobox project-desc border ${visible ? 'show-infobox' : ''}`} scrollSystem={scrollSystem}>
      <div className="desc-text" dangerouslySetInnerHTML={{ __html: description }} />
    </ScrollSystemListener>
  );
}

let eventListenersAdded = false;
function addEventListeners(setTitle) {
  if (eventListenersAdded) return;
  eventListenersAdded = true;

  document.addEventListener(EVENTS.PLANET_FOCUSSED, (event) => {
    const { description } = event.detail;
    setTitle(description);
  });

  document.addEventListener(EVENTS.PLANET_CHANGED, (event) => {
    const { description } = event.detail;
    setTitle(description);
  });
}
