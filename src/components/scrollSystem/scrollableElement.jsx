import React from 'react';
import { EVENTS, SCROLL_METHOD } from '../../constants';
import { ConditionalScrollSystem } from './conditionalScrollSystem';

/**
 * A React component that provides scroll functionality to a component that extends it.
 */
export class ScrollableElement extends React.Component {
  constructor(props) {
    super(props);
    this.bottomMarginPx = props.bottomMarginPx || 0;
    this.startScrollPx = props.startScrollPx || this.bottomMarginPx;
    this.scrollSystem = props.scrollSystem || new ConditionalScrollSystem();
    this.scrollableRef = React.createRef();

    document.addEventListener(EVENTS.PLANET_FOCUSSED, () => this.resetScroll());
    document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => this.resetScroll());
    document.addEventListener(EVENTS.PLANET_CHANGED, () => this.resetScroll());
    window.addEventListener('resize', () => this.resetScroll());
    this.resetScroll();
    this.scrollSystem.setOnScroll(this.customOnScroll.bind(this));
  }

  customOnScroll(change, scrollMethod) {
    const scrollable = this.scrollableRef.current;
    if (window.innerHeight > scrollable.clientHeight) return;

    this.scroll += scrollMethod === SCROLL_METHOD.TOUCH ? change : -change;
    if (this.scrollableBottom < window.innerHeight - this.bottomMarginPx) {
      this.scroll = this.scrollLowerLimit - this.bottomMarginPx;
    }
    else if (this.scroll > 0) {
      this.resetScroll();
    }
  }

  get scrollableBottom() {
    return this.scrollableRef.current.clientHeight + this.scroll;
  }

  get scrollLowerLimit() {
    return window.innerHeight - this.scrollableRef.current.clientHeight;
  }

  resetScroll() {
    this.scroll = this.startScrollPx;
  }

  set scroll(scrollPx) {
    this._scroll = scrollPx;
    if (this.scrollableRef.current) this.scrollableRef.current.style.marginTop = `${this._scroll}px`;
  }

  get scroll() {
    return this._scroll;
  }
}
