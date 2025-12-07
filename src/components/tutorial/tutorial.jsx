import React from 'react';

export class Tutorial extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const animation = 'pan';
    return (
      <>
        <div className="static-floor"></div>
        <div className={`reference-object ${animation}-animation`}></div>
        <div className={`tutorial-icon mouse-icon ${animation}-animation`}></div>
        <div className={`tutorial-icon touch-icon ${animation}-animation`}></div>
      </>
    );
  }
}
