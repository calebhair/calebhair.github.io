import React from 'react';
import { MOUSE_BTNS, TUTORIAL_STATE, EVENTS, COOKIES } from '../../constants';

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

const COMPLETE_STATE = TUTORIAL_STATE.PAN_COMPLETE;

export class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: TUTORIAL_STATE.UNSTARTED,
      hide: true,
    };

    if (document.cookie.includes('tutorial_complete=true')) {
      this.state.prototype = COMPLETE_STATE;
      return;
    }

    document.addEventListener(EVENTS.INTRO_COMPLETE, () => {
      progressEvents.forEach((...args) => this.setupProgressEvent(...args));
      this.setState({ hide: false });
    });
    document.addEventListener('touchstart', () => this.touchDown = true);
    document.addEventListener('touchend', () => this.touchDown = false);
  }

  /**
   * Creates an event listener that attempts to progress the tutorial if a condition is met.
   * @param eventName {string} the name of an event to trigger progression
   * @param tutorialState {TUTORIAL_STATE} the state the progress should try to move to
   * @param progressCondition {Function} a function that takes in an event and returns true if the progress should be moved forward
   */
  setupProgressEvent({ eventName, tutorialState, progressCondition }) {
    const callback = (event) => {
      if (progressCondition(event) && this.updateProgress(tutorialState)) {
        document.removeEventListener(eventName, callback);
      }
    };
    document.addEventListener(eventName, callback);
  }

  /**
   * Sets the progress to the value if it is the next step.
   * @param tutorialState {TUTORIAL_STATE} the state of the tutorial to progress to.
   * @return {boolean} true if the event listener that triggered it should be removed.
   */
  updateProgress(tutorialState) {
    // If the new tutorial state is one step after the current
    if (tutorialState - 1 === this.state.progress) {
      // If touch is down, wait until it is no longer down, via timeout and recursion
      if (this.touchDown) {
        setTimeout(() => this.updateProgress(tutorialState), 500);
      }
      else {
        this.setState({ progress: tutorialState });
        if (tutorialState === COMPLETE_STATE) this.onComplete();
      }
    }
    return tutorialState <= this.state.progress;
  }

  onComplete() {
    // document.cookie = `${COOKIES.TUTORIAL_COMPLETE}=true`;
  }

  render() {
    const animation = progressAnimations[this.state.progress];
    const hide = this.state.hide || this.state.progress === COMPLETE_STATE;
    return (
      <div className={`tutorial ${hide ? 'hide-tutorial' : ''}`}>
        <div className="reference-environment">
          <div className="static-floor"></div>
          <div className={`reference-object ${animation}-animation`}></div>
        </div>
        <div className="tutorial-peripheral-icon-container">
          <div className={`tutorial-peripheral-icon mouse-icon ${animation}-animation`}></div>
          <div className={`tutorial-peripheral-icon touch-icon ${animation}-animation`}></div>
        </div>
      </div>
    );
  }
}
