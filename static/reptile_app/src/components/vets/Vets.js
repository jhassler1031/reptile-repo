import React, { Component } from 'react';
import LocationSearchForm from '../SearchForms/LocationSearchForm.js';
import Vet from './Vet.js';

import './Vets.css';

// Import the utlitity file and set baseURL to the data
import file from '../../utility.js';
const baseURL = file.data;


class Vets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      message: ''
    }

    this._locationSearch = this._locationSearch.bind(this);
  }

  // This function is called by the search form, creates the url for the fetch,
  // and then sets state to the data returned by the felch
  _locationSearch(searchParams) {
    let self = this;
    let searchURL = `${baseURL}/vets/?data=${searchParams}`;
    // searchURL = "http://localhost:8000/stores/?data=34.9491893,-81.9210408,50";

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
        self.setState({searchResults: [], message: 'Sorry, no search results found.'});
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
        <h1>This is the Vets section.</h1>
        <LocationSearchForm search={this._locationSearch}/>

        <div className="searchResults">
          {/* If statement here to display either no search results message, or the search results */}
          {this.state.searchResults.length > 0 ? $vets : this.state.message}
        </div>
      </div>
    );
  }
}

export default Vets;
