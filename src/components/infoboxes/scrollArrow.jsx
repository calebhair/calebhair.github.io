// eslint-disable-next-line no-unused-vars
import React from 'react';
import { ScrollSystemListener } from '../scrollSystemListener';

export function ScrollArrow({ visible, scrollSystem }) {
  return (
    <ScrollSystemListener scrollSystem={scrollSystem}>
      <i className={'scroll-arrow material-symbols-outlined ' + (visible ? 'show-arrow' : '')}>arrow_drop_down</i>
    </ScrollSystemListener>
  );
}
