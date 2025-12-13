import React from 'react';
import {
  focusOnObjectIfValid, followTarget,
} from '../../3d/focus';
import { Planet } from '../../3d/planet';
import { moveToOverviewPos, animating } from '../../3d/cameraAnimation';
import { EVENTS, PATHS } from '../../constants';
import { SidebarEntry } from './sidebarEntry';

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.addEventListeners();
    this.planetEntries = this.makePlanetEntries(props.planetJsonsToShow);
  }

  addEventListeners() {
    document.addEventListener(EVENTS.SIDEBAR_OPENED, () => {
      this.setState({ visible: true });
    });

    document.addEventListener(EVENTS.SIDEBAR_CLOSED, () => {
      this.setState({ visible: false });
    });

    // Clicking away from the sidebar closes it
    document.querySelector('#threejs-canvas')
      .addEventListener('click', () => {
        this.setState({ visible: false });

        // Only set the nav btn state if a planet wasn't clicked; delay a little until followTarget would be set
        setTimeout(() => {
          if (!followTarget) document.dispatchEvent(new Event(EVENTS.SET_NAV_BTN_DEFAULT));
        }, 100);
      });
  }

  onCloseBtnClicked() {
    this.setState({ visible: false });
    document.dispatchEvent(new Event(EVENTS.SET_NAV_BTN_DEFAULT));
  }

  onOverviewClick() {
    moveToOverviewPos();
    this.setState({ visible: false });
    document.dispatchEvent(new Event(EVENTS.SET_NAV_BTN_DEFAULT));
  };

  makePlanetEntries(planetJsons, setVisible) {
    return planetJsons.map((planetJson, planetIndex) => (
      <SidebarEntry
        text={planetJson.name}
        onClick={() => {
          if (animating) return;
          focusOnObjectIfValid(Planet.planets[planetIndex].model);
          setVisible(false);
        }}
        classes="planet-entry"
        imageUrl={planetJson.iconPath}
        key={planetIndex}
      />
    ));
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div className={`sidebar prevent-select ${this.state.visible ? 'show-sidebar' : ''}`}>
          {/* Back button and re-centre */}
          <SidebarEntry
            imageUrl={window.innerWidth < 600 ? PATHS.UP_ARROW : PATHS.BACK_ARROW}
            onClick={() => this.onCloseBtnClicked()}
          />
          <SidebarEntry text="Re-centre" imageUrl={PATHS.QUASAR_ICON} onClick={() => this.onOverviewClick()} classes="overview-entry" />
          {this.planetEntries}
        </div>
      </div>
    );
  }
}
