// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { stopFollowing } from '../../3d/focus';
import { EVENTS, NAV_BTN_STATES } from '../../constants';

// The icons to show for each state, where the ID of the state represents the index of the icon name from Google icons
const navBtnIcons = [
  'planet',
  'planet',
  'arrows_output',
];

function NavBtn() {
  const [navState, setNavState] = useState(NAV_BTN_STATES.Default);
  const [moveOffscreen, setMoveOffscreen] = useState(true);
  addEventListeners(navState, setNavState, setMoveOffscreen);

  const isClicked = navState === NAV_BTN_STATES.Sidebar;
  return (
    <button
      // Only show the clicked style if the sidebar is shown, not when focussed (and obviously not when in default state)
      className={`border nav-btn ${isClicked ? 'clicked' : ''} ${moveOffscreen ? 'offscreen' : ''}`}
      onClick={() => onNavButtonClicked(navState, setNavState)}
    >
      <i className={`material-symbols-outlined nav-btn-icon prevent-select ${isClicked}`}>
        {navBtnIcons.at(navState)}
      </i>
    </button>
  );
}

let eventListenersAdded = false;
function addEventListeners(navState, setNavState, setMoveOffscreen) {
  if (eventListenersAdded) return;
  eventListenersAdded = true;

  document.addEventListener(EVENTS.PLANET_FOCUSSED, () => {
    setNavState(NAV_BTN_STATES.Focussed);
  });

  document.addEventListener(EVENTS.SET_NAV_BTN_DEFAULT, () => {
    setNavState(NAV_BTN_STATES.Default);
  });

  document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => {
    setNavState(NAV_BTN_STATES.Default);
  });

  document.addEventListener(EVENTS.INTRO_COMPLETE, () => {
    setMoveOffscreen(false);
  });
}

function onNavButtonClicked(navState, setNavState) {
  switch (navState) {
    case NAV_BTN_STATES.Default:
      setNavState(NAV_BTN_STATES.Sidebar);
      document.dispatchEvent(new Event(EVENTS.SIDEBAR_OPENED));
      break;
    case NAV_BTN_STATES.Focussed:
      setNavState(NAV_BTN_STATES.Default);
      stopFollowing();
      break;
  }
}

export function addNavBtn() {
  const sidebarContainer = document.getElementsByClassName('nav-btn-container')[0];
  createRoot(sidebarContainer).render(<NavBtn />);
}
