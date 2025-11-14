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
    });
    document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => {
      this.setState({ visible: false });
    });

    this.scroll = 0;
    this.scrollSystem.setScrollConditionFn(e => this.scrollCondition(e));
    this.scrollSystem.onScroll(this.onScroll.bind(this));
  }

  onScroll(change, scrollMethod) {
    const scrollable = this.scrollableRef.current;
    this.scroll += scrollMethod === SCROLL_METHOD.TOUCH ? change : -change;
    const scrollableBottom = scrollable.clientHeight + vhToPx(this.scroll);

    if (scrollableBottom < window.innerHeight - marginPx) {
      this.scroll = pxToVh(window.innerHeight - scrollable.clientHeight - marginPx);
    }
    else if (this.scroll > 0) {
      this.scroll = 0;
    }

    scrollable.style.marginTop = `${this.scroll}vh`;
  }

  scrollCondition(event) {
    const clientY = (event?.changedTouches?.[0].clientY || event.clientY);
    return clientY < 300;
  }

  render() {
    return (
      <div>
        <div ref={this.scrollableRef}>
          <div className="spacer"></div>
          <Title />
          <ScrollArrow visible={this.state.visible} />
          <ProjectDescription visible={this.state.visible} />
        </div>
      </div>
    );
  }
}
