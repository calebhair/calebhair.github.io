// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import { EVENTS, SCROLL_METHOD } from '../../constants';
import { Title } from './title';
import { ProjectDescription } from './projectDescription';
import { ScrollArrow } from './scrollArrow';
import { ImageContainer } from './imageContainer';

const MARGIN_PX = 0;
const START_SCROLL_PX = MARGIN_PX;

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
      this.resetScroll();
    });
    document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => {
      this.setState({ visible: false });
      this.resetScroll();
    });
    document.addEventListener(EVENTS.PLANET_CHANGED, () => {
      this.resetScroll();
    });

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

  render() {
    const imgs = [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRB4ywOLz1dsou2BDYl27hn5ymk1V8f6bpA&s' },
      { url: 'https://hips.hearstapps.com/hmg-prod/images/white-cat-breeds-kitten-in-grass-67bf648a54a3b.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=1200:*' },
    ];
    return (
      <div ref={this.scrollableRef} className="scrollable-region">
        <div className="spacer"></div>
        <Title scrollSystem={this.scrollSystem} />
        <ScrollArrow visible={this.state.visible} scrollSystem={this.scrollSystem} />
        <ProjectDescription visible={this.state.visible} scrollSystem={this.scrollSystem} />
        <ImageContainer images={imgs} visible={this.state.visible} scrollSystem={this.scrollSystem} />
      </div>
    );
  }
}
