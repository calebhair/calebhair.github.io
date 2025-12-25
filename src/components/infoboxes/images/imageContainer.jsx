// eslint-disable-next-line no-unused-vars
import React from 'react';
import { ProjectImage } from './projectImage';
import { ScrollableElement } from '../../scrollSystem/scrollableElement';
import { ScrollSystemListener } from '../../scrollSystem/scrollSystemListener';
import { ANIMATION_TIMES, EVENTS } from '../../../constants';

// TODO documentation
export class ImageContainer extends ScrollableElement {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: null, lastSelected: null, opacity: 1 };
    document.addEventListener('mousedown', event => this.unfocusImages(event));
    document.addEventListener('touchstart', event => this.unfocusImages(event));
    document.addEventListener(EVENTS.PLANET_CHANGED, () => {
      this.setState({ opacity: 0 });
      setTimeout(() => this.setState({ opacity: 1 }), ANIMATION_TIMES.PLANET_CHANGE_FADE_TIME + 50);
    });
  }

  getImages() {
    // TODO optimise
    return this.props.images?.map((image, index) => (
      <ProjectImage
        key={index}
        imageUrl={image.url}
        altText={image.altText}
        visible={this.props.visible}
        index={index}
        focused={this.state.selectedIndex === index}
        onClick={index => this.onImageClicked(index)}
        style={{ zIndex: this.getZIndex(index) }}
      >
      </ProjectImage>
    ));
  }

  unfocusImages(event) {
    // If the clicked element is an image, do not unfocus
    const clickedImageId = event.target.getAttribute('data-index');
    if (clickedImageId !== null) return;
    this.setState({ selectedIndex: null, lastSelected: this.state.selectedIndex });
  }

  calculateLowestChildBottom() {
    const { children } = this.scrollableRef.current;
    const lastChildBottom = children[children.length - 1]?.getBoundingClientRect().bottom;
    const secondLastChildBottom = children[children.length - 2]?.getBoundingClientRect().bottom;
    return Math.max(lastChildBottom, secondLastChildBottom);
  }

  get scrollableBottom() {
    return this.calculateLowestChildBottom();
  }

  get scrollLowerLimit() {
    const distanceFromBottom = window.innerHeight - this.calculateLowestChildBottom();
    return this.scroll + distanceFromBottom;
  }

  onImageClicked(index) {
    const selectedIndex = index === this.state.selectedIndex ? null : index;
    this.setState({ selectedIndex, lastSelected: this.state.selectedIndex });
  }

  getZIndex(index) {
    if (this.state.selectedIndex === index) return 320;
    if (this.state.lastSelected === index) return 310;
    return null;
  }

  get shouldUseMobileScrollSystem() {
    return window.innerWidth > 600;
  }

  componentDidUpdate() {
    document.dispatchEvent(new Event(EVENTS.UPDATE_BORDERS));
  }

  render() {
    const scrollSystem = this.shouldUseMobileScrollSystem ? this.scrollSystem : this.props.mobileScrollSystem;
    return (
      <ScrollSystemListener
        internalRef={this.scrollableRef}
        className={`image-container ${this.props.visible ? 'show-infobox' : ''}`}
        scrollSystem={scrollSystem}
        style={{ opacity: this.state.opacity }}
      >
        {this.getImages()}
      </ScrollSystemListener>
    );
  }
}
