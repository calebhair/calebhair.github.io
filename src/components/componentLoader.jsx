// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createRoot } from 'react-dom/client';
import { NavBtn } from './navBtn/navBtn';
import { Sidebar } from './sidebar/sidebar';
import { LoadingScreen } from './loading/loadingScreen';
import { planetDefinitions } from '../planets';
import { Infoboxes } from './infoboxes/infoboxes';

export function setupComponents() {
  const sidebarContainer = createRoot(document.getElementsByClassName('sidebar-container')[0]);
  const navBtnContainer = createRoot(document.getElementsByClassName('nav-btn-container')[0]);
  const loadingScreenContainer = createRoot(document.getElementsByClassName('loading-screen-container')[0]);
  const projectInfoContainer = createRoot(document.getElementsByClassName('project-info-container')[0]);

  loadingScreenContainer.render(<LoadingScreen />); // must show first
  navBtnContainer.render(<NavBtn />);
  sidebarContainer.render(<Sidebar planetJsonsToShow={planetDefinitions} />);
  projectInfoContainer.render(<Infoboxes />);
}
