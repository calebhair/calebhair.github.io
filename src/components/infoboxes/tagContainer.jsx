import React from 'react';
import { Tag } from './tag';

export class TagContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  makeTags() {
    return this.props.tags?.map((tag, index) => (
      <Tag key={index} tag={tag} />
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
