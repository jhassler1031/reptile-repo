import React, { Component } from 'react';
import $ from 'jquery';

// Import the utlitity file and set base URL
import file from '../../utility.js';
const baseURL = file.baseURL;

class AddStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store_name: null,
      address1: null,
      address2: null,
      city: null,
      state: null,
      zip_code: null,
      phone: null,
      website: null,
      notes: null,
      image: null
    }
    this._handleInput = this._handleInput.bind(this);
    this._addStore = this._addStore.bind(this);
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

  // Method to make post request
  _addStore(event) {
    event.preventDefault();
    $('#addStoreModal').modal('toggle')
    let url = `${baseURL}/stores/`;
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
      method: "POST",
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
    .then(responseAsJson=> {
      console.log("Added store: ", responseAsJson);
    })
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });
  }

  render() {
    return (
      <div className="addStoreComponent">
        <div id="addStore" className="col-12 col-md-4 login header-item">
          <button type="button" className="addStoreButton btn btn-primary" data-toggle="modal" data-target="#addStoreModal">Add a Local Pet Store</button>
        </div>

        {/* // Modal Here */}
        <div className="modal" tabIndex="-1" role="dialog" id="addStoreModal" data-backdrop="false">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add a Local Pet Store</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this._addStore} className="addStoreForm">
                  <label htmlFor="storeNameInput">Store Name</label>
                  <input name="storeNameInput" type="text" className="form-control" id="storeNameInput" placeholder="Store Name" value={this.state.store_name} onChange={this._handleInput} required/>

                  <label htmlFor="address1Input">Address</label>
                  <input name="address1Input" type="text" className="form-control" id="address1Input" placeholder="Address" value={this.state.address1} onChange={this._handleInput} required/>

                  <label htmlFor="address2Input">Address 2</label>
                  <input name="address2Input" type="text" className="form-control" id="address2Input" placeholder="Address 2" value={this.state.address2} onChange={this._handleInput}/>

                  <label htmlFor="cityInput">City</label>
                  <input name="cityInput" type="text" className="form-control" id="cityInput" placeholder="City" value={this.state.city} onChange={this._handleInput} required/>

                  <label htmlFor="stateInput">State</label>
                  <input name="stateInput" type="text" className="form-control" id="stateInput" placeholder="State" value={this.state.state} onChange={this._handleInput} required/>

                  <label htmlFor="zipCodeInput">Zip Code</label>
                  <input name="zipCodeInput" type="text" className="form-control" id="zipCodeInput" placeholder="Zip Code" value={this.state.zip_code} onChange={this._handleInput} required/>

                  <label htmlFor="phoneInput">Phone Number</label>
                  <input name="phoneInput" type="text" className="form-control" id="phoneInput" placeholder="Phone Number" value={this.state.phone} onChange={this._handleInput}/>

                  <label htmlFor="cityInput">Website</label>
                  <input name="websiteInput" type="text" className="form-control" id="websiteInput" placeholder="Website" value={this.state.website} onChange={this._handleInput} />

                  <label htmlFor="notesInput">Notes</label>
                  <input name="notesInput" type="text" className="form-control" id="notesInput" placeholder="Notes" value={this.state.notes} onChange={this._handleInput} />

                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddStore;
