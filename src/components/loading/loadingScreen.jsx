// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {EVENTS, PATHS} from '../../constants';

export function LoadingScreen() {
  const [hide, setHide] = useState(false);

  document.addEventListener(EVENTS.LOADING_COMPLETE, () => {
    // setHide(true);
  });

  return (
    <div className={`loading-screen ${hide ? 'hide-loading-screen' : ''}`}>
      <div className="content">
        <img src={PATHS.LOADING.QUASAR} alt="" />
        <img src={PATHS.LOADING.PLANETS} alt="" />
        <img src={PATHS.LOADING.STARS} alt="" />
      </div>
    </div>
  );
}
