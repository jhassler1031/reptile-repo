/* global google */

import React, { Component } from 'react';
import LocationSearchForm from '../SearchForms/LocationSearchForm.js';
import Vet from './Vet.js';
import AddVet from './AddVet.js';

import './Vets.css';

// Import the utlitity file and set baseURL to the data
import file from '../../utility.js';
const baseURL = file.baseURL;

let GOOGLE_API_KEY = localStorage.getItem("GOOGLE_API_KEY");


class Vets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      latLong: '',
      message: ''
    }

    this._locationSearch = this._locationSearch.bind(this);
    this._initMap = this._initMap.bind(this);
    this._loadJS = this._loadJS.bind(this);
  }

  // Loads the script tag needed by google maps, then called the initMap function to create the map
  _loadJS() {
    //This gives the window access to the _initMap function
    window.initMap = this._initMap;
    // Creates the script element, sets the source, and then appends to the body.  The source called initmap
    let script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`;
    document.body.appendChild(script);
  }

  // Function to create the map using the latLong provided by the search
  _initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: this.state.latLong,
      zoom: 10
    });
    let markers = [];
    markers[0] = new google.maps.Marker({position: this.state.latLong, map:map, title:'You are here'});
    // Iterate over the list of results and create markers for each
    for (var x = 0; x < this.state.searchResults.length; x++) {
      var itemInfo = this.state.searchResults[x];
      markers[x+1] = new google.maps.Marker({position: {lat: itemInfo.lat, lng: itemInfo.long}, map:map});
    }
  }

  // This function is called by the search form, creates the url for the fetch,
  // and then sets state to the data returned by the felch.
  // This also receives latLong from the form in order to create the map.
  _locationSearch(searchParams, latLong) {

    let self = this;
    // State here needs latLong to display the map
    self.setState({latLong: latLong});
    let searchURL = `${baseURL}/vets/?data=${searchParams}`;

    fetch(searchURL)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json()
    })
    .then(responseAsJson => {
      if (responseAsJson.length > 0) {
        console.log(responseAsJson);
        self.setState({searchResults: responseAsJson, message: ''});
        // Function to load a JS script tag in the body needed by google maps
        self._loadJS();
      }
      else {
        self.setState({searchResults: [], message: 'Sorry, no search results found.', searchResults: []});
      }
    })
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });
  }



  render() {
    let self = this;
      // Iterate over the search results and create a display object for each
    let $vets = this.state.searchResults.map((vet)=> {
      return (
        <Vet key={vet.id} vet={vet}/>
      );
    })

    return (
      <div className="vetsContainer container">
        <div className="vets-title">
          <h1 className="title-headline">Local Reptile Friendly Veterinarians</h1>
          <p className="vets-title-text">
            Search for reptile friendly veterinarians near you.
          </p>
        </div>

        <LocationSearchForm search={this._locationSearch}/>

        {this.state.searchResults.length > 0 ?
        <div className="row justify-content-center">
          <div id="map" className="col-11"></div>
        </div>
        :
        <div></div>
        }

        <div className="searchResults row justify-content-center">
          {/* If statement here to display either no search results message, or the search results */}
          {this.state.searchResults.length > 0 ? $vets : this.state.message}
          {/* <script id="googleScript"></script> */}
        </div>

        {sessionStorage.getItem("token") !== null ?
        // If the user is logged in, show the option to add data
        <AddVet />
        // <div id="addVet" className="col-12 col-md-4 login header-item">
        //   <button type="button" className="addVetButton btn btn-primary" data-toggle="modal" data-target="#addVetModal">Add a Veterinarian</button>
        // </div>
        //
        // // Modal Here
        // <div className="modal" tabIndex="-1" role="dialog" id="addVetModal" data-backdrop="false">
        //   <div className="modal-dialog" role="document">
        //     <div className="modal-content">
        //       <div className="modal-header">
        //         <h5 className="modal-title">Add a Veterinarian</h5>
        //         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        //           <span aria-hidden="true">&times;</span>
        //         </button>
        //       </div>
        //       <div className="modal-body">
        //         <form onSubmit={this._addVet(event)} className="addVetForm">
        //           <label htmlFor="vetNameInput">Vet Name</label>
        //           <input name="vetNameInput" type="text" className="form-control" id="vetNameInput" placeholder="Vet Name" value={this.state.username} onChange={this._handleInput} required/>
        //
        //           <label htmlFor="passwordInput">Password</label>
        //           <input name="password" type="password" className="form-control" id="passwordInput" placeholder="Password" value={this.state.password} onChange={this._handleInput} required/>
        //
        //           <button type="submit" className="btn btn-primary">Login</button>
        //         </form>
        //       </div>
        //       <div className="modal-footer">
        //         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        :
        // If the user is not logged in, don't show anything
          <p>You're not logged in</p>}
      </div>
    );
  }
}


export default Vets;
