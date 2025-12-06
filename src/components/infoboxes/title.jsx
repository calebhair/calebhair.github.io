import React from 'react';
import { EVENTS } from '../../constants';
import { ScrollSystemListener } from '../scrollSystem/scrollSystemListener';

const marginEm = 4;

export class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'placeholder',
      visible: false,
      widthEm: 0,
      textOpacity: 0,
    };
    this.scrollSystem = props.scrollSystem;
    this.addEventListeners();
  }

  addEventListeners() {
    // Showing or hiding the title has two parts, the box and the text
    const secondAnimationDelay = 200;
    document.addEventListener(EVENTS.PLANET_FOCUSSED, (event) => {
      const { name } = event.detail;
      this.setState({
        visible: true, widthEm: name.length + marginEm
      });
      setTimeout(() => {
        this.setState({ title: name, textOpacity: 1 });
      }, secondAnimationDelay);
    });

    document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => {
      this.setState({ textOpacity: 0 });
      setTimeout(() => {
        this.setState({ widthEm: 0, visible: false });
      }, secondAnimationDelay / 2);
    });

    document.addEventListener(EVENTS.PLANET_CHANGED, (event) => {
      const { name } = event.detail;
      this.setState({ textOpacity: 0, widthEm: name.length + marginEm });
      setTimeout(() => {
        this.setState({ title: name, textOpacity: 1 });
      }, secondAnimationDelay);
    });
  }

  componentDidMount() {
    document.dispatchEvent(new Event(EVENTS.UPDATE_BORDERS));
  }

  render() {
    const { visible, widthEm, textOpacity, title } = this.state;
    return (
      <ScrollSystemListener
        className={`infobox title border ${visible ? 'show-infobox' : ''}`}
        style={{ width: `${widthEm}em` }}
        scrollSystem={this.scrollSystem}
      >
        <h1 className="info" style={{ opacity: textOpacity }}>
          { title }
        </h1>
      </ScrollSystemListener>
    );
  }
}
