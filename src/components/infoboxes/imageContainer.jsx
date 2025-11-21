// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import { EVENTS } from '../../constants';
import { ScrollSystemListener } from '../scrollSystemListener';
import { ProjectImage } from './projectImage';

export class ImageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.images = props.images;
    this.addEventListeners();
  }

  addEventListeners() {

  }

  getImages() {
    return this.images.map((image, index) => (
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
      <ScrollSystemListener
        className="image-container"
        scrollSystem={this.props.scrollSystem}
      >
        {this.getImages()}
      </ScrollSystemListener>
    );
  }
}
