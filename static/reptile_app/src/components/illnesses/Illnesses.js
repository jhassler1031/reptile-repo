import React, { Component } from 'react';
import SearchForm from '../SearchForms/SearchForm.js';
import Illness from './Illness.js';

import './Illnesses.css';

// Import the utlitity file and set baseURL to the data
import file from '../../utility.js';
const baseURL = file.data;



class Illnesses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    }

    this._search = this._search.bind(this);
  }

  // This function is called by the search form, creates the url for the fetch,
  // and then sets state to the data returned by the felch
  _search(searchParams) {
    let self = this;
    let searchURL = `${baseURL}/illnesses/?search=${searchParams}`;

    fetch(searchURL)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json()
    })
    .then(responseAsJson => {
      console.log(responseAsJson);
      self.setState({searchResults: responseAsJson});
    })
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });
  }

  render() {
    let self = this;
    
    // Iterate over the search results and create a display object for each
    let $illnesses = this.state.searchResults.map((illness)=> {
      return (
        <Illness key={illness.id} illness={illness}/>
      );
    })
    return (
      <div className="illnessContainer container">
        <h1>This is the Illnesses section.</h1>
        <SearchForm search={this._search}/>
        {$illnesses}

        <div className="searchResults">

        </div>

      </div>
    );
  }
}

export default Illnesses;
