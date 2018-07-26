import React, { Component } from 'react';
import $ from 'jquery';

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
      // On none required fields, doing an if before setting state value to avoid error
      vet_name: this.props.vet.vet_name,
      address1: this.props.vet.raw_address,
      address2: (this.props.vet.raw_address2 !== null ? this.props.vet.raw_address2 : undefined),
      city: this.props.vet.city,
      state: this.props.vet.state,
      zip_code: this.props.vet.zip_code,
      phone: (this.props.vet.phone!== null ? this.props.vet.phone : undefined),
      website: (this.props.vet.website !== null ? this.props.vet.website : undefined),
      emergency_services: this.props.vet.emergency_services,
      boarding_services: this.props.vet.boarding_services,
      notes: (this.props.vet.notes !== null ? this.props.vet.notes : undefined),
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
    if (event.target.name === "emergencyInput") {
      this.setState({emergency_services: !this.state.emergency_services});
    }
    if (event.target.name === "boardingInput") {
      this.setState({boarding_services: !this.state.boarding_services});
    }
  }

  _editVet(event) {
    event.preventDefault();
    $(`#editVetModal${this.props.vet.id}`).modal('toggle')
    let url = `${baseURL}/vets/${this.props.vet.id}`;
    let headerInfo = sessionStorage.getItem("token");
    let vetInfo = {
      "vet_name": this.state.vet_name,
      "raw_address": this.state.address1,
      "raw_address2": this.state.address2,
      city: this.state.city,
      state: this.state.state,
      "zip_code": this.state.zip_code,
      phone: this.state.phone,
      website: this.state.website,
      "emergency_services": this.state.emergency_services,
      "boarding_services": this.state.boarding_services,
      notes: this.state.notes,
      image: this.state.image
    }

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(vetInfo),
      headers: {
        'Content-Type': "application/json",
        'Authorization': headerInfo
      }
    })
    .then(response=>{
      console.log("response: ", response);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    // .then(responseAsJson=> {
    //   console.log("Edited vet: ", responseAsJson);
    //   this.setState({
    //     vet_name: responseAsJson.vet_name,
    //     address1: responseAsJson.raw_address,
    //     address2: (responseAsJson.raw_address2 !== null ? responseAsJson.raw_address2 : undefined),
    //     city: responseAsJson.city,
    //     state: responseAsJson.state,
    //     zip_code: responseAsJson.zip_code,
    //     phone: (responseAsJson.phone !== null ? responseAsJson.phone : undefined),
    //     website: (responseAsJson.website !== null ? responseAsJson.website : undefined),
    //     emergency_services: (responseAsJson.emergency_services ? true : false),
    //     boarding_services: (responseAsJson.boarding_services ? true : false),
    //     notes: (responseAsJson.notes !== null ? responseAsJson.notes : undefined),
    //     image: undefined
    //   });
    //   console.log(this.state);
    // })
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });
  }

  render() {
    return (
      <div className="col-5 myVetDisplay">
        <h1>{this.state.vet_name}</h1>
        <p>Emergency Services Available: {(this.state.emergency_services ? "Yes" : "No")}</p>
        <p>Boarding Services Available: {(this.state.boarding_services ? "Yes" : "No")}</p>

        {/* Button to open modal to edit entry */}
        <div id="editVet" className="col-12 col-md-4">
          <button type="button" className="editVetButton btn" data-toggle="modal" data-target={`#editVetModal${this.props.vet.id}`}>Edit Entry</button>
        </div>

        {/* Modal to edit entry */}
        <div className="modal" tabIndex="-1" role="dialog" id={`editVetModal${this.props.vet.id}`} data-backdrop="false">
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
                  <input name="vetNameInput" type="text" className="form-control" id={`editVetNameInput${this.props.vet.id}`} placeholder="Vet Name" value={this.state.vet_name} onChange={this._handleInput} required/>

                  <label htmlFor="address1Input">Address</label>
                  <input name="address1Input" type="text" className="form-control" id={`editVetAddress1Input${this.props.vet.id}`} placeholder="Address" value={this.state.address1} onChange={this._handleInput} required/>

                  <label htmlFor="address2Input">Address 2</label>
                  <input name="address2Input" type="text" className="form-control" id={`editVetAddress2Input${this.props.vet.id}`} placeholder="Address 2" value={this.state.address2} onChange={this._handleInput}/>

                  <label htmlFor="cityInput">City</label>
                  <input name="cityInput" type="text" className="form-control" id={`editVetCityInput${this.props.vet.id}`} placeholder="City" value={this.state.city} onChange={this._handleInput} required/>

                  <label htmlFor="stateInput">State</label>
                  <input name="stateInput" type="text" className="form-control" id={`editVetStateInput${this.props.vet.id}`} placeholder="State" value={this.state.state} onChange={this._handleInput} required/>

                  <label htmlFor="zipCodeInput">Zip Code</label>
                  <input name="zipCodeInput" type="text" className="form-control" id={`editVetZipCodeInput${this.props.vet.id}`} placeholder="Zip Code" value={this.state.zip_code} onChange={this._handleInput} required/>

                  <label htmlFor="phoneInput">Phone Number</label>
                  <input name="phoneInput" type="text" className="form-control" id={`editVetPhoneInput${this.props.vet.id}`} placeholder="Phone Number" value={this.state.phone} onChange={this._handleInput}/>

                  <label htmlFor="cityInput">Website</label>
                  <input name="websiteInput" type="text" className="form-control" id={`editVetWebsiteInput${this.props.vet.id}`} placeholder="Website" value={this.state.website} onChange={this._handleInput} />

                  <label htmlFor="emergencyInput">Emergency Services Offered?</label>
                  <input name="emergencyInput" type="checkbox" value="true" checked={this.state.emergency_services} onChange={this._handleInput}/>

                  <label htmlFor="boardingInput">Boarding Services Offered?</label>
                  <input name="boardingInput" type="checkbox" value="true" checked={this.state.boarding_services} onChange={this._handleInput}/>

                  <label htmlFor="notesInput">Notes</label>
                  <input name="notesInput" type="text" className="form-control" id={`editVetNotesInput${this.props.vet.id}`} placeholder="Notes" value={this.state.notes} onChange={this._handleInput} />

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
