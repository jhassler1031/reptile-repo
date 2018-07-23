import React, { Component } from 'react';

import './Illness.css';

class Illness extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col illnessDisplay">
        <h1>{this.props.illness.illness_name}</h1>
        <p>Symptoms: {this.props.illness.symptoms}</p>
        <p>Species Affected: {this.props.illness.species_affected}</p>
        <p>{this.props.illness.description}</p>
      </div>
    );
  }
}

export default Illness;
