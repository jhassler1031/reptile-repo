import React, { Component } from 'react';
import MyVet from './MyVet.js';

// Import the utlitity file and set baseURL to the data
import file from '../../utility.js';
const baseURL = file.baseURL;

class MyVets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    }

    this._deleteVet = this._deleteVet.bind(this);
  }

  componentDidMount() {
    let url = `${baseURL}/myvets/`;
    let headerInfo = sessionStorage.getItem("token");

    fetch(url, {
      method: "GET",
      // body: JSON.stringify(vetInfo),
      headers: {
        'Content-Type': "application/json",
        'Authorization': headerInfo
      }
    })
    .then((response)=>{
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((responseAsJson)=>{
      this.setState({results: responseAsJson});
    })
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });
  }

  _deleteVet(vet) {
    let url = `${baseURL}/vets/${vet.id}`;
    let headerInfo = sessionStorage.getItem("token");
    let vets = this.state.results;

    fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json",
        'Authorization': headerInfo
      }
    })
    .then((response)=>{
      if (!response.ok) {
        throw Error(response.statusText);
      }
    })
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });

    vets.splice(vets.indexOf(vet), 1);
    this.setState({results:vets});
  }

  render() {
    let self = this;
    let $myVets = this.state.results.map((vet)=> {
      return (
        <MyVet key={vet.id} vet={vet} deleteVet={()=>{this._deleteVet(vet)}}/>
      )
    })
    return (
      <div className="row justify-content-center no-gutters">
        {$myVets}
      </div>
    );
  }
}

export default MyVets;
