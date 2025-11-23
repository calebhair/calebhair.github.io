export const MINIMUM_DISTANCE_FROM_PLANET_TO_FOCUS = 8;

export const CUSTOM_MOUSE_SCROLL_FACTOR = 1;
export const CUSTOM_TOUCH_SCROLL_FACTOR = 1.5;

export const SCROLL_METHOD = {
  WHEEL: 'wheel',
  TOUCH: 'touch',
};

export const NAV_BTN_STATES = {
  Default: 'default',
  Sidebar: 'sidebar',
  Focussed: 'focussed',
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
  BLACKHOLE_LOADED: 'blackHoleLoaded',
  PLANETS_LOADED: 'planetsLoaded',
  BACKGROUND_LOADED: 'backgroundLoaded',
  LOADING_UPDATE: 'loadingUpdate',
};

export const PATHS = {
  ZERO: '/img/quasar/zero.png',
  ONE: '/img/quasar/one.png',
  QUASAR_TEXTURE: '/img/quasar/quasar_texture.png',

  BACK_ARROW: '/img/sidebar/back.svg',
  UP_ARROW: '/img/sidebar/up.svg',
  QUASAR_ICON: '/img/sidebar/quasar.svg',

  CUBEMAP: '/img/',

  LOADING: {
    BLACK_HOLE: '/img/loading/loading_quasar.svg',
    PLANETS: '/img/loading/loading_planets.svg',
    STARS: '/img/loading/loading_stars.svg',
  },
};
