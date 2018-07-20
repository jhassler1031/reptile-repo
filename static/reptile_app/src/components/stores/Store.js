import React, { Component } from 'react';

import './Store.css';

class Store extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="storeDisplay">
        {this.props.store.image!=null ? <img src="this.props.store.image"/> : ''}
        <p>Store Name: {this.props.store.store_name}</p>
        <p>Address: {this.props.store.raw_address} {this.props.store.raw_address2}</p>
        <p>City: {this.props.store.city}</p>
        <p>State: {this.props.store.state}</p>
        <p>Zip Code: {this.props.store.zip_code}</p>
        {/* <p>Phone: </p> */}
      </div>
    );
  }
}

export default Store;
