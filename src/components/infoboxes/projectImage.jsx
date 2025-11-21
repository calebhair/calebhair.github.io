import React from 'react';

export class ProjectImage extends React.Component {
  render() {
    return (
      <div className={`infobox project-image border ${this.props.visible ? 'show-infobox' : ''}`}>
        <img src={this.props.imageUrl} alt={this.props.altText} />
      </div>
    );
  }
}
