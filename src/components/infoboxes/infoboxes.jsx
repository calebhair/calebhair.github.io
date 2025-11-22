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
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener(EVENTS.PLANET_FOCUSSED, (event) => {
      this.setState({ visible: true });
      this.getImagesFromEvent(event);
    });
    document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => {
      this.setState({ visible: false });
    });
    document.addEventListener(EVENTS.PLANET_CHANGED, (event) => {
      this.getImagesFromEvent(event);
      this.forceUpdate();
    });
  }

  getImagesFromEvent(event) {
    this.images = event.detail.images;
  }

  render() {
    return (
      <div ref={this.scrollableRef} className="scrollable-region">
        <div className="spacer"></div>
        <Title scrollSystem={this.scrollSystem} />
        <ScrollArrow visible={this.state.visible} scrollSystem={this.scrollSystem} />
        <ProjectDescription visible={this.state.visible} scrollSystem={this.scrollSystem} />
        <ImageContainer images={this.images} visible={this.state.visible} mobileScrollSystem={this.scrollSystem} bottomMarginPx={20} />
      </div>
    );
  }
}
