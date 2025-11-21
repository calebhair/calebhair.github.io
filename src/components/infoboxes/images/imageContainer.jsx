import React from 'react';
import { ScrollSystemListener } from '../../scrollSystemListener';
import { ProjectImage } from './projectImage';

export class ImageContainer extends React.Component {
  getImages() {
    return this.props.images?.map((image, index) => (
      <ProjectImage
        key={index}
        imageUrl={image.url}
        altText={image.altText}
        visible={this.props.visible}
      >
      </ProjectImage>
    ));
  }

  render() {
    return (
      <ScrollSystemListener className="image-container" scrollSystem={this.props.scrollSystem}>
        {this.getImages()}
      </ScrollSystemListener>
    );
  }
}
