// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createRoot } from 'react-dom/client';
import { NavBtn } from './navBtn/navBtn';
import { Sidebar } from './sidebar/sidebar';
import { planetDefinitions } from '../planets';
import { Infoboxes } from './infoboxes/infoboxes';
import { Tutorial } from './tutorial/tutorial';

export function setupComponents(scrollSystem) {
  const sidebarContainer = createRoot(document.querySelector('.sidebar-container'));
  const navBtnContainer = createRoot(document.querySelector('.nav-btn-container'));
  const projectInfoContainer = createRoot(document.querySelector('.project-info-container'));
  const tutorialContainer = createRoot(document.querySelector('.tutorial-container'));

  navBtnContainer.render(<NavBtn />);
  sidebarContainer.render(<Sidebar planetJsonsToShow={planetDefinitions} />);
  projectInfoContainer.render(<Infoboxes scrollSystem={scrollSystem} />);
  tutorialContainer.render(<Tutorial />);
}
