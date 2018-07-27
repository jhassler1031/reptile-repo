import React, { Component } from 'react';

import './Store.css';

// Import the utlitity file and set base URL
import file from '../../utility.js';
const baseURL = file.baseURL;
const noImageURL = baseURL + "/media/media/noimagefound.JPG";

class Store extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-12 storeDisplay">
        <div className="row no-gutters">
          <div className="col-12 col-md-6 image-container">
            {this.props.store.image!=null ? <div className="image-container"><img src={this.props.store.image} alt="Store"/></div> : <img src={noImageURL} alt="Default"/>}
          </div>

          <div className="col-12 col-md-6">
            <h1>{this.props.store.store_name}</h1>
            <p>{this.props.store.raw_address} {this.props.store.raw_address2!==undefined ? this.props.store.raw_address2 : ''}</p>
            <p>{this.props.store.city}, {this.props.store.state} {this.props.store.zip_code}</p>
            {this.props.store.phone!=null ? <p>Phone: {this.props.store.phone}</p> : ''}
            {this.props.store.website!=null ? <div className="btn website-button"><a href={this.props.store.website} target="_blank">Website</a></div> : ''}
            {this.props.store.notes!=null ? <p>Notes: {this.props.store.notes}</p> : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default Store;
