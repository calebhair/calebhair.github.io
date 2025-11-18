// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { EVENTS } from '../../constants';
import { ScrollSystemListener } from '../scrollSystemListener';

const marginEm = 4;

export function Title({ scrollSystem }) {
  const [title, setTitle] = useState('placeholder');
  const [visible, setVisible] = useState(false);
  const [widthEm, setWidthEm] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  addEventListeners(setTitle, setVisible, setWidthEm, setTextOpacity);

  return (
    <ScrollSystemListener
      className={`infobox title border ${visible ? 'show-infobox' : ''}`}
      style={{ width: `${widthEm}em` }}
      scrollSystem={scrollSystem}
    >
      <h1 className="info" style={{ opacity: textOpacity }}>
        { title }
      </h1>
    </ScrollSystemListener>
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
