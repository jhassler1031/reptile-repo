import React, { Component } from 'react';

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
      notes: ''
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
    // ????????????????????????????????????????
    if (event.target.name === "emergencyInput") {
      this.setState({emergency_services: !content});
    }
    if (event.target.name === "boardingInput") {
      this.setState({boarding_services: !content});
    }
  }

  _addVet(event) {
    event.preventDefault();
    console.log("hey");
  }

  render() {
    return (
      <div className="addVetComponent">
        <div id="addVet" className="col-12 col-md-4 login header-item">
          <button type="button" className="addVetButton btn btn-primary" data-toggle="modal" data-target="#addVetModal">Add a Veterinarian</button>
        </div>

        // Modal Here
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
                <form onSubmit={this._addVet} className="addVetForm">
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
                  <input name="emergencyInput" type="radio" value={this.state.emergency_services} checked={this.state.emergency_services} onChange={this._handleInput}/>

                  <label htmlFor="boardingInput">Boarding Services Offered?</label>
                  <input name="boardingInput" type="radio" value={this.state.boarding_services} checked={this.state.boarding_services} onChange={this._handleInput}/>

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

export default AddVet;
