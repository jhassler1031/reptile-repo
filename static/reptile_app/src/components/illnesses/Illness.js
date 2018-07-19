import React, { Component } from 'react';

import './Illness.css';

class Illness extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="illnessDisplay">
        <p>Illness Name: {this.props.illness.illness_name}</p>
        <p>Symptoms: {this.props.illness.symptoms}</p>
        <p>Species Affected: {this.props.illness.species_affected}</p>
        <p>Description: {this.props.illness.description}</p>
      </div>
    );
  }
}

export default Illness;
