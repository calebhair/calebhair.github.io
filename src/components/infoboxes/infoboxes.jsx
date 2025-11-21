import React from 'react';
import { EVENTS, SCROLL_METHOD } from '../../constants';
import { Title } from './title';
import { ProjectDescription } from './projectDescription';
import { ScrollArrow } from './scrollArrow';
import { ImageContainer } from './imageContainer';

const MARGIN_PX = 0;
const START_SCROLL_PX = MARGIN_PX;

export class Infoboxes extends React.Component {
  constructor(props) {
    super(props);
    this.scrollSystem = props.scrollSystem;
    this.scrollableRef = React.createRef();
    this.state = {
      visible: false,
    };
    this.images = [];
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener(EVENTS.PLANET_FOCUSSED, (event) => {
      this.setState({ visible: true });
      this.resetScroll();
      this.getImagesFromEvent(event);
    });
    document.addEventListener(EVENTS.PLANET_UNFOCUSSED, () => {
      this.setState({ visible: false });
      this.resetScroll(); // todo maybe remove
    });
    document.addEventListener(EVENTS.PLANET_CHANGED, (event) => {
      this.resetScroll();
      this.getImagesFromEvent(event);
    });

    this.resetScroll();
    this.scrollSystem.setOnScroll(this.customOnScroll.bind(this));
  }

  getImagesFromEvent(event) {
    this.images = event.detail.images;
  }

  customOnScroll(change, scrollMethod) {
    const scrollable = this.scrollableRef.current;
    if (window.innerHeight > scrollable.clientHeight) return;

    this.scroll += scrollMethod === SCROLL_METHOD.TOUCH ? change : -change;
    const scrollableBottom = scrollable.clientHeight + this.scroll;

    if (scrollableBottom < window.innerHeight - MARGIN_PX) {
      this.scroll = window.innerHeight - scrollable.clientHeight - MARGIN_PX;
    }
    else if (this.scroll > 0) {
      this.resetScroll();
    }
  }

  resetScroll() {
    this.scroll = START_SCROLL_PX;
  }

  set scroll(scrollPx) {
    this._scroll = scrollPx;
    if (this.scrollableRef.current) this.scrollableRef.current.style.marginTop = `${this._scroll}px`;
  }

  get scroll() {
    return this._scroll;
  }

  render() {
    return (
      <div ref={this.scrollableRef} className="scrollable-region">
        <div className="spacer"></div>
        <Title scrollSystem={this.scrollSystem} />
        <ScrollArrow visible={this.state.visible} scrollSystem={this.scrollSystem} />
        <ProjectDescription visible={this.state.visible} scrollSystem={this.scrollSystem} />
        <ImageContainer images={this.images} visible={this.state.visible} scrollSystem={this.scrollSystem} />
      </div>
    );
  }
}
