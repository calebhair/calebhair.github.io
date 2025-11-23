import { EVENTS } from '../constants';

export const loading = {
  planets: {
    planetsLoaded: 0,
    totalPlanets: 0,
    get progress() {
      return this.planetsLoaded / this.totalPlanets || 0;
    },
    get isCompleted() {
      return this.progress >= 1;
    },
  },

  blackHole: {
    accretionDiskSize: 0,
    accretionDiskDistanceLoaded: 0,
    eventHorizon: 0,

    get accretionDiskProgress() {
      return Math.min(this.accretionDiskDistanceLoaded / this.accretionDiskSize, 0.9);
    },
    get progress() {
      return this.accretionDiskProgress + this.eventHorizon * 0.1
        || 0;
    },
    get isCompleted() {
      return this.progress >= 1;
    },
  },

  sceneSetup: {
    progress: 0,
    get isCompleted() {
      return this.progress >= 1;
    },
  },

  background: {
    progress: 0,
    get isCompleted() {
      return this.progress >= 1;
    },
  },

  get isCompleted() {
    return this.planets.isCompleted
      && this.blackHole.isCompleted
      && this.sceneSetup.isCompleted
      && this.background.isCompleted;
  },
};

const loadingInterval = setInterval(() => {
  console.log('loading');
  if (loading.blackHole.isCompleted) document.dispatchEvent(new Event(EVENTS.BLACKHOLE_LOADED));
  if (loading.planets.isCompleted) document.dispatchEvent(new Event(EVENTS.PLANETS_LOADED));
  if (loading.background.isCompleted) document.dispatchEvent(new Event(EVENTS.BACKGROUND_LOADED));
  if (!loading.isCompleted) return;

  clearInterval(loadingInterval);
  document.dispatchEvent(new Event(EVENTS.LOADING_COMPLETE));
}, 100);
