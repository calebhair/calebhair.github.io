// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import { EVENTS } from '../../constants';

export class ProjectImage extends React.Component {
  constructor(props) {
    super(props);
    this.addEventListeners();
  }

  addEventListeners() {

  }

  render() {
    return (
      <div className={`infobox project-image border ${this.props.visible ? 'show-infobox' : ''}`}>
        <img src={this.props.imageUrl} alt={this.props.altText} />
      </div>
    );
  }
}
