import React, { Component } from 'react';

import './Vet.css';

// Import the utlitity file and set base URL
import file from '../../utility.js';
const baseURL = file.baseURL;
const noImageURL = baseURL + "/media/media/noimagefound.JPG";

class Vet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-12 vetDisplay">
        <div className="row no-gutters">
          <div className="col-12 col-md-6 image-container">
            {this.props.vet.image !== null ? <img src={this.props.vet.image} alt="Vet"/> : <img src={noImageURL} alt="Default"/>}
          </div>

          <div className="col-12 col-md-6">
            <h1>{this.props.vet.vet_name}</h1>
            <p>{this.props.vet.raw_address} {this.props.vet.raw_address2}</p>
            <p>{this.props.vet.city}, {this.props.vet.state} {this.props.vet.zip_code}</p>
            {this.props.vet.phone!=null ? <p>Phone: {this.props.vet.phone}</p> : ''}
            {this.props.vet.website!=null ? <div className="btn website-button"><a href={this.props.vet.website} target="_blank">Website</a></div> : ''}
            <p>Emergency Services Available: {this.props.vet.emergency_services ? "Yes" : "No"}</p>
            <p>Boarding Services Available: {this.props.vet.boarding_services ? "Yes" : "No"}</p>
            {this.props.vet.notes!=null ? <p>Notes: {this.props.vet.notes}</p> : ''}
          </div>
        </div>
      </div>

    );
  }
}

export default Vet;
