import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SearchForm from '../SearchForms/SearchForm.js';
import Illness from './Illness.js';
import AddIllness from './AddIllness.js';

import './Illnesses.css';

// Import the utlitity file and set baseURL to the data
import file from '../../utility.js';
const baseURL = file.baseURL;

class Illnesses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      message: '',
      authenticated: false
    }

    this._search = this._search.bind(this);
  }

  // This function is called by the search form, creates the url for the fetch,
  // and then sets state to the data returned by the felch
  _search(searchParams) {
    let self = this;
    let searchURL = `${baseURL}/api-illnesses/?search=${searchParams}`;

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
      }
      else {
        self.setState({searchResults: [], message: 'Sorry, no search results found.'});
      }
    })
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(sessionStorage.getItem("token") !== null) {
      return {authenticated: true}
    }
    else {
      return {authenticated: false}
    }
 }

  render() {
      // Iterate over the search results and create a display object for each
    let $illnesses = this.state.searchResults.map((illness)=> {
      return (
        <Illness key={illness.id} illness={illness}/>
      );
    })

    return (
      <div className="illnessContainer container">
        <div className="illnesses-title">
          <h1 className="title-headline">Reptile Related Illnesses</h1>
          <p className="illnesses-title-text">
            Search for reptile related illnesses by species, name, or symptoms.
          </p>
        </div>

        <SearchForm search={this._search}/>

        <div className="searchResults row justify-content-center">
          {/* If statement here to display either no search results message, or the search results */}
          {this.state.searchResults.length > 0 ? $illnesses : <p className="no-results">{this.state.message}</p>}
        </div>

        {this.state.authenticated !== false ?
          <div className="row justify-content-center">
          {/* If the user is logged in, show the option to add data */}
            <AddIllness />
            <button className="navButton"><NavLink to='/myillnesses'>My Illness Submissions</NavLink></button>
          </div>
        :
        // If the user is not logged in, don't show anything
          ''}

      </div>
    );
  }
}

export default Illnesses;
