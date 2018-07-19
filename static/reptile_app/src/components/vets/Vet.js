import React, { Component } from 'react';

import './Vet.css';

class Vet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="vetDisplay">
        {this.props.vet.image!=null ? this.props.vet.image : ''}
        <p>Vet Name: {this.props.vet.vet_name}</p>
        <p>Address: {this.props.vet.raw_address} {this.props.vet.raw_address2}</p>
        <p>City: {this.props.vet.city}</p>
        <p>State: {this.props.vet.state}</p>
        <p>Zip Code: {this.props.vet.zip_code}</p>
        {/* <p>Phone: </p> */}
      </div>
    );
  }
}

export default Vet;
