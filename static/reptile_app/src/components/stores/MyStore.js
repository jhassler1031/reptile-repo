import React, { Component } from 'react';
import $ from 'jquery';

import './MyStore.css';

// Import the utlitity file and set base URL
import file from '../../utility.js';
const baseURL = file.baseURL;
const noImageURL = baseURL + "/media/media/noimagefound.JPG";

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
    if (event.target.name === "imageInput") {
      let file = event.target.files[0];
      this.setState({"image": file});
    }
  }

  _editStore(event) {
    event.preventDefault();
    $(`#editStoreModal${this.props.store.id}`).modal('toggle')
    let url = `${baseURL}/stores/${this.props.store.id}`;
    let headerInfo = sessionStorage.getItem("token");

    let storeInfo = new FormData();
    storeInfo.append("store_name", this.state.store_name);
    storeInfo.append("raw_address", this.state.address1);
    storeInfo.append("raw_address2", this.state.address2);
    storeInfo.append("city", this.state.city);
    storeInfo.append("state", this.state.state);
    storeInfo.append("zip_code", this.state.zip_code);
    storeInfo.append("phone", this.state.phone);
    storeInfo.append("website", this.state.website);
    storeInfo.append("notes", this.state.notes);
    storeInfo.append("image", (this.state.image !== undefined ? this.state.image : ''));

    fetch(url, {
      method: "PUT",
      body: storeInfo,
      headers: {
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
      <div className="col-11 storeDisplay myStoreDisplay">
        <div className="row no-gutters">
          <div className="col-12 col-md-6 image-container">
            {this.props.store.image!=null ? <div className="image-container"><img src={this.props.store.image} alt="Store"/></div> : <img src={noImageURL} alt="Default"/>}
          </div>

          <div className="col-12 col-md-6">
            <h1>{this.props.store.store_name}</h1>
            <p>{this.props.store.raw_address} {this.props.store.raw_address2}</p>
            <p>{this.props.store.city}, {this.props.store.state} {this.props.store.zip_code}</p>
            {this.props.store.phone!=null ? <p>Phone: {this.props.store.phone}</p> : ''}
            {this.props.store.website!=null ? <div className="btn website-button"><a href={this.props.store.website} target="_blank">Website</a></div> : ''}
            {this.props.store.notes!=null ? <p>Notes: {this.props.store.notes}</p> : ''}

            <div className="row justify-content-center">
              {/* Button to open modal to edit entry */}
              <button type="button" className="col-3 submit-button btn" data-toggle="modal" data-target={`#editStoreModal${this.props.store.id}`}>Edit Entry</button>
              {/* Button to delete entry */}
              <input className="col-3 btn submit-button" type="button" value="Delete Entry" onClick={this.props.deleteStore}/>
            </div>
          </div>
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
                  <textarea name="notesInput" type="text" rows="5" className="form-control" id={`editStoreNotesInput${this.props.store.id}`} placeholder="Notes" value={this.state.notes} onChange={this._handleInput}></textarea>

                  <label htmlFor="imageInput">Upload Image</label>
                  <input name="imageInput" type="file" className="form-control" id="imageInput" onChange={this._handleInput} />

                  <button type="submit" className="btn btn-primary submit-button">Submit</button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary close-button" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyStore;
