import React, { Component } from 'react';
import $ from 'jquery';

import './MyStore.css';

// Import the utlitity file and set base URL
import file from '../../utility.js';
const baseURL = file.baseURL;

// This class is to give a more detailed view of a contributors stores with the options
// to edit or delete.
class MyStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // On none required fields, doing an if before setting state value to avoid error
      store_name: this.props.store.store_name,
      address1: this.props.store.raw_address,
      address2: (this.props.store.raw_address2 !== null ? this.props.store.raw_address2 : undefined),
      city: this.props.store.city,
      state: this.props.store.state,
      zip_code: this.props.store.zip_code,
      phone: (this.props.store.phone!== null ? this.props.store.phone : undefined),
      website: (this.props.store.website !== null ? this.props.store.website : undefined),
      notes: (this.props.store.notes !== null ? this.props.store.notes : undefined),
      image: undefined
    }
    this._editStore = this._editStore.bind(this);
    this._handleInput = this._handleInput.bind(this);
  }

  _handleInput(event) {
    let content = event.target.value;
    if (event.target.name === "storeNameInput") {
      this.setState({store_name: content});
    }
    if (event.target.name === "address1Input") {
      this.setState({address1: content});
    }
    if (event.target.name === "address2Input") {
      this.setState({address2: content});
    }
    if (event.target.name === "cityInput") {
      this.setState({city: content});
    }
    if (event.target.name === "stateInput") {
      this.setState({state: content});
    }
    if (event.target.name === "zipCodeInput") {
      this.setState({zip_code: content});
    }
    if (event.target.name === "phoneInput") {
      this.setState({phone: content});
    }
    if (event.target.name === "websiteInput") {
      this.setState({website: content});
    }
    if (event.target.name === "notesInput") {
      this.setState({notes: content});
    }
  }

  _editStore(event) {
    event.preventDefault();
    $(`#editStoreModal${this.props.store.id}`).modal('toggle')
    let url = `${baseURL}/stores/${this.props.store.id}`;
    let headerInfo = sessionStorage.getItem("token");
    let storeInfo = {
      "store_name": this.state.store_name,
      "raw_address": this.state.address1,
      "raw_address2": this.state.address2,
      city: this.state.city,
      state: this.state.state,
      "zip_code": this.state.zip_code,
      phone: this.state.phone,
      website: this.state.website,
      notes: this.state.notes,
      image: this.state.image
    }

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(storeInfo),
      headers: {
        'Content-Type': "application/json",
        'Authorization': headerInfo
      }
    })
    .then(response=>{
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });
  }

  render() {
    return (
      <div className="col-5 myStoreDisplay">
        <h1>{this.state.store_name}</h1>

        {/* Button to open modal to edit entry */}
        <div id="editStore" className="col-12 col-md-4">
          <button type="button" className="editStoreButton btn" data-toggle="modal" data-target={`#editStoreModal${this.props.store.id}`}>Edit Entry</button>
        </div>

        {/* Modal to edit entry */}
        <div className="modal" tabIndex="-1" role="dialog" id={`editStoreModal${this.props.store.id}`} data-backdrop="false">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Pet Store</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this._editStore} className="editStoreForm">
                  <label htmlFor="storeNameInput">Store Name</label>
                  <input name="storeNameInput" type="text" className="form-control" id={`editStoreNameInput${this.props.store.id}`} placeholder="Store Name" value={this.state.store_name} onChange={this._handleInput} required/>

                  <label htmlFor="address1Input">Address</label>
                  <input name="address1Input" type="text" className="form-control" id={`editStoreAddress1Input${this.props.store.id}`} placeholder="Address" value={this.state.address1} onChange={this._handleInput} required/>

                  <label htmlFor="address2Input">Address 2</label>
                  <input name="address2Input" type="text" className="form-control" id={`editStoreAddress2Input${this.props.store.id}`} placeholder="Address 2" value={this.state.address2} onChange={this._handleInput}/>

                  <label htmlFor="cityInput">City</label>
                  <input name="cityInput" type="text" className="form-control" id={`editStoreCityInput${this.props.store.id}`} placeholder="City" value={this.state.city} onChange={this._handleInput} required/>

                  <label htmlFor="stateInput">State</label>
                  <input name="stateInput" type="text" className="form-control" id={`editStoreStateInput${this.props.store.id}`} placeholder="State" value={this.state.state} onChange={this._handleInput} required/>

                  <label htmlFor="zipCodeInput">Zip Code</label>
                  <input name="zipCodeInput" type="text" className="form-control" id={`editStoreZipCodeInput${this.props.store.id}`} placeholder="Zip Code" value={this.state.zip_code} onChange={this._handleInput} required/>

                  <label htmlFor="phoneInput">Phone Number</label>
                  <input name="phoneInput" type="text" className="form-control" id={`editStorePhoneInput${this.props.store.id}`} placeholder="Phone Number" value={this.state.phone} onChange={this._handleInput}/>

                  <label htmlFor="cityInput">Website</label>
                  <input name="websiteInput" type="text" className="form-control" id={`editStoreWebsiteInput${this.props.store.id}`} placeholder="Website" value={this.state.website} onChange={this._handleInput} />

                  <label htmlFor="notesInput">Notes</label>
                  <input name="notesInput" type="text" className="form-control" id={`editStoreNotesInput${this.props.store.id}`} placeholder="Notes" value={this.state.notes} onChange={this._handleInput} />

                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        {/* Button to delete entry */}
        <input className="btn" type="button" value="Delete Entry" onClick={this.props.deleteStore}/>

      </div>
    );
  }
}

export default MyStore;
