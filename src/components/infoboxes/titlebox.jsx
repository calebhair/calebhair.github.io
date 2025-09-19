// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { EVENTS } from '../../constants';

function ProjectTitle() {
  const [title, setTitle] = useState('');
  const [visible, setVisible] = useState(false);
  addEventListeners(setTitle, setVisible);

  return (
    <div>
      <div className={'infobox title border quasar-border ' + (visible ? 'showInfobox' : '')}>
        <h1 className="info">
          { title }
        </h1>
      </div>

      <div className="scroll-arrow">
        <i className={'material-symbols-outlined ' + (visible ? 'showArrow' : '')}>arrow_drop_down</i>
      </div>
    </div>
  );
}

let eventListenersAdded = false;
function addEventListeners(setTitle, setVisible) {
  if (eventListenersAdded) return;
  eventListenersAdded = true;

  document.addEventListener(EVENTS.PLANET_FOCUSSED, (event) => {
    setTitle(event.detail.name);
    setVisible(true);
  });

  document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => {
    setVisible(false);
  });
}

/**
 * Add info box stuff to DOM.
 */
export function addTitleBox() {
  const sidebarNode = document.getElementsByClassName('project-info')[0];
  createRoot(sidebarNode).render(<ProjectTitle />);
}
