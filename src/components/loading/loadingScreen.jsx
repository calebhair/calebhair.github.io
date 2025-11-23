import React from 'react';
import { EVENTS, PATHS } from '../../constants';

const TRANSITION_SPEED = 500; // ms

export class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allLoaded: false,
      planetsLoaded: false,
      blackHoleLoaded: false,
      backgroundLoaded: false,
    };

    document.addEventListener(EVENTS.PLANETS_LOADED, () => {
      this.updateState({ planetsLoaded: true });
    });
    document.addEventListener(EVENTS.BLACKHOLE_LOADED, () => {
      this.updateState({ blackHoleLoaded: true });
    });
    document.addEventListener(EVENTS.BACKGROUND_LOADED, () => {
      this.updateState({ backgroundLoaded: true });
    });

    document.addEventListener(EVENTS.LOADING_COMPLETE, () => {
      this.updateState({ allLoaded: true });
    });
  }

  updateState(newState) {
    this.setState({ ...this.state, ...newState });
  }

  getStyle(loaded) {
    if (this.state.allLoaded) return { opacity: 1 };
    return { opacity: loaded ? 0.5 : 0.05 };
  }

  render() {
    const { allLoaded, planetsLoaded, blackHoleLoaded, backgroundLoaded } = this.state;
    return (
      <div className={`loading-screen ${allLoaded ? 'hide-loading-screen' : ''}`}>
        <div className="content">
          <img src={PATHS.LOADING.BLACK_HOLE} alt="" className="blackhole-img" style={this.getStyle(blackHoleLoaded)} />
          <img src={PATHS.LOADING.PLANETS} alt="" className="planets-img" style={this.getStyle(planetsLoaded)} />
          <img src={PATHS.LOADING.STARS} alt="" className="stars-img" style={this.getStyle(backgroundLoaded)} />
        </div>
      </div>
    );
  }
}
