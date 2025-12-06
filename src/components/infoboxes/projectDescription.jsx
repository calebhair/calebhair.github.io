import React from 'react';
import { EVENTS } from '../../constants';
import { ScrollSystemListener } from '../scrollSystem/scrollSystemListener';

export class ProjectDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: 'placeholder',
    };
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener(EVENTS.PLANET_FOCUSSED, (event) => {
      const { description } = event.detail;
      this.setState({ description });
    });

    document.addEventListener(EVENTS.PLANET_CHANGED, (event) => {
      const { description } = event.detail;
      this.setState({ description });
    });
  }

  componentDidMount() {
    document.dispatchEvent(new Event(EVENTS.UPDATE_BORDERS));
  }

  render() {
    const { visible, scrollSystem } = this.props;
    const { description } = this.state;
    return (
      <ScrollSystemListener className={`infobox project-desc border ${visible ? 'show-infobox' : ''}`} scrollSystem={scrollSystem}>
        <div className="desc-text" dangerouslySetInnerHTML={{ __html: description }} />
      </ScrollSystemListener>
    );
  }
}
