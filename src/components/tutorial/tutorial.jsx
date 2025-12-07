import React from 'react';

export class Tutorial extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="static-floor"></div>
        <div className="reference-object"></div>
        <div className="tutorial-icon mouse-icon"></div>
        <div className="tutorial-icon touch-icon"></div>
      </>
    );
  }
}
