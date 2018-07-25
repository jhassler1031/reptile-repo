import React, { Component } from 'react';

import './Vet.css';

class Vet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-12 col-md-5 vetDisplay">
        {this.props.vet.image!=null ? <div className="image-container"><img src={this.props.vet.image} alt="Vet"/></div> : ''}
        <h1>{this.props.vet.vet_name}</h1>
        <p>{this.props.vet.raw_address} {this.props.vet.raw_address2}</p>
        <p>{this.props.vet.city}, {this.props.vet.state} {this.props.vet.zip_code}</p>
        {this.props.vet.phone!=null ? <p>Phone: {this.props.vet.phone}</p> : ''}
        {this.props.vet.website!=null ? <div className="btn website-button"><a href={this.props.vet.website} target="_blank">Website</a></div> : ''}
        <p>Emergency Services Available: {this.props.vet.emergency_services ? "Yes" : "No"}</p>
        <p>Boarding Services Available: {this.props.vet.boarding_services ? "Yes" : "No"}</p>
        {this.props.vet.notes!=null ? <p>Notes: {this.props.vet.notes}</p> : ''}
      </div>
    );
  }
}

export default Vet;
