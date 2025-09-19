// eslint-disable-next-line no-unused-vars
import React from 'react';

/**
 * Entry component in the sidebar
 * @param text the text to show on the sidebar
 * @param onClick the function to call when the entry is clicked
 * @param imageUrl the icon to show for this element.
 * @return {JSX.Element}
 */
export function SidebarEntry({ text, onClick, imageUrl = 'img/quasar_particle.png' }) {
  return (
    <div className="sidebar-item" onClick={onClick}>
      <img src={imageUrl} alt="" className="sidebar-item-image" />
      <h2 className="sidebar-item-text">{text}</h2>
    </div>
  );
}
