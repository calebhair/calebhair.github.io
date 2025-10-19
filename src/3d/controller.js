import { ArcballControls } from 'three/addons/controls/ArcballControls';

export class CustomArcballControls extends ArcballControls {
  constructor(...args) {
    super(...args);
    this.touchDown = false;
    // When disabling controls, how long to wait for before re-attempting to disable controls if the user was touching the screen
    this.repeatControlsDisableDelay = 100;

    document.addEventListener('touchstart', () => this.touchDown = true);
    document.addEventListener('touchend', () => this.touchDown = false);
  }

  set safeEnableZoom(enabled) {
    if (enabled && this.touchDown) {
      setTimeout(() => this.safeEnableZoom = enabled, this.repeatControlsDisableDelay);
      return;
    }
    this.enableZoom = enabled;
  }

  set safeEnablePan(enabled) {
    if (enabled && this.touchDown) {
      setTimeout(() => this.safeEnablePan = enabled, this.repeatControlsDisableDelay);
      return;
    }
    this.enablePan = enabled;
  }

  set safeEnableRotate(enabled) {
    if (enabled && this.touchDown) {
      setTimeout(() => this.safeEnableRotate = enabled, this.repeatControlsDisableDelay);
      return;
    }
    this.enableRotate = enabled;
  }
}
