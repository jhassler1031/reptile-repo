import React, { Component } from 'react';

import './MyVet.css';

// Import the utlitity file and set base URL
import file from '../../utility.js';
const baseURL = file.baseURL;

// This class is to give a more detailed view of a contributors vets with the options
// to edit or delete.
class MyVet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vet_name: '',
      address1: '',
      address2: undefined,
      city: '',
      state: '',
      zip_code: '',
      phone: undefined,
      website: undefined,
      emergency_services: false,
      boarding_services: false,
      notes: undefined,
      image: undefined
    }

  }

  render() {
    return (
      <div className="col-5 myVetDisplay">
        <h1>{this.props.vet.vet_name}</h1>

        <input className="btn" type="button" value="Delete Entry" onClick={this.props.deleteVet}/>

      </div>
    );
  }
}

export default MyVet;
