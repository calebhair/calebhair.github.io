// eslint-disable-next-line no-unused-vars
import React from 'react';

export function ScrollArrow({ visible }) {
  return (
    <i className={'scroll-arrow material-symbols-outlined ' + (visible ? 'show-arrow' : '')}>arrow_drop_down</i>
  );
}
