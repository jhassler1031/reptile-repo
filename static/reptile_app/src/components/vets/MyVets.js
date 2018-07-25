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
  }

  componentDidMount() {
    let url = `${baseURL}/myvets/`;

    fetch(url)
    .then((response)=>{
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((responseAsJson)=>{
      console.log(responseAsJson);
      this.setState({results: responseAsJson});
    })
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });
  }

  render() {
    let $myVets = this.state.results.map((myVet)=> {
      return (
        <MyVet key={myVet.id} myVet={myVet}/>
      )
    })
    return (
      <div className="row justify-content-center">
        {$myVets}
      </div>
    );
  }
}

export default MyVets;
