// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import { EVENTS, SCROLL_METHOD } from '../../constants';
import { Title } from './title';
import { ProjectDescription } from './projectDescription';
import { ScrollArrow } from './scrollArrow';

function vhToPx(vh) {
  return vh * window.innerHeight / 100;
}

function pxToVh(px) {
  return px * 100 / window.innerHeight;
}

const marginPx = 20;

export class Infoboxes extends React.Component {
  constructor(props) {
    super(props);
    this.scrollSystem = props.scrollSystem;
    this.scrollableRef = React.createRef();
    this.state = {
      visible: false,
    };
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener(EVENTS.PLANET_FOCUSSED, () => {
      this.setState({ visible: true });
      this.scroll = 0;
    });
    document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => {
      this.setState({ visible: false });
      this.scroll = 0;
    });
    document.addEventListener(EVENTS.PLANET_CHANGED, (event) => {
      this.scroll = 0;
    });

    this.scroll = 0;
    this.scrollSystem.setOnScroll(this.customOnScroll.bind(this));
  }

  customOnScroll(change, scrollMethod) {
    const scrollable = this.scrollableRef.current;
    if (window.innerHeight > scrollable.clientHeight) return;

    this.scroll += scrollMethod === SCROLL_METHOD.TOUCH ? change : -change;
    const scrollableBottom = scrollable.clientHeight + vhToPx(this.scroll);

    if (scrollableBottom < window.innerHeight - marginPx) {
      this.scroll = pxToVh(window.innerHeight - scrollable.clientHeight - marginPx);
    }
    else if (this.scroll > 0) {
      this.scroll = 0;
    }
  }

  set scroll(scrollVh) {
    this._scroll = scrollVh;
    if (this.scrollableRef.current) this.scrollableRef.current.style.marginTop = `${this._scroll}vh`;
  }

  get scroll() {
    return this._scroll;
  }

  render() {
    return (
      <div ref={this.scrollableRef} className="scrollable-region">
        <div className="spacer"></div>
        <Title scrollSystem={this.scrollSystem} />
        <ScrollArrow visible={this.state.visible} scrollSystem={this.scrollSystem} />
        <ProjectDescription visible={this.state.visible} scrollSystem={this.scrollSystem} />
      </div>
    );
  }
}
