import React from 'react';
import { ScrollSystemListener } from '../../scrollSystemListener';
import { ProjectImage } from './projectImage';

export class ImageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: null, lastSelected: null };
    document.addEventListener('mousedown', () => this.unfocusImages());
    document.addEventListener('touchstart', () => this.unfocusImages());
  }

  unfocusImages() {
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
    this.setState({ selectedIndex: index, lastSelected: this.state.selectedIndex });
  }

  getZIndex(index) {
    if (this.state.selectedIndex === index) return 301;
    if (this.state.lastSelected === index) return 300;
    return 'inherit';
  }

  render() {
    return (
      <ScrollSystemListener className={`image-container ${this.props.visible ? 'show-infobox' : ''}`} scrollSystem={this.props.scrollSystem}>
        {this.getImages()}
      </ScrollSystemListener>
    );
  }
}
