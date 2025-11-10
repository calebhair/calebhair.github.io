// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import { EVENTS } from '../../constants';
import { Title } from './title';
import { ProjectDescription } from './projectDescription';
import { ScrollArrow } from './scrollArrow';

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
    this.scrollSystem.addListener((change) => {
      this.scroll += change;
      document.querySelector('.scrollable').style.marginTop = `${this.scroll}vh`;
    });
  }

  scrollCondition(event) {
    const clientY = (event?.changedTouches?.[0].clientY || event.clientY);
    console.warn(this.scrollableRef.current);
    return clientY < 300;
  }

  render() {
    return (
      <div>
        <div className="spacer"></div>

        <div className="scrollable" ref={this.scrollableRef}>
          <Title />
          <ScrollArrow visible={this.state.visible} />
          <ProjectDescription visible={this.state.visible} />
        </div>
      </div>
    );
  }
}
