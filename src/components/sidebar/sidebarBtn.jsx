import React from 'react';

function noop() {}

export class SidebarBtn extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = props.onClick || noop;
  }

  render() {
    return (
      <i
        className={`material-symbols-outlined prevent-select sidebar-top-btn ${this.props.className}`}
        style={this.props.style}
        title={this.props.title}
        onClick={this.onClick}
      >
        {this.props.iconName}
      </i>
    );
  }
}
