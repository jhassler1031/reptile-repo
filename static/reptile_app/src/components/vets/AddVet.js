import React, { Component } from 'react';
import $ from 'jquery';
import './AddVet.css';

// Import the utlitity file and set base URL
import file from '../../utility.js';
const baseURL = file.baseURL;

class AddVet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vet_name: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip_code: '',
      phone: '',
      website: '',
      emergency_services: false,
      boarding_services: false,
      notes: '',
      image: '',
    }
    this._handleInput = this._handleInput.bind(this);
    this._addVet = this._addVet.bind(this);
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
    if (event.target.name === "imageInput") {
      let file = event.target.files[0];
      this.setState({image: file});
    }
  }

  // Method to make post request
  _addVet(event) {
    event.preventDefault();
    $('#addVetModal').modal('toggle')
    let url = `${baseURL}/vets/`;
    let headerInfo = sessionStorage.getItem("token");

    let vetInfo = new FormData();
    vetInfo.append("vet_name", this.state.vet_name);
    vetInfo.append("raw_address", this.state.address1);
    vetInfo.append("raw_address2", this.state.address2);
    vetInfo.append("city", this.state.city);
    vetInfo.append("state", this.state.state);
    vetInfo.append("zip_code", this.state.zip_code);
    vetInfo.append("phone", this.state.phone);
    vetInfo.append("website", this.state.website);
    vetInfo.append("emergency_services", this.state.emergency_services);
    vetInfo.append("boarding_services", this.state.boarding_services);
    vetInfo.append("notes", this.state.notes);
    vetInfo.append("image", this.state.image);

    fetch(url, {
      method: "POST",
      body: vetInfo,
      headers: {
        'Authorization': headerInfo
      }
    })
    .then(response=>{
      if (!response.ok) {
        throw Error(response.statusText);
      }
    })
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });
  }

  render() {
    return (
      <div className="addVetComponent">
        <div id="addVet" className="col-12 col-md-4 login header-item">
          <button type="button" className="addVetButton btn" data-toggle="modal" data-target="#addVetModal">Add a Veterinarian</button>
        </div>

        {/* // Modal Here */}
        <div className="modal" tabIndex="-1" role="dialog" id="addVetModal" data-backdrop="false">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add a Veterinarian</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this._addVet} encType='multipart/form-data' className="addVetForm">
                  <label htmlFor="vetNameInput">Vet Name</label>
                  <input name="vetNameInput" type="text" className="form-control" id="vetNameInput" placeholder="Vet Name" value={this.state.vet_name} onChange={this._handleInput} required/>

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

                  <label htmlFor="emergencyInput">Emergency Services Offered?</label>
                  <input className="check-box" name="emergencyInput" type="checkbox" value="true" checked={this.state.emergency_services} onChange={this._handleInput}/>

                  <br/>

                  <label htmlFor="boardingInput">Boarding Services Offered?</label>
                  <input className="check-box" name="boardingInput" type="checkbox" value="true" checked={this.state.boarding_services} onChange={this._handleInput}/>

                  <br/>

                  <label htmlFor="notesInput">Notes</label>
                  <textarea name="notesInput" type="text" rows="5" className="form-control" id="notesInput" placeholder="Notes" value={this.state.notes} onChange={this._handleInput}></textarea>

                  <label htmlFor="imageInput">Image Upload</label>
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

export default AddVet;
