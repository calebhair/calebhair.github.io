export const MINIMUM_DISTANCE_FROM_PLANET_TO_FOCUS = 8;

export const CUSTOM_MOUSE_SCROLL_FACTOR = 0.1;
export const CUSTOM_TOUCH_SCROLL_FACTOR = 0.3;

export const SCROLL_METHOD = {
  WHEEL: 'wheel',
  TOUCH: 'touch',
};

export const NAV_BTN_STATES = {
  Default: 0,
  Sidebar: 1,
  Focussed: 2,
};

export const EVENTS = {
  SIDEBAR_OPENED: 'sidebarOpened',
  SIDEBAR_CLOSED: 'sidebarClosed',

  // SET_NAV_BTN_PLANET_FOCUSSED: 'navBtnStatePlanetFocussed',
  SET_NAV_BTN_DEFAULT: 'navBtnStateDefault',

  PLANET_UNFOCUSSED: 'unfocusPlanet',
  PLANET_FOCUSSED: 'focusPlanet',
  PLANET_CHANGED: 'changePlanet',

  INTRO_COMPLETE: 'introComplete',
  LOADING_COMPLETE: 'loadingComplete',
};

export const PATHS = {
  ZERO: '/img/quasar/zero.png',
  ONE: '/img/quasar/one.png',
  QUASAR_TEXTURE: '/img/quasar/quasar_texture.png',

  BACK_ARROW: '/img/sidebar/back.svg',
  UP_ARROW: '/img/sidebar/up.svg',
  QUASAR_ICON: '/img/sidebar/quasar.svg',

  CUBEMAP: '/img/',
};
