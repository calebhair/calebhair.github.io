import React from 'react';

export class TagContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  makeTags() {
    return this.props.tags?.map((tag, index) => (
      <p key={index} className="tag">{tag.name}</p>
    ));
  }

  render() {
    // If tags are undefined or empty
    if (!this.props.tags?.length) return <></>;

    return (
      <div className="tag-container">
        {this.makeTags()}
      </div>
    );
  }
}
