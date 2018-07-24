/* global google */

import React, { Component } from 'react';
import LocationSearchForm from '../SearchForms/LocationSearchForm.js';
import Store from './Store.js';
import AddStore from './AddStore.js';

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
        <div className="stores-title">
          <h1 className="title-headline">Local Pet Stores</h1>
          <p className="stores-title-text">
            Search for local pet stores that carry reptile related products.
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
          {this.state.searchResults.length > 0 ? $stores : this.state.message}
        </div>

        {sessionStorage.getItem("token") !== null ?
        // If the user is logged in, show the option to add data
        <AddStore />
        :
        // If the user is not logged in, don't show anything
          ''}
      </div>
    );
  }
}

export default Stores;
