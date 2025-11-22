import React from 'react';
import { EVENTS, SCROLL_METHOD } from '../../constants';
import { ConditionalScrollSystem } from './conditionalScrollSystem';

const MARGIN_PX = 0;
const START_SCROLL_PX = MARGIN_PX;

/**
 * A React component that provides scroll functionality to a component that extends it.
 */
export class ScrollableElement extends React.Component {
  constructor(props) {
    super(props);
    this.scrollSystem = props.scrollSystem || new ConditionalScrollSystem();
    this.scrollableRef = React.createRef();

    document.addEventListener(EVENTS.PLANET_FOCUSSED, () => this.resetScroll());
    document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => this.resetScroll());
    document.addEventListener(EVENTS.PLANET_CHANGED, () => this.resetScroll());
    this.resetScroll();
    this.scrollSystem.setOnScroll(this.customOnScroll.bind(this));
  }

  customOnScroll(change, scrollMethod) {
    const scrollable = this.scrollableRef.current;
    if (window.innerHeight > scrollable.clientHeight) return;

    this.scroll += scrollMethod === SCROLL_METHOD.TOUCH ? change : -change;
    const scrollableBottom = scrollable.clientHeight + this.scroll;

    if (scrollableBottom < window.innerHeight - MARGIN_PX) {
      this.scroll = window.innerHeight - scrollable.clientHeight - MARGIN_PX;
    }
    else if (this.scroll > 0) {
      this.resetScroll();
    }
  }

  resetScroll() {
    this.scroll = START_SCROLL_PX;
  }

  set scroll(scrollPx) {
    this._scroll = scrollPx;
    if (this.scrollableRef.current) this.scrollableRef.current.style.marginTop = `${this._scroll}px`;
  }

  get scroll() {
    return this._scroll;
  }
}
