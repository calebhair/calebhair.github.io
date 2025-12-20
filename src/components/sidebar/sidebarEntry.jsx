// eslint-disable-next-line no-unused-vars
import React from 'react';
import { PATHS } from '../../constants';
import {Tag} from "../infoboxes/tag";

/**
 * Entry component in the sidebar
 * @param text the text to show on the sidebar
 * @param onClick the function to call when the entry is clicked
 * @param classes additional class names to add to the entry
 * @param imageUrl the icon to show for this element
 * @param tag optional tag to show on the entry
 * @return {JSX.Element}
 */
// export function SidebarEntry({ text, onClick, classes, imageUrl = PATHS.QUASAR_TEXTURE, tag = null }) {
//
// }

export class SidebarEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      imageUrl: props.imageUrl || PATHS.QUASAR_TEXTURE,
    };
  }

  makeTag() {
    const { tag } = this.state;
    if (!tag) return <></>;
    return <Tag tag={tag} />;
  }

  render() {
    const { text, onClick, classes, imageUrl } = this.state;
    return (
      <div className={`sidebar-item ${classes}`} onClick={onClick}>
        <img src={imageUrl} alt="" className="sidebar-item-image" />
        <h2 className="sidebar-item-text">{text}</h2>
        {this.makeTag()}
      </div>
    );
  }
}
