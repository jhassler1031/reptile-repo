import React, { Component } from 'react';
import MyIllness from './MyIllness.js';

// Import the utlitity file and set baseURL to the data
import file from '../../utility.js';
const baseURL = file.baseURL;

class MyIllnesses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    }

    this._deleteIllness = this._deleteIllness.bind(this);
  }

  componentDidMount() {
    let url = `${baseURL}/myillnesses/`;
    let headerInfo = sessionStorage.getItem("token");

    fetch(url, {
      method: "GET",
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

  _deleteIllness(illness) {
    let url = `${baseURL}/illnesses/${illness.id}`;
    let headerInfo = sessionStorage.getItem("token");
    let illnesses = this.state.results;

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

    illnesses.splice(illnesses.indexOf(illness), 1);
    this.setState({results:illnesses});
  }

  render() {
    let self = this;
    let $myIllnesses = this.state.results.map((illness)=> {
      return (
        <MyIllness key={illness.id} illness={illness} deleteIllness={()=>{this._deleteIllness(illness)}}/>
      )
    })
    return (
      <div className="row justify-content-center">
        {$myIllnesses}
      </div>
    );
  }
}

export default MyIllnesses;
