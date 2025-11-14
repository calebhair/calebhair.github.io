import { SCROLL_METHOD } from './constants';

/**
Custom scrolling that operates on custom conditions instead of element based.
Always ensure there's only one touch.
On touch start, check that touch matches some condition, by evaluating a passed function.
On touch move, if touch started in valid area, calculate change.
On touch end, reset state to prevent jumps in scroll between touch.
 */
export class ConditionalScrollSystem {
  constructor(targetElements = [], scrollConditionFn = () => true) {
    this.targetElements = targetElements;
    this.scrollConditionFn = scrollConditionFn;
    this.touchStartedValid = false;
    this.lastTouchY = null;
    this.lastWheelY = null;
    this.onScrollCallbacks = [];

    // Bind event handlers
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onWheel = this.onWheel.bind(this);
    // Add event listeners
    this.targetElements.forEach(targetElement => this.listenOn(targetElement));
  }

  listenOn(targetElement) {
    this.targetElements.push(targetElement);
    targetElement.addEventListener('touchstart', this.onTouchStart, { passive: true });
    targetElement.addEventListener('touchmove', this.onTouchMove, { passive: true });
    targetElement.addEventListener('touchend', this.onTouchEnd, { passive: true });
    targetElement.addEventListener('wheel', this.onWheel, { passive: true });
  }

  setScrollConditionFn(fn) {
    this.scrollConditionFn = fn;
  }

  /**
   * Add a listener to be called on scroll updates.
   * @param callback on a scroll update (such as a touch move or wheel scroll), calls this function with the vertical change value.
   */
  onScroll(callback) {
    this.onScrollCallbacks.push(callback);
  }

  onTouchStart(event) {
    if (isMultiTouch(event)) return;
    this.touchStartedValid = this.scrollConditionFn(event);
  }

  onTouchMove(event) {
    if (!this.touchStartedValid || isMultiTouch(event)) return;

    const touch = event.changedTouches[0];
    const touchChangeY = this.lastTouchY === null ? 0 : touch.clientY - this.lastTouchY;
    this.lastTouchY = touch.clientY;

    this.onScrollCallbacks.forEach((callback) => {
      callback(touchChangeY, SCROLL_METHOD.TOUCH);
    });
  }

  onTouchEnd() {
    this.lastTouchY = null;
    this.touchStartedValid = false;
  }

  onWheel(event) {
    if (!this.scrollConditionFn(event)) return;

    const weightedDeltaY = event.deltaY * 0.1;
    const wheelChangeY = this.lastWheelY === null ? 0 : weightedDeltaY;
    this.lastWheelY = weightedDeltaY;

    this.onScrollCallbacks.forEach((callback) => {
      callback(wheelChangeY, SCROLL_METHOD.WHEEL);
    });
  }
}

function isMultiTouch(event) {
  return event.touches.length !== 1;
}
