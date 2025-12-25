import React from 'react';

export class ProjectImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleFactor: 1,
    };
    this.ref = React.createRef();
  }

  onClick() {
    const marginXPx = window.innerWidth / 2;
    const marginYPx = window.innerWidth / 5;
    const scaleFactorX = (window.innerWidth - marginXPx) / this.ref.current.offsetWidth;
    const scaleFactorY = (window.innerHeight - marginYPx) / this.ref.current.offsetHeight;
    this.setState({ scaleFactor: Math.min(scaleFactorX, scaleFactorY) });
  }

  render() {
    return (
      <div
        className={`infobox project-image border ${this.props.focused ? 'focused' : ''}`}
        onClick={() => this.props.onClick(this.props.index)}
        style={{ ...this.props.style, '--scale-factor': this.state.scaleFactor }}
        data-index={this.props.index}
        ref={this.ref}
      >
        <img src={this.props.imageUrl} alt={this.props.altText} />
      </div>
    );
  }
}
