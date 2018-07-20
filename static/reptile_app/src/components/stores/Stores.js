/* global google */

import React, { Component } from 'react';
import LocationSearchForm from '../SearchForms/LocationSearchForm.js';
import Store from './Store.js';

import './Stores.css';

// Import the utlitity file and set baseURL to the data
import file from '../../utility.js';
const baseURL = file.baseURL;

let GOOGLE_API_KEY = localStorage.getItem("GOOGLE_API_KEY");

class Stores extends Component {
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
    let self = this;
    let map = new google.maps.Map(document.getElementById('map'), {
      center: self.state.latLong,
      zoom: 10
    });
    let startPosition = new google.maps.Marker({position: self.state.latLong, map:map, title:'You are here'});
    let markers = [];
    for (var item in self.state.searchResults) {
      var itemInfo = self.state.searchResults[item];
      console.log(itemInfo.lat, itemInfo.long);
      markers[item] = new google.maps.Marker({position: {lat: itemInfo.lat, lng: itemInfo.long}, map:map});
    }
  }

  // This function is called by the search form, creates the url for the fetch,
  // and then sets state to the data returned by the felch.
  // This also receives latLong from the form in order to create the map.
  _locationSearch(searchParams, latLong) {
    let self = this;
    // State here needs latLong to display the map
    self.setState({latLong: latLong});
    let searchURL = `${baseURL}/stores/?data=${searchParams}`;

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
    let $stores = this.state.searchResults.map((store)=> {
      return (
        <Store key={store.id} store={store}/>
      );
    })

    return (
      <div className="storesContainer container">
        <h1>This is the Stores section.</h1>
        <LocationSearchForm search={this._locationSearch}/>

        <div id="map"></div>

        <div className="searchResults">
          {/* If statement here to display either no search results message, or the search results */}
          {this.state.searchResults.length > 0 ? $stores : this.state.message}
        </div>
      </div>
    );
  }
}

export default Stores;
