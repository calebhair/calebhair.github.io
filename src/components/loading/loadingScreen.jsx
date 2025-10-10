// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { EVENTS } from '../../constants';

function LoadingScreen() {
  const [hide, setHide] = useState(false);

  document.addEventListener(EVENTS.LOADING_COMPLETE, () => {
    setHide(true);
  });

  return (
    <div className={`loading-screen ${hide ? 'hide-loading-screen' : ''}`}>
      <div className="content">
        Loading
      </div>
    </div>
  );
}

export function addLoadingScreen() {
  const loadingScreenNode = document.getElementsByClassName('loading-screen-container')[0];
  createRoot(loadingScreenNode).render(<LoadingScreen />);
}
