import React from 'react';
import { MOUSE_BTNS, TUTORIAL_STATE } from '../../constants';

const progressEvents = [
  {
    eventName: 'mousedown',
    tutorialState: TUTORIAL_STATE.ROTATION_COMPLETE,
    progressCondition: event => event.button === MOUSE_BTNS.LEFT,
  },
  {
    eventName: 'touchstart',
    tutorialState: TUTORIAL_STATE.ROTATION_COMPLETE,
    progressCondition: event => event.touches.length === 1,
  },
  {
    eventName: 'wheel',
    tutorialState: TUTORIAL_STATE.ZOOM_COMPLETE,
    progressCondition: () => true,
  },
  {
    eventName: 'touchstart',
    tutorialState: TUTORIAL_STATE.ZOOM_COMPLETE,
    progressCondition: event => event.touches.length === 2,
  },
  {
    eventName: 'mousedown',
    tutorialState: TUTORIAL_STATE.PAN_COMPLETE,
    progressCondition: event => event.button === MOUSE_BTNS.RIGHT,
  },
  {
    eventName: 'touchstart',
    tutorialState: TUTORIAL_STATE.PAN_COMPLETE,
    progressCondition: event => event.touches.length === 2,
  },
];

const progressAnimations = {
  [TUTORIAL_STATE.UNSTARTED]: 'rotate',
  [TUTORIAL_STATE.ROTATION_COMPLETE]: 'zoom',
  [TUTORIAL_STATE.ZOOM_COMPLETE]: 'pan',
  [TUTORIAL_STATE.PAN_COMPLETE]: 'hide',
};

export class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: TUTORIAL_STATE.UNSTARTED };
    progressEvents.forEach((...args) => this.setupProgressEvent(...args));
  }

  setupProgressEvent({ eventName, tutorialState, progressCondition }) {
    const callback = (event) => {
      if (progressCondition(event) && this.updateProgress(tutorialState)) {
        document.removeEventListener(eventName, callback);
      }
    };
    document.addEventListener(eventName, callback);
  }

  updateProgress(tutorialState) {
    // If the new tutorial state is one step after the current
    if (tutorialState - 1 === this.state.progress) {
      this.setState({ progress: tutorialState });
      return true;
    }
    return false;
  }

  render() {
    const animation = progressAnimations[this.state.progress];
    const hide = this.state.progress === TUTORIAL_STATE.PAN_COMPLETE;
    return (
      <div className={`${hide ? 'hide-tutorial' : ''}`}>
        <div className="static-floor"></div>
        <div className={`reference-object ${animation}-animation`}></div>
        <div className={`tutorial-icon mouse-icon ${animation}-animation`}></div>
        <div className={`tutorial-icon touch-icon ${animation}-animation`}></div>
      </div>
    );
  }
}
