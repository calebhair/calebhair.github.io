import React from 'react';

export class Tag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tag } = this.props;
    return (
      <div
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
    );
  }
}
