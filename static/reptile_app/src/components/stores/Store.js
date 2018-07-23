import React, { Component } from 'react';

import './Store.css';

class Store extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-12 col-md-5 storeDisplay">
        {this.props.store.image!=null ? <div className="image-container"><img src={this.props.store.image}/></div> : ''}
        <h1>{this.props.store.store_name}</h1>
        <p>{this.props.store.raw_address} {this.props.store.raw_address2}</p>
        <p>{this.props.store.city}, {this.props.store.state} {this.props.store.zip_code}</p>
        {this.props.store.phone!=null ? <p>Phone: {this.props.store.phone}</p> : ''}
        {this.props.store.website!=null ? <div className="btn website-button"><a href={this.props.store.website} target="_blank">Website</a></div> : ''}
        {this.props.store.notes!=null ? <p>Notes: {this.props.store.notes}</p> : ''}
      </div>
    );
  }
}

export default Store;
