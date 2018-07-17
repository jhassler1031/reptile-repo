import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Import the utlitity file and set baseURL to the data
import file from './utility.js';
const baseURL = file.data;

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>{baseURL}</p>
        <h1>TESTING REACT</h1>
      </div>
    );
  }
}

export default App;
