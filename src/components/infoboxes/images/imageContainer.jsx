import React from 'react';
import { ScrollSystemListener } from '../../scrollSystem/scrollSystemListener';
import { ProjectImage } from './projectImage';

export class ImageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: null, lastSelected: null };
    document.addEventListener('mousedown', event => this.unfocusImages(event));
    document.addEventListener('touchstart', event => this.unfocusImages(event));
  }

  unfocusImages(event) {
    // If the clicked element is an image, do not unfocus
    const clickedImageId = event.target.getAttribute('data-index');
    if (clickedImageId !== null) return;
    this.setState({ selectedIndex: null, lastSelected: this.state.selectedIndex });
  }

  getImages() {
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

  onImageClicked(index) {
    const selectedIndex = index === this.state.selectedIndex ? null : index;
    this.setState({ selectedIndex, lastSelected: this.state.selectedIndex });
  }

  getZIndex(index) {
    if (this.state.selectedIndex === index) return 320;
    if (this.state.lastSelected === index) return 310;
    return null;
  }

  render() {
    return (
      <ScrollSystemListener className={`image-container ${this.props.visible ? 'show-infobox' : ''}`} scrollSystem={this.props.scrollSystem}>
        {this.getImages()}
      </ScrollSystemListener>
    );
  }
}
