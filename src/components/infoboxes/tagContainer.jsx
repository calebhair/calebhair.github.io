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
      <div
        key={index}
        className="tag-background"
        style={{
          '--primary-color': tag.primaryColor,
          '--secondary-color': tag.secondaryColor,
        }}
      >
        <p className="tag" style={{ color: tag.textColor }}>
          {tag.name}
        </p>
      </div>
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
