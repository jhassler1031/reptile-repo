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
    this._editVet = this._editVet.bind(this);
    this._handleInput = this._handleInput.bind(this);
  }

  _handleInput(event) {
    let content = event.target.value;
    if (event.target.name === "vetNameInput") {
      this.setState({vet_name: content});
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
    // ????????????????????????????????????????
    if (event.target.name === "emergencyInput") {
      this.setState({emergency_services: !content});
    }
    if (event.target.name === "boardingInput") {
      this.setState({boarding_services: !content});
    }
  }

  _editVet(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="col-5 myVetDisplay">
        <h1>{this.props.vet.vet_name}</h1>

        {/* Button to open modal to edit entry */}
        <div id="editVet" className="col-12 col-md-4">
          <button type="button" className="editVetButton btn" data-toggle="modal" data-target="#editVetModal">Edit Entry</button>
        </div>

        {/* Modal to edit entry */}
        <div className="modal" tabIndex="-1" role="dialog" id="editVetModal" data-backdrop="false">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Veterinarian</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this._editVet} className="editVetForm">
                  <label htmlFor="vetNameInput">Vet Name</label>
                  <input name="vetNameInput" type="text" className="form-control" id="editVetNameInput" placeholder="Vet Name" value={this.state.vet_name} onChange={this._handleInput} required/>

                  <label htmlFor="address1Input">Address</label>
                  <input name="address1Input" type="text" className="form-control" id="editAddress1Input" placeholder="Address" value={this.state.address1} onChange={this._handleInput} required/>

                  <label htmlFor="address2Input">Address 2</label>
                  <input name="address2Input" type="text" className="form-control" id="editAddress2Input" placeholder="Address 2" value={this.state.address2} onChange={this._handleInput}/>

                  <label htmlFor="cityInput">City</label>
                  <input name="cityInput" type="text" className="form-control" id="editCityInput" placeholder="City" value={this.state.city} onChange={this._handleInput} required/>

                  <label htmlFor="stateInput">State</label>
                  <input name="stateInput" type="text" className="form-control" id="editStateInput" placeholder="State" value={this.state.state} onChange={this._handleInput} required/>

                  <label htmlFor="zipCodeInput">Zip Code</label>
                  <input name="zipCodeInput" type="text" className="form-control" id="editZipCodeInput" placeholder="Zip Code" value={this.state.zip_code} onChange={this._handleInput} required/>

                  <label htmlFor="phoneInput">Phone Number</label>
                  <input name="phoneInput" type="text" className="form-control" id="editPhoneInput" placeholder="Phone Number" value={this.state.phone} onChange={this._handleInput}/>

                  <label htmlFor="cityInput">Website</label>
                  <input name="websiteInput" type="text" className="form-control" id="editWebsiteInput" placeholder="Website" value={this.state.website} onChange={this._handleInput} />

                  <label htmlFor="emergencyInput">Emergency Services Offered?</label>
                  <input name="emergencyInput" type="radio" value={this.state.emergency_services} checked={this.state.emergency_services} onChange={this._handleInput}/>

                  <label htmlFor="boardingInput">Boarding Services Offered?</label>
                  <input name="boardingInput" type="radio" value={this.state.boarding_services} checked={this.state.boarding_services} onChange={this._handleInput}/>

                  <label htmlFor="notesInput">Notes</label>
                  <input name="notesInput" type="text" className="form-control" id="editNotesInput" placeholder="Notes" value={this.state.notes} onChange={this._handleInput} />

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
        <input className="btn" type="button" value="Delete Entry" onClick={this.props.deleteVet}/>

      </div>
    );
  }
}

export default MyVet;
