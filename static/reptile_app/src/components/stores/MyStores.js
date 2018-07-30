import React, { Component } from 'react';
import MyStore from './MyStore.js';

// Import the utlitity file and set baseURL to the data
import file from '../../utility.js';
const baseURL = file.baseURL;

class MyStores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    }

    this._deleteStore = this._deleteStore.bind(this);
  }

  componentDidMount() {
    let url = `${baseURL}/api-mystores/`;
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

  _deleteStore(store) {
    let url = `${baseURL}/api-stores/${store.id}`;
    let headerInfo = sessionStorage.getItem("token");
    let stores = this.state.results;

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

    stores.splice(stores.indexOf(store), 1);
    this.setState({results:stores});
  }

  render() {
    let self = this;
    let $myStores = this.state.results.map((store)=> {
      return (
        <MyStore key={store.id} store={store} deleteStore={()=>{this._deleteStore(store)}}/>
      )
    })
    return (
      <div className="row justify-content-center no-gutters">
        {$myStores}
      </div>
    );
  }
}

export default MyStores;
