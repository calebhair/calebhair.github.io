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
        <i className="material-symbols-outlined prevent-select hand-icon">pan_tool</i>
      </>
    );
  }
}
