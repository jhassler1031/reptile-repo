import React, { Component } from 'react';
import SearchForm from '../SearchForms/SearchForm.js';

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

  _search(searchParams) {
    // event.preventDefault();
    let searchURL = `${baseURL}?search=${searchParams}`;
    console.log(searchURL);
  }

  render() {
    // let self = this;
    return (
      <div className="illnessContainer container">
        <h1>This is the Illnesses section.</h1>
        <SearchForm search={this._search}/>

      </div>
    );
  }
}

export default Illnesses;
