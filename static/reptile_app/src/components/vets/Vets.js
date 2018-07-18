import React, { Component } from 'react';

import './Vets.css';

class Vets extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="vetsContainer container">
        <h1>This is the Vets section.</h1>
      </div>
    );
  }
}

export default Vets;
