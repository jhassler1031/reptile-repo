import React, { Component } from 'react';

import './LocationSearchForm.css';

// Import the utlitity file and set geoCodeURL
import file from '../../utility.js';
const geoCodeURL = file.geoCodeURL;

let GOOGLE_API_KEY = localStorage.getItem("GOOGLE_API_KEY");
// let latLong;
// const GOOGLE_API_KEY = `${process.env.REACT_APP_GOOGLE_API_KEY}`;

class LocationSearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchParams: '',
      searchAddress: '',
      searchCity: '',
      searchState: '',
      searchZip: '',
      searchRadius: '',
      latLong: ''
    }

    this._handleInput = this._handleInput.bind(this);
    this._performSearch = this._performSearch.bind(this);
    this._getLatLong = this._getLatLong.bind(this);
  }

  _handleInput(event) {
    let content = event.target.value;
    if (event.target.name === "searchAddress") {
      this.setState({searchAddress: content});
    }
    if (event.target.name === "searchCity") {
      this.setState({searchCity: content});
    }
    if (event.target.name === "searchState") {
      this.setState({searchState: content});
    }
    if (event.target.name === "searchZip") {
      this.setState({searchZip: content});
    }
    if (event.target.name === "searchRadius") {
      this.setState({searchRadius: content});
    }
  }

  // Connect to Google Geocodes API and return the lat/long info
  _getLatLong(content, callback) {
    let self = this;
    // console.log(GOOGLE_API_KEY);
    let url = geoCodeURL + '?address=' + content + '=&key=' + GOOGLE_API_KEY;

    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(responseAsJson => {
      self.setState({latLong: responseAsJson["results"][0]["geometry"]["location"]});
      // Call the callback function after the fetch completes.
      callback();
    })
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });
  }

  // Function to collect the separate values in state set by the search form, connect
  // to google geocodes API to find the lat/long info.  This will then be used to create
  // a base map from Google Maps Javascript API and be sent to the database for a search
  _performSearch() {
    let self = this;
    let content = '';
    for (var item in this.state) {
      if (this.state[item] !== '' && item !== "searchParams" && item != "searchRadius") {
        content = content + this.state[item] + '+';
      }
    }
    self._getLatLong(content, callback)

    // Using this callback so it waits on the fetch to complete in _getLatLong
    function callback() {
      let latLong = self.state.latLong;
      let search = `${latLong['lat']},${latLong['lng']},${self.state.searchRadius}`
      self.setState({searchParams: search});
      self.props.search(self.state.searchParams, self.state.latLong);
    }
  }

  render() {
    return (
      <form onSubmit={(event)=>{event.preventDefault(),this._performSearch()}} className="locationSearchForm">
        <div className="locationSearchFormField">
          {/* Address */}
          <label htmlFor="searchAddress">Enter Address</label>
          <input name="searchAddress" type="text" className="form-control" id="searchAddress" placeholder="Address" onChange={this._handleInput}/>

          {/* City */}
          <label htmlFor="searchCity">Enter City</label>
          <input name="searchCity" type="text" className="form-control" id="searchCity" placeholder="City" onChange={this._handleInput} required/>

          {/* State */}
          <label htmlFor="searchState">State</label>
          <input name="searchState" type="text" className="form-control" id="searchState" placeholder="State" onChange={this._handleInput} required/>

          {/* Zip Code */}
          <label htmlFor="searchZip">Zip Code</label>
          <input name="searchZip" type="text" className="form-control" id="searchZip" placeholder="Zip Code" onChange={this._handleInput}/>

          {/* Radius */}
          <label htmlFor="searchRadius">Choose a radius:</label>
          <select id="searchRadius" name="searchRadius" onChange={this._handleInput} required>
             <option value="">--Please choose an option--</option>
             <option value="10">10</option>
             <option value="25">25</option>
             <option value="50">50</option>
             <option value="75">75</option>
             <option value="100">100</option>
          </select>
        </div>

          <button type="submit" className="btn btn-primary">Search</button>
      </form>
    );
  }
}

export default LocationSearchForm;
