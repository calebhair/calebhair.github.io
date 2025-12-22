// eslint-disable-next-line no-unused-vars
import React from 'react';
import { ScrollSystemListener } from '../scrollSystem/scrollSystemListener';

export function ScrollArrow({ visible, scrollSystem, onClick }) {
  return (
    <ScrollSystemListener scrollSystem={scrollSystem} style={{ pointerEvents: 'auto' }} onClick={onClick}>
      <i className={'scroll-arrow material-symbols-outlined ' + (visible ? 'show-arrow' : '')}>arrow_drop_down</i>
    </ScrollSystemListener>
  );
}
