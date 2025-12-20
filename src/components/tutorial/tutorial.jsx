import React from 'react';
import { MOUSE_BTNS, TUTORIAL_STATE, EVENTS } from '../../constants';

const PROGRESS_INDICATOR_TIME = 1000; // ms to show green progress indicator
const PROGRESS_HIDDEN_TIME = 500; // ms to hide tutorial before showing next tutorial step

const progressEvents = [
  {
    eventName: 'mouseup',
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
    eventName: 'mouseup',
    tutorialState: TUTORIAL_STATE.PAN_COMPLETE,
    progressCondition: event => event.button === MOUSE_BTNS.RIGHT,
  },
  {
    eventName: 'touchstart',
    tutorialState: TUTORIAL_STATE.PAN_COMPLETE,
    progressCondition: event => event.touches.length === 2,
  },
];

// This maps tutorial states to the corresponding animation class names
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
      indicateProgressMade: false,
      hidden: true,
      planetFocussed: false,
    };
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener(EVENTS.INTRO_COMPLETE, () => {
      progressEvents.forEach((...args) => this.setupProgressEvent(...args));
      this.setState({ hidden: false });
    });

    document.addEventListener('touchstart', () => this.touchDown = true);
    document.addEventListener('touchend', () => this.touchDown = false);

    document.addEventListener(EVENTS.PLANET_FOCUSSED, () => {
      this.setState({ planetFocussed: true });
    });
    document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => {
      this.setState({ planetFocussed: false });
    });
  }

  /**
   * Creates an event listener that attempts to progress the tutorial if a condition is met.
   * @param eventName {string} the name of an event to trigger progression
   * @param tutorialState {TUTORIAL_STATE} the state the progress should try to move to
   * @param progressCondition {Function} a function that takes in an event and returns true if the progress should be moved forward
   */
  setupProgressEvent({ eventName, tutorialState, progressCondition }) {
    const callback = (event) => {
      if (progressCondition(event) && this.tryUpdateProgress(tutorialState)) {
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
  tryUpdateProgress(tutorialState) {
    // If touch is down, wait until it is no longer down, via timeout and recursion.
    // This prevents accidentally skipping tutorial steps.
    if (this.touchDown) {
      setTimeout(() => this.tryUpdateProgress(tutorialState), 500);
      return false;
    }

    // If the new tutorial state is one step after the current
    if (tutorialState - 1 === this.state.progress) this.onProgress(tutorialState);
    return tutorialState <= this.state.progress;
  }

  onProgress(tutorialState) {
    this.setState({ indicateProgressMade: true });

    // Triggers hiding tutorial
    setTimeout(() => {
      this.setState({ hidden: true });
    }, PROGRESS_INDICATOR_TIME);

    // Triggers showing next tutorial step
    setTimeout(() => {
      this.setState({ progress: tutorialState, indicateProgressMade: false, hidden: false });
      if (tutorialState === COMPLETE_STATE) this.onComplete();
    }, PROGRESS_INDICATOR_TIME + PROGRESS_HIDDEN_TIME);
  }

  onComplete() {
    // document.cookie = `${COOKIES.TUTORIAL_COMPLETE}=true`;
  }

  render() {
    const { progress, indicateProgressMade, hidden, planetFocussed } = this.state;
    const animation = progressAnimations[progress];
    const hide = hidden || planetFocussed || progress === COMPLETE_STATE;
    const progressClass = indicateProgressMade ? 'progress-made' : '';
    return (
      <div className={`tutorial ${hide ? 'hide-tutorial' : ''}`}>
        <div className="reference-environment">
          <div className="static-floor"></div>
          <div className={`reference-object ${animation}-animation ${progressClass}`}></div>
        </div>
        <div className="tutorial-peripheral-icon-container">
          <div className={`tutorial-peripheral-icon mouse-icon ${animation}-animation ${progressClass}`}></div>
          <div className={`tutorial-peripheral-icon touch-icon ${animation}-animation ${progressClass}`}></div>
        </div>
      </div>
    );
  }
}
