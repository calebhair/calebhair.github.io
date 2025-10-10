import { EVENTS } from '../constants';

export const loading = {
  planets: {
    planetsLoaded: 0,
    totalPlanets: 0,
    get progress() {
      return this.planetsLoaded / this.totalPlanets || 0;
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
  },

  sceneSetup: {
    progress: 0,
  },

  background: {
    progress: 0,
  },

  get isCompleted() {
    return this.planets.progress >= 1
      && this.blackHole.progress >= 1
      && this.sceneSetup.progress >= 1
      && this.background.progress >= 1;
  },
};

const loadingInterval = setInterval(() => {
  console.log('loading');
  if (!loading.isCompleted) return;
  clearInterval(loadingInterval);
  document.dispatchEvent(new Event(EVENTS.LOADING_COMPLETE));
}, 100);
