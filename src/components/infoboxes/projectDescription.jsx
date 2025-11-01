// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { EVENTS } from '../../constants';

export function ProjectDescription(visible) {
  addEventListeners();

  return (
    <div className={`infobox project-desc border ${visible ? 'show-infobox' : ''}`}>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum mollis mauris, nec porttitor metus faucibus a. Integer egestas mauris in porttitor vehicula. Quisque ullamcorper sem sit amet finibus porta. Vestibulum tincidunt est nec lectus luctus, eget condimentum diam dapibus. Donec tempus tellus sit amet lorem ultricies, vitae pharetra ex egestas. Quisque scelerisque erat at ex sollicitudin, sollicitudin finibus mi dapibus. Phasellus ullamcorper tellus non tortor suscipit varius. Vestibulum leo est, laoreet id neque ut, feugiat facilisis enim. Sed non euismod erat. Quisque finibus a lectus tristique rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum mollis mauris, nec porttitor metus faucibus a. Integer egestas mauris in porttitor vehicula. Quisque ullamcorper sem sit amet finibus porta. Vestibulum tincidunt est nec lectus luctus, eget condimentum diam dapibus. Donec tempus tellus sit amet lorem ultricies, vitae pharetra ex egestas. Quisque scelerisque erat at ex sollicitudin, sollicitudin finibus mi dapibus. Phasellus ullamcorper tellus non tortor suscipit varius. Vestibulum leo est, laoreet id neque ut, feugiat facilisis enim. Sed non euismod erat. Quisque finibus a lectus tristique rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum mollis mauris, nec porttitor metus faucibus a. Integer egestas mauris in porttitor vehicula. Quisque ullamcorper sem sit amet finibus porta. Vestibulum tincidunt est nec lectus luctus, eget condimentum diam dapibus. Donec tempus tellus sit amet lorem ultricies, vitae pharetra ex egestas. Quisque scelerisque erat at ex sollicitudin, sollicitudin finibus mi dapibus. Phasellus ullamcorper tellus non tortor suscipit varius. Vestibulum leo est, laoreet id neque ut, feugiat facilisis enim. Sed non euismod erat. Quisque finibus a lectus tristique rhoncus.</p>
    </div>
  );
}

let eventListenersAdded = false;
function addEventListeners() {
  if (eventListenersAdded) return;
  eventListenersAdded = true;
}
