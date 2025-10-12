// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { EVENTS } from '../../constants';

const marginEm = 4;

function ProjectTitle() {
  const [title, setTitle] = useState('placeholder');
  const [visible, setVisible] = useState(false);
  const [widthEm, setWidthEm] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  addEventListeners(setTitle, setVisible, setWidthEm, setTextOpacity);

  return (
    <div className="titlebox-container">
      <div
        className={`infobox title border ${visible ? 'show-infobox' : ''}`}
        style={{ width: `${widthEm}em` }}
      >
        <h1 className="info" style={{ opacity: textOpacity }}>
          { title }
        </h1>
      </div>

      <div className="scroll-arrow">
        <i className={'material-symbols-outlined ' + (visible ? 'show-arrow' : '')}>arrow_drop_down</i>
      </div>
    </div>
  );
}

let eventListenersAdded = false;
function addEventListeners(setTitle, setVisible, setWidthEm, setTextOpacity) {
  if (eventListenersAdded) return;
  eventListenersAdded = true;

  // Showing or hiding the title has two parts, the box and the text
  const secondAnimationDelay = 200;
  document.addEventListener(EVENTS.PLANET_FOCUSSED, (event) => {
    const { name } = event.detail;
    setVisible(true);
    setWidthEm(name.length + marginEm);
    setTimeout(() => {
      setTitle(name);
      setTextOpacity(1);
    }, secondAnimationDelay);
  });

  document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => {
    setTextOpacity(0);
    setTimeout(() => {
      setWidthEm(0);
      setVisible(false);
    }, secondAnimationDelay / 2);
  });

  document.addEventListener(EVENTS.PLANET_CHANGED, (event) => {
    const { name } = event.detail;
    setTextOpacity(0);
    setWidthEm(name.length + marginEm);
    setTimeout(() => {
      setTitle(name);
      setTextOpacity(1);
    }, secondAnimationDelay);
  });
}

/**
 * Add info box stuff to DOM.
 */
export function addTitleBox() {
  const sidebarNode = document.getElementsByClassName('project-info-container')[0];
  createRoot(sidebarNode).render(<ProjectTitle />);
}
