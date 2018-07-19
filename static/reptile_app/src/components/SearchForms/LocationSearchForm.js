import React, { Component } from 'react';

import './LocationSearchForm.css';

class LocationSearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchParams: ''
    }

    this._handleInput = this._handleInput.bind(this)
  }

  _handleInput(event) {
    let content = event.target.value;
    if (event.target.name === "searchParams") {
      this.setState({searchParams: content});
    }
  }

  render() {
    return (
      <form onSubmit={(event)=>{event.preventDefault(),this.props.search(this.state.searchParams)}} className="locationSearchForm">
        <div className="locationSearchFormField">
          {/* Address */}
          <label htmlFor="searchAddress">Enter Address</label>
          <input name="searchAddress" type="text" className="form-control" id="searchAddress" placeholder="Address" value={this.state.searchAddress} onChange={this._handleInput}/>

          {/* City */}
          <label htmlFor="searchCity">Enter City</label>
          <input name="searchCity" type="text" className="form-control" id="searchCity" placeholder="City" value={this.state.searchCity} onChange={this._handleInput} required/>

          {/* State */}
          <label htmlFor="searchState">State</label>
          <input name="searchState" type="text" className="form-control" id="searchState" placeholder="State" value={this.state.searchState} onChange={this._handleInput} required/>

          {/* Zip Code */}
          <label htmlFor="searchZip">Zip Code</label>
          <input name="searchZip" type="text" className="form-control" id="searchZip" placeholder="Zip Code" value={this.state.searchZip} onChange={this._handleInput}/>

          {/* Radius */}
          <label for="searchRadius">Choose a radius:</label>
          <select id="searchRadius" name="searchRadius" onChange={this._handleInput}>
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
