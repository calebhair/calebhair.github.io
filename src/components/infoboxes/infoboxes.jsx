// eslint-disable-next-line no-unused-vars
import React from 'react';
import { EVENTS } from '../../constants';
import { Title } from './title';
import { ProjectDescription } from './projectDescription';
import { ScrollArrow } from './scrollArrow';
import { ImageContainer } from './images/imageContainer';
import { ScrollableElement } from '../scrollSystem/scrollableElement';

export class Infoboxes extends ScrollableElement {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.images = [];
    this.tags = [];
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener(EVENTS.PLANET_FOCUSSED, (event) => {
      this.setState({ visible: true });
      this.onPlanetUpdate(event);
    });
    document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => {
      this.setState({ visible: false });
    });
    document.addEventListener(EVENTS.PLANET_CHANGED, (event) => {
      this.onPlanetUpdate(event);
      this.forceUpdate();
    });
  }

  onPlanetUpdate(event) {
    this.images = event.detail.images;
    this.tags = event.detail.tags;
  }

  render() {
    return (
      <div ref={this.scrollableRef} className="scrollable-region">
        <div className={`mobile-fade ${this.state.visible ? 'show' : ''}`}></div>
        <div className="spacer"></div>
        <Title scrollSystem={this.scrollSystem} />
        <ScrollArrow visible={this.state.visible} scrollSystem={this.scrollSystem} />
        <ProjectDescription visible={this.state.visible} scrollSystem={this.scrollSystem} tags={this.tags} />
        <ImageContainer images={this.images} visible={this.state.visible} mobileScrollSystem={this.scrollSystem} bottomMarginPx={20} />
      </div>
    );
  }
}
