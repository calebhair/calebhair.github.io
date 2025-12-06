import React from 'react';
import { stopFollowing } from '../../3d/focus';
import { EVENTS, NAV_BTN_STATES } from '../../constants';

// The icons to show for each state, where the ID of the state represents the index of the icon name from Google icons
const navBtnIcons = {
  [NAV_BTN_STATES.Default]: 'menu',
  [NAV_BTN_STATES.Sidebar]: 'menu',
  [NAV_BTN_STATES.Focussed]: 'chevron_left',
};

export class NavBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navState: NAV_BTN_STATES.Default,
      moveOffscreen: true,
    };
    this.addEventListeners();
  }

  updateState(newState) {
    this.setState({ ...this.state, ...newState });
  }

  setNavState(newNavState) {
    this.updateState({ navState: newNavState });
  }

  addEventListeners() {
    document.addEventListener(EVENTS.PLANET_FOCUSSED, () => {
      this.setNavState(NAV_BTN_STATES.Focussed);
    });

    document.addEventListener(EVENTS.SET_NAV_BTN_DEFAULT, () => {
      this.setNavState(NAV_BTN_STATES.Default);
    });

    document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => {
      this.setNavState(NAV_BTN_STATES.Default);
    });

    document.addEventListener(EVENTS.INTRO_COMPLETE, () => {
      this.updateState({ moveOffscreen: false });
    });
  }

  onNavButtonClicked() {
    switch (this.state.navState) {
      case NAV_BTN_STATES.Default:
        this.setNavState(NAV_BTN_STATES.Sidebar);
        document.dispatchEvent(new Event(EVENTS.SIDEBAR_OPENED));
        break;
      case NAV_BTN_STATES.Focussed:
        this.setNavState(NAV_BTN_STATES.Default);
        stopFollowing();
        break;
    }
  }

  componentDidMount() {
    document.dispatchEvent(new Event(EVENTS.UPDATE_BORDERS));
  }

  render() {
    const isClicked = this.state.navState === NAV_BTN_STATES.Sidebar;
    return (
      <button
        // Only show the clicked style if the sidebar is shown, not when focussed (and obviously not when in default state)
        className={`border nav-btn ${isClicked ? 'clicked' : ''} ${this.state.moveOffscreen ? 'offscreen' : ''}`}
        onClick={() => this.onNavButtonClicked()}
      >
        <i className={`material-symbols-outlined nav-btn-icon prevent-select ${isClicked}`}>
          {navBtnIcons[this.state.navState]}
        </i>
      </button>
    );
  }
}
