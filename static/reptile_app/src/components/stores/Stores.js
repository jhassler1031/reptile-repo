import React, { Component } from 'react';
import LocationSearchForm from '../SearchForms/LocationSearchForm.js';
import Store from './Store.js';

import './Stores.css';

// Import the utlitity file and set baseURL to the data
import file from '../../utility.js';
const baseURL = file.baseURL;

class Stores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      latLong: '',
      message: ''
    }

    this._locationSearch = this._locationSearch.bind(this);
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

        <div className="searchResults">
          {/* If statement here to display either no search results message, or the search results */}
          {this.state.searchResults.length > 0 ? $stores : this.state.message}
        </div>
      </div>
    );
  }
}

export default Stores;
