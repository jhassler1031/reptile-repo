import React, { Component } from 'react';

import './SearchForm.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchParams: ''
    }

    this._handleInput = this._handleInput.bind(this);
  }

  _handleInput(event) {
    let content = event.target.value;
    if (event.target.name === "searchParams") {
      this.setState({searchParams: content});
    }
  }

  render() {
    return (
      <form onSubmit={(event)=>{event.preventDefault(),this.props.search(this.state.searchParams)}} className="searchForm">
        <div className="searchFormField row">
          <div className="col-12">
            <label htmlFor="searchInput">What would you like to search for?</label>
            <input name="searchParams" type="text" className="form-control" id="searchInput" placeholder="Search for..." value={this.state.searchParams} onChange={this._handleInput} required/>
          </div>
        </div>

        <div className="row justify-content-end">
          <button type="submit" className="col-2 btn btn-primary submit-button">Search</button>
        </div>


      </form>
    );
  }
}

export default SearchForm;
