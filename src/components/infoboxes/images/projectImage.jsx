import React from 'react';

export class ProjectImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={`infobox project-image border ${this.props.focused ? 'focused' : ''}`}
        onClick={() => this.props.onClick(this.props.index)}
        style={this.props.style}
        data-index={this.props.index}
      >
        <img src={this.props.imageUrl} alt={this.props.altText} />
      </div>
    );
  }
}
