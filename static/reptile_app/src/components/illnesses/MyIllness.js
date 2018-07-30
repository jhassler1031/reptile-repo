import React, { Component } from 'react';
import $ from 'jquery';

import './MyIllness.css';

// Import the utlitity file and set base URL
import file from '../../utility.js';
const baseURL = file.baseURL;

// This class is to give a more detailed view of a contributors vets with the options
// to edit or delete.
class MyIllness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // On none required fields, doing an if before setting state value to avoid error
      illness_name: this.props.illness.illness_name,
      symptoms: this.props.illness.symptoms,
      description: this.props.illness.description,
      species_affected: this.props.illness.species_affected,
    }
    this._editIllness = this._editIllness.bind(this);
    this._handleInput = this._handleInput.bind(this);
  }

  _handleInput(event) {
    let content = event.target.value;
    if (event.target.name === "illnessNameInput") {
      this.setState({illness_name: content});
    }
    if (event.target.name === "symptoms") {
      this.setState({symptoms: content});
    }
    if (event.target.name === "description") {
      this.setState({description: content});
    }
    if (event.target.name === "species_affected") {
      this.setState({species_affected: content});
    }
  }

  _editIllness(event) {
    event.preventDefault();
    $(`#editIllnessModal${this.props.illness.id}`).modal('toggle')
    let url = `${baseURL}/api-illnesses/${this.props.illness.id}`;
    let headerInfo = sessionStorage.getItem("token");
    let illnessInfo = {
      "illness_name": this.state.illness_name,
      "symptoms": this.state.symptoms,
      "description": this.state.description,
      species_affected: this.state.species_affected,
    }

    fetch(url, {
      method: "PUT",
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
      <div className="col-11 illnessDisplay myIllnessDisplay">
        <h1>{this.props.illness.illness_name}</h1>
        <div className="row justify-content-center">
          <div className="col-6 illness-content">
            <p>Symptoms: {this.props.illness.symptoms}</p>
            <p>Species Affected: {this.props.illness.species_affected}</p>
            <p>{this.props.illness.description}</p>
          </div>

          <div className="col-6">
            <div className="row justify-content-center">
              {/* Button to open modal to edit entry */}
              <button type="button" className="col-3 submit-button btn" data-toggle="modal" data-target={`#editIllnessModal${this.props.illness.id}`}>Edit Entry</button>

              {/* Button to delete entry */}
              <input className="col-3 btn submit-button" type="button" value="Delete Entry" onClick={this.props.deleteIllness}/>
            </div>
          </div>
        </div>

        {/* Modal to edit entry */}
        <div className="modal" tabIndex="-1" role="dialog" id={`editIllnessModal${this.props.illness.id}`} data-backdrop="false">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Illness</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this._editIllness} className="editIllnessForm">
                  <label htmlFor="illnessNameInput">Illness Name</label>
                  <input name="illnessNameInput" type="text" className="form-control" id={`editIllnessNameInput${this.props.illness.id}`} placeholder="Illness Name" value={this.state.illness_name} onChange={this._handleInput} required/>

                  <label htmlFor="symptoms">Symptoms</label>
                  <input name="symptoms" type="text" className="form-control" id={`editIllnessSymptomsInput${this.props.illness.id}`} placeholder="Symptoms" value={this.state.symptoms} onChange={this._handleInput} required/>

                  <label htmlFor="description">Description</label>
                  <textarea name="description" type="text" rows="5" className="form-control" id={`editIllnessDescriptionInput${this.props.illness.id}`} placeholder="Description" value={this.state.description} onChange={this._handleInput}></textarea>

                  <label htmlFor="speciesAffected">Species Affected</label>
                  <input name="speciesAffected" type="text" className="form-control" id={`editIllnessSpeciesInput${this.props.illness.id}`} placeholder="Species Affected" value={this.state.species_affected} onChange={this._handleInput} required/>

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

export default MyIllness;
