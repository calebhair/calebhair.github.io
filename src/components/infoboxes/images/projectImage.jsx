import React from 'react';

export class ProjectImage extends React.Component {
  render() {
    return (
      <div className="infobox project-image border">
        <img src={this.props.imageUrl} alt={this.props.altText} />
      </div>
    );
  }
}
