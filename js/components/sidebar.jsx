// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  focusOnObjectIfValid,
} from '../3d/focus';
import { Planet } from '../3d/planet';
import { planetDefinitions } from '../loadPlanets';
import { moveToOverviewPos, animating } from '../3d/cameraAnimation';
import { EVENTS } from '../constants';

/**
 * Sidebar component
 * @param planetJsonsToShow the list of planet JSON data
 * @return {JSX.Element}
 */
function Sidebar({ planetJsonsToShow }) {
  const [visible, setVisible] = useState(false);
  addEventListeners(setVisible);

  // Create planet entries from JSON
  const planetEntries = planetJsonsToShow.map((planetJson, index) => (
    <SidebarEntry
      text={planetJson.name}
      onClick={() => {
        if (!animating) {
          focusOnObjectIfValid(Planet.planets[index].model);
          setVisible(false);
        }
      }}
      imageUrl={planetJson.iconPath}
      key={index}
    />
  ));

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

/**
 * Entry component in the sidebar
 * @param text the text to show on the sidebar
 * @param onClick the function to call when the entry is clicked
 * @param imageUrl the icon to show for this element.
 * @return {JSX.Element}
 */
function SidebarEntry({ text, onClick, imageUrl = 'img/quasar_particle.png' }) {
  return (
    <div className="sidebar-item" onClick={onClick}>
      <img src={imageUrl} alt="" className="sidebar-item-image" />
      <h2 className="sidebar-item-text">{text}</h2>
    </div>
  );
}

/**
 * Adds the sidebar to the HTML document.
 */
export function addSidebar() {
  const sidebarNode = document.getElementsByClassName('sidebar-container')[0];
  createRoot(sidebarNode).render(<Sidebar planetJsonsToShow={planetDefinitions} />);
}
