import React, { Component } from 'react';
import $ from 'jquery';

import './AddIllness.css';

// Import the utlitity file and set base URL
import file from '../../utility.js';
const baseURL = file.baseURL;

class AddIllness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "illness_name": '',
      symptoms: '',
      description: '',
      "species_affected": ''
    }
    this._handleInput = this._handleInput.bind(this);
    this._addIllness = this._addIllness.bind(this);
  }

  _handleInput(event) {
    let content = event.target.value;
    if (event.target.name === "illnessNameInput") {
      this.setState({illness_name: content});
    }
    if (event.target.name === "symptomsInput") {
      this.setState({symptoms: content});
    }
    if (event.target.name === "descriptionInput") {
      this.setState({description: content});
    }
    if (event.target.name === "speciesInput") {
      this.setState({species_affected: content});
    }
  }

  // Method to make post request
  _addIllness(event) {
    event.preventDefault();
    $('#addIllnessModal').modal('toggle')
    let url = `${baseURL}/api-illnesses/`;
    let headerInfo = sessionStorage.getItem("token");
    let illnessInfo = {
      "illness_name": this.state.illness_name,
      symptoms: this.state.symptoms,
      description: this.state.description,
      "species_affected": this.state.species_affected,
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify(illnessInfo),
      headers: {
        'Content-Type': "application/json",
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
      <div className="addIllnessComponent">
        <div id="addIllness" className="col-12 col-md-4 login header-item">
          <button type="button" className="addIllnessButton btn btn-primary" data-toggle="modal" data-target="#addIllnessModal">Add an Illness</button>
        </div>

        {/* // Modal Here */}
        <div className="modal" tabIndex="-1" role="dialog" id="addIllnessModal" data-backdrop="false">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add an Illness</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this._addIllness} className="addIllnessForm">
                  <label htmlFor="illnessNameInput">Illness Name</label>
                  <input name="illnessNameInput" type="text" className="form-control" id="illnessNameInput" placeholder="Illness Name" value={this.state.illness_name} onChange={this._handleInput} required/>

                  <label htmlFor="symptomsInput">Symptoms</label>
                  <input name="symptomsInput" type="text" className="form-control" id="symptomsInput" placeholder="symptoms" value={this.state.symptoms} onChange={this._handleInput} required/>

                  <label htmlFor="descriptionInput">Description</label>
                  <textarea name="descriptionInput" type="text" rows="5" className="form-control" id="descriptionInput" placeholder="Description" value={this.state.description} onChange={this._handleInput} required></textarea>

                  <label htmlFor="speciesInput">Species Affected</label>
                  <input name="speciesInput" type="text" className="form-control" id="speciesInput" placeholder="Species Affected" value={this.state.species_affected} onChange={this._handleInput} required/>

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

export default AddIllness;
