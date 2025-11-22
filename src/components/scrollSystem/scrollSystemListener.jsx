import React from 'react';

/**
 * A React component that listens to scroll events and delegates them to the provided scroll system.
 */
export class ScrollSystemListener extends React.Component {
  render() {
    const { scrollSystem } = this.props;
    return (
      <div
        className={this.props.className}
        style={this.props.style}
        onWheel={scrollSystem.onWheel}
        onTouchStart={scrollSystem.onTouchStart}
        onTouchMove={scrollSystem.onTouchMove}
        onTouchEnd={scrollSystem.onTouchEnd}
      >
        {this.props.children}
      </div>
    );
  }
}
