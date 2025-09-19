// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  focusOnObjectIfValid,
} from '../3d/focus';
import { Planet } from '../3d/planet';
import { planetDefinitions } from '../planets';
import { moveToOverviewPos, animating } from '../3d/cameraAnimation';
import { EVENTS } from '../constants';
import { SidebarEntry } from './sidebarEntry';

/**
 * Sidebar component
 * @param planetJsonsToShow the list of planet JSON data
 * @return {JSX.Element}
 */
function Sidebar({ planetJsonsToShow }) {
  const [visible, setVisible] = useState(false);
  addEventListeners(setVisible);

  const planetEntries = makePlanetEntries(planetJsonsToShow, setVisible);

  const onCloseBtnClicked = () => {
    setVisible(false);
    document.dispatchEvent(new Event(EVENTS.SET_NAV_BTN_DEFAULT));
  };

  const onOverviewClick = () => {
    moveToOverviewPos();
    setVisible(false);
    document.dispatchEvent(new Event(EVENTS.SET_NAV_BTN_DEFAULT));
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className={`sidebar prevent-select ${visible ? 'show-sidebar' : ''}`}>
        {/* Back button and re-centre */}
        <SidebarEntry
          imageUrl={window.innerWidth < 600 ? 'img/up.svg' : 'img/back.svg'}
          onClick={onCloseBtnClicked}
        />
        <SidebarEntry text="Re-centre" imageUrl="img/quasar.svg" onClick={onOverviewClick} />
        {planetEntries}
      </div>
    </div>
  );
}

let eventListenersAdded = false;
function addEventListeners(setVisible) {
  if (eventListenersAdded) return;
  eventListenersAdded = true;

  document.addEventListener(EVENTS.SIDEBAR_OPENED, () => {
    setVisible(true);
  });
  document.addEventListener(EVENTS.SIDEBAR_CLOSED, () => {
    setVisible(false);
  });
}

function makePlanetEntries(planetJsons, setVisible) {
  return planetJsons.map((planetJson, planetIndex) => (
    <SidebarEntry
      text={planetJson.name}
      onClick={() => {
        if (animating) return;
        focusOnObjectIfValid(Planet.planets[planetIndex].model);
        setVisible(false);
      }}
      imageUrl={planetJson.iconPath}
      key={planetIndex}
    />
  ));
}

/**
 * Adds the sidebar to the HTML document.
 */
export function addSidebar() {
  const sidebarNode = document.getElementsByClassName('sidebar-container')[0];
  createRoot(sidebarNode).render(<Sidebar planetJsonsToShow={planetDefinitions} />);
}
